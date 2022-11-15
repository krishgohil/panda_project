


// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const connectToMongo = require('../../../db')
const User = require('../../../models/User')


export default async function delScore(req, res) {
    await connectToMongo();
    const { visitedProfId, userId, score } = req.body

    let delScore = await User.updateOne(
        { _id: visitedProfId },
        {
            $pull: {
                ratings:
                {
                    raterId: userId
                }
            },
            $inc: {
                totalRating: - score,
                totalRatingsLength: -1
            }
        }
    )
    res.json(delScore)
}
