


// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const connectToMongo = require('../../../db')
const User = require('../../../models/User')


export default async function socialscorerdetails(req, res) {
    await connectToMongo();
    const { visitedProfId, userId } = req.body
    console.log("aklsjdfklsjldf")
    try {
        let getScore = await User.findOne(
            { _id: visitedProfId }, { ratings: 1, totalRating: 1, totalRatingsLength: 1 }
        )
            .populate("ratings.rater", "profileImg username")

        res.json(getScore)
    } catch (error) {
        console.log(error)
    }
}
