


// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const connectToMongo = require('../../../db')
const AllContent = require('../../../models/AllContent')
import multiparty from "multiparty";
// var cloudinary = require('cloudinary').v2;
var mongoose = require('mongoose')

import cloudinary from "cloudinary"

cloudinary.config({
    cloud_name: 'dmjoqk3ww',
    api_key: '146264144592288',
    api_secret: 'VesP1pNT2PREeZHSBk82IYsPINo'
});

export default async function addtoreview(req, res) {
    await connectToMongo();
    // const { name, username, about, _id, profileImg, imgLength, darkMode, profBg, profession } = req.body
    const form = new multiparty.Form();
    const data = await new Promise((resolve, reject) => {
        form.parse(req, function (err, fields, files) {
            if (err) reject({ err });
            resolve({ fields, files });
        });
    });
    console.log(`data: `, JSON.stringify(data));
    console.log(data)
    let tempImgCount = Number(data.fields.imgLength)
    // console.log(tempImgCount)

    console.log(data.fields.title)
    console.log(data.fields.description)
    console.log(data.fields._id)




    // let url = eval('data.fields.linkUrl' + 0)

    // console.log(data.fields.username)
    // console.log(typeof data.fields.username)
    // console.log(data.fields.username[0])
    // console.log(data.fields.img)

    // // console.log("files nahi hai", darkMode)

    let arr = []

    for (let i = 0; i < tempImgCount; i++) {
        let img = eval('data.fields.img' + i)[0]
        arr.push(img)
    }
    console.log(arr)
    let temp_id = new mongoose.Types.ObjectId()


    try {

        let createContent = await AllContent.create({
            _id: temp_id,
            postedBy: data.fields._id[0],
            postedById: data.fields._id[0],
            postimg: arr,
            description: data.fields.description[0],
            title: data.fields.title[0],
            category: data.fields.category[0],

        })

        console.log(createContent)


        res.json(createContent)
    } catch (error) {
        console.error(error)
    }









}



export const config = {
    api: {
        bodyParser: false,
    },
};
