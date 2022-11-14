// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const connectToMongo = require('../../db')

export default async function handler(req, res) {
  await connectToMongo();
  res.status(200).json({ name: 'John Doe' })
}
