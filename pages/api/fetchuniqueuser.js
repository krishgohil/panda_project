


// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const connectToMongo = require('../../db')
const User = require('../../models/User')
var jwt = require('jsonwebtoken');
const JWT = "UBOUT_APP_FOR_PUBLIC_PROFILE"


export default async function fetchuniqueuser(req, res) {
    await connectToMongo();
    const { profile, utoken, ip, _id, domain } = req.body
    // const domain = "www.linkedin.com"
    console.log(utoken)
    if (utoken) {
        const verified = jwt.
            verify(utoken, JWT);
        console.log("verifiedv", verified);
        try {
            let fetchuniqueser = await User.findOne({ _id: verified }, { email: 0, password: 0, temp_id: 0, confirmation_status: 0, });
            res.json({ fetchuniqueser: fetchuniqueser, message: 'success' })

            // console.log({ fetchuniqueser: fetchuniqueser })
            // if (fetchuniqueser && fetchuniqueser.logged_in == true) {
            //     // console.log('authorized')
            //     res.json({ fetchuniqueser: fetchuniqueser, message: 'success' })
            // } else {
            //     res.json({ fetchuniqueser: [], message: 'unauthorized' })
            // }
            // console.log('user id run hua !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!', fetchuniqueser)
        } catch (error) {
            res.json({ message: 'failed' })
            console.error(error.message, "eroor mm")
        }
    }

    else if (profile) {
        console.log("me to khelungi", ip)
        try {
            let fetchsearchedusername = await User.findOne({ username: profile }, { email: 0, password: 0, temp_id: 0, confirmation_status: 0, notifications: 0, });
            res.json({ fetchuniqueser: fetchsearchedusername, message: 'success' })

            if (fetchsearchedusername.username == profile) {
                console.log("sawar jaey")
            } else if (ip) {

                var unique_visitor = true
                // console.log(fetchsearchedusername.visitors)

                if (fetchsearchedusername.visitors.length > 0) {

                    for (let i = 0; i < fetchsearchedusername.visitors.length; i++) {
                        console.log()
                        if (fetchsearchedusername.visitors[i].visitor_ip == ip) {
                            unique_visitor = false
                        }

                        if (i == (fetchsearchedusername.visitors.length - 1)) {
                            if (unique_visitor) {

                                console.log("unique visitor")
                                const updateProfileVisit = await User.updateOne(
                                    {
                                        _id: fetchsearchedusername._id
                                    },
                                    {
                                        $push: {
                                            visitors: [
                                                {
                                                    visitor_ip: ip,
                                                }
                                            ],

                                        },
                                        $inc: {
                                            profileVisits: 1,
                                            uniqueProfileVisits: 1
                                        },

                                    }
                                )

                                console.log(updateProfileVisit)

                            } else {
                                console.log("sine se lag ja tu")
                            }
                        }
                    }




                }
                else {

                    const updateProfileVisit = await User.updateOne(
                        {
                            _id: fetchsearchedusername._id
                        },
                        {
                            $push: {
                                visitors: [
                                    {
                                        visitor_ip: ip,
                                    }
                                ],

                            },
                            $inc: {
                                profileVisits: 1,
                                uniqueProfileVisits: 1
                            },

                        }
                    )
                }



                if (domain && domain.length > 0) {
                    console.log("jay shri ram")
                    var domainExists = false
                    if (fetchsearchedusername.referrers.length > 0) {


                        for (let i = 0; i < fetchsearchedusername.referrers.length; i++) {
                            console.log("jay shri krishna", fetchsearchedusername.referrers[i].domain)

                            if (fetchsearchedusername.referrers[i].domain == domain) {

                                domainExists = true


                            }
                        }


                        if (domainExists == true) {
                            console.log("domainexists true hai")

                            const updateProfileVisit = await User.updateOne(
                                {
                                    _id: fetchsearchedusername._id
                                },
                                {
                                    $push: {
                                        "referrers.$[elem].allVisits": [
                                            {
                                                visitor_ip: ip
                                            }
                                        ]
                                    },
                                    $inc: {
                                        "referrers.$[elem].visitsCount": 1
                                    }
                                },
                                {
                                    arrayFilters: [
                                        { "elem.domain": { $eq: domain } },
                                    ],
                                },



                            )

                            console.log(updateProfileVisit, "kjhgfdsx")

                        } else {
                            console.log("hhhhhhhhhhhhhhhhh")
                            const updateProfileVisit = await User.updateOne(
                                {
                                    _id: fetchsearchedusername._id
                                },
                                {
                                    $push: {
                                        referrers: [
                                            {
                                                domain: domain,
                                                visitsCount: 1,
                                                allVisits: [
                                                    {
                                                        visitor_ip: ip
                                                    }
                                                ]
                                            }
                                        ],

                                    }

                                }
                            )
                            console.log(updateProfileVisit)
                        }

                    } else {
                        console.log("updateProfileVisit")

                        const updateProfileVisit = await User.updateOne(
                            {
                                _id: fetchsearchedusername._id
                            },
                            {
                                $push: {
                                    referrers: [
                                        {
                                            domain: domain,
                                            visitsCount: 1,
                                            allVisits: [
                                                {
                                                    visitor_ip: ip
                                                }
                                            ]
                                        }
                                    ],

                                }

                            }
                        )
                        console.log(updateProfileVisit)

                    }
                }


            }



        } catch (error) {
            // res.json({ message: 'failed' })
            console.error(error.message)
        }
    }

}
