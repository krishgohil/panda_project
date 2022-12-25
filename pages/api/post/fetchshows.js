


// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const connectToMongo = require('../../../db')
const AllContent = require('../../../models/AllContent')


export default async function fetchshows(req, res) {
    try {

        await connectToMongo();
        const { skip } = req.body
        console.log("skip", skip)
        const shows = await AllContent.find({category:"shows"}).sort({ date: -1 }).skip(skip).limit(10)
        res.json({ shows })

    } catch (error) {
        console.error(error)
    }

}
