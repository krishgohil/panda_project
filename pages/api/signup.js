


// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const connectToMongo = require('../../db')
const User = require('../../models/User')

const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const mongoose = require('mongoose')
const JWT = "UBOUT_APP_FOR_PUBLIC_PROFILE"


export default async function signup(req, res) {
    await connectToMongo();
    let email = req.body.email
    console.log(req.body.username, 'user')
    console.log(req.body.password, 'pass')
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        success = false
        return res.status(400).json({ success, errors: errors.array() });
    }

    //check whether a user @with same email address exist
    try {
        let user = await User.findOne({ email: req.body.email }).collation({ locale: 'en', strength: 1 })
        let usernamecheck = await User.findOne({ username: req.body.username }).collation({ locale: 'en', strength: 1 })
        if (user) {
            success = false;
            return res.status(400).json({ success, error: "email_exists" })
        }
        else if (usernamecheck) {
            success = false;
            return res.status(400).json({ success, error: "username_exists" })
        }

        const salt = await bcrypt.genSalt(10)
        const secPass = await bcrypt.hash(req.body.password, salt);

        let tempdata = {
            _id: new mongoose.Types.ObjectId(),
        }

        user = await User.create({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            username: req.body.username,
            password: secPass,
            email: req.body.email,
            bio: req.body.bio,
            profileImg: req.body.profileImg,
            temp_id: tempdata._id,
            confirmation_status: 'not_confirmed'
        })

        const data = {
            user: {
                id: user.id,
            }
        }

        console.log(data.user.id)
        console.log(user.bio)
        const accessToken = jwt.sign(data.user.id, JWT);
        success = true;
        res.json({ success, accessToken, user })
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal server error")
    }
}
