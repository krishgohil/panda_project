const User = require('../../models/User')
const AllContent = require('../../models/AllContent')
const connectToMongo = require('../../db')


export default async function search(req, res) {
    const { input, category } = req.body

    await connectToMongo();

    // const input = "krish"
    console.log(input)

    try {
        if (category === "") {
            let result = await User.find({ $text: { $search: input } }, { about: 1, name: 1, profileImg: 1, username: 1, about: 1, profession: 1, totalRating: 1, totalRatingsLength: 1 })
                .sort({ score: { $meta: "textScore" } })

            console.log("hehrhere")

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
        } else {
            let result = await AllContent.find({ category: category, $text: { $search: input } }, { title: 1, description: 1, postimg: 1, isDeleted: 1, category: 1, postedBy: 1, totalRating: 1, totalRatingsLength: 1 })
                .sort({ score: { $meta: "textScore" } })

            console.log("cateogry")

            if (result.length == 0) {
                let final = await AllContent.find({
                    category: category,
                    "$or": [
                        { title: { '$regex': input, '$options': 'i' } },
                        { description: { '$regex': input, '$options': 'i' } },
                        { "ratedBy.raterComment": { '$regex': input, '$options': 'i' } },
                    ]
                }).sort({ title: -1, description: -1, "ratedBy.raterComment": -1 })
                console.log("ccccccccccjfinalyyyyyyyyyyyyyyyyyyyyyyyyyyyy")
                res.json(final)
            } else {
                res.json(result)
            }
        }
    } catch (error) {
        console.error(error.message)
        res.json({ "error": error })

    }
}

