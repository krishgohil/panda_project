


// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const connectToMongo = require('../../../db')
const AllContent = require('../../../models/AllContent')


export default async function postreview(req, res) {
    await connectToMongo();
    const { postId, userId, rating, raterComment, scoreDifference, hasRated, notificationToken, username, notificationSettings } = req.body


    console.log(req.body)

    try {
        if (hasRated) {
            let updateScore = await AllContent.updateOne(
                { _id: postId },
                {
                    $set: {
                        // "ratedBy.$[elem].raterId": userId,
                        "ratedBy.$[elem].raterComment": raterComment,
                        "ratedBy.$[elem].rating": rating,
                    },
                    $inc: {
                        totalRating: scoreDifference,
                    }
                },
                {
                    arrayFilters: [
                        { "elem.raterId": { $eq: userId } },
                    ],
                },
            )
            res.json(updateScore)

        } else {
            let updateScore = await AllContent.updateOne(
                { _id: postId },
                {
                    $push: {
                        ratedBy: {
                            rating: rating,
                            raterId: userId,
                            rater: userId,
                            raterComment: raterComment
                        }
                    },
                    $inc: {
                        totalRating: scoreDifference,
                        totalRatingsLength: 1
                    }
                }
            )
            res.json(updateScore)

        }

    } catch (error) {
        console.log(error)
    }

}
