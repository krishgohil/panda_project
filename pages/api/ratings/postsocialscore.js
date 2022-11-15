


// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const connectToMongo = require('../../../db')
const User = require('../../../models/User')


export default async function postsocialscore(req, res) {
    await connectToMongo();
    const { visitedProfId, userId, rating, raterComment, scoreDifference, hasRated, notificationToken, username, notificationSettings } = req.body


    console.log(req.body)

    try {
        if (hasRated) {
            let updateScore = await User.updateOne(
                { _id: visitedProfId },
                {
                    $set: {
                        "ratings.$[elem].raterId": userId,
                        "ratings.$[elem].raterComment": raterComment,
                        "ratings.$[elem].rating": rating,
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
            let updateScore = await User.updateOne(
                { _id: visitedProfId },
                {
                    $push: {
                        ratings: {
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
