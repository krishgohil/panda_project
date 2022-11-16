


// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const connectToMongo = require('../../db')
const User = require('../../models/User')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');


const JWT = "UBOUT_APP_FOR_PUBLIC_PROFILE"


export default async function login(req, res) {
    await connectToMongo();
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    console.log("okkkk", email, password)

    try {
        let user = await User.findOne({ email });
        console.log("user foind", user)
        if (!user) {
            success = false;

            return res.status(400).json({ success, error: "Please try to login with correct credentials" })
        }

        let d = new Date()
        let b = user.tempLoginBanTill
        if (Date.parse(d) < Date.parse(b)) {
            if (user && user.loginAttempts > 10) {
                let updateLoginAttempts = {
                    loginAttempts: user.loginAttempts,
                    tempLoginBanTill: user.tempLoginBanTill
                }
                console.log("Bhai kuch date ka lafda hai bbbbbbbbbb")

                return res.status(400).json({ success, error: "Please try to login with correct credentials", updateLoginAttempts })
            }
        } else {
            console.log("Bhai kuch date ka lafda hai")
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            success = false;

            var date = new Date()
            console.log(date, "date1")
            date.setMinutes(date.getMinutes() + 30);
            console.log(date, "date2")

            if (user.loginAttempts == 10) {
                let update = await User.updateOne(
                    { email: email },
                    {
                        $inc: {
                            loginAttempts: 1
                        },
                        $set: {
                            tempLoginBanTill: date
                        }
                    }
                )
            } else {
                let update = await User.updateOne(
                    { email: email },
                    {
                        $inc: {
                            loginAttempts: 1
                        }
                    }
                )
            }


            let updateLoginAttempts = {
                loginAttempts: user.loginAttempts
            }
            console.log("sinzelfkd")
            return res.status(400).json({ success, error: "Please try to login with correct credentials", updateLoginAttempts })
        }
        try {
            const loginUser = await User.updateOne({ _id: user.id },
                {
                    $set: {
                        logged_in: true,
                        loginAttempts: 0

                    }
                }
            )
            console.log(loginUser, 'loginUser')
            if (loginUser && loginUser.acknowledged == true && loginUser.matchedCount == 1) {
                const data = {
                    user: {
                        id: user.id,
                    }
                }
                const accessToken = jwt.sign(data.user.id, JWT);
                success = true;

                res.json({ success, accessToken, user })
            }
        } catch (error) {
            console.log(error)
        }


    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal server error")
    }


}
