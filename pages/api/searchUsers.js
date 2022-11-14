const User = require('../../models/User')
const connectToMongo = require('../../db')


export default async function searchUsers(req, res) {
    // const { input } = req.body

    await connectToMongo();

    const input = "krish"
    console.log(input)

    try {
        let result = await User.find({ $text: { $search: input } }, { about: 1, name: 1, profileImg: 1, username: 1, about: 1, profession: 1, totalRating: 1, totalRatingsLength: 1 })
            .sort({ score: { $meta: "textScore" } })

        console.log( "hehrhere")

        if (result.length == 0) {
            let final = await User.find({
                "$or": [
                    { name: { '$regex': input, '$options': 'i' } },
                    { username: { '$regex': input, '$options': 'i' } },
                    { about: { '$regex': input, '$options': 'i' } },
                ]
            }).sort({ name: -1, username: -1, about: -1 })
            console.log("jfinalyyyyyyyyyyyyyyyyyyyyyyyyyyyy")
            res.json(final)
        } else {
            res.json(result)
        }
    } catch (error) {
        console.error(error.message)
        res.json({ "error": error })

    }
}

