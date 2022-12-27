


// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const connectToMongo = require('../../../db')
const AllContent = require('../../../models/AllContent')


export default async function fetchreviews(req, res) {
    await connectToMongo();
    const { postId } = req.body
    console.log("aklsjdfklsjldf")
    try {
        let getScore = await AllContent.findOne(
            { _id: postId }, { ratedBy: 1, totalRatingsLength: 1, totalRating: 1 }
        )
            .populate("ratedBy.rater", "profileImg username")

        res.json(getScore)
    } catch (error) {
        console.log(error)
    }
}
