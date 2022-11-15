


// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const connectToMongo = require('../../../db')
const User = require('../../../models/User')


export default async function showScore(req, res) {
    await connectToMongo();
    const { visitedProfId, commentId } = req.body


    let showScore = await User.updateOne(
        { _id: visitedProfId },
        {
            $set: {
                "ratings.$[elem].isHidden": false
            }
        },
        {
            arrayFilters: [
                { "elem._id": { $eq: commentId } },
            ],
        },
    )   
    res.json(showScore)
}
