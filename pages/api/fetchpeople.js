


// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const connectToMongo = require('../../db')
const User = require('../../models/User')


export default async function fetchpeople(req, res) {
    await connectToMongo();
    const { skip } = req.body
    console.log("skip", skip)
    const users = await User.find().sort({ date: -1 }).skip(skip).limit(10)
    res.json({ users })
}
