


// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const connectToMongo = require('../../db')
const User = require('../../models/User')
import multiparty from "multiparty";
// var cloudinary = require('cloudinary').v2;

import cloudinary from "cloudinary"

cloudinary.config({
    cloud_name: 'dmjoqk3ww',
    api_key: '146264144592288',
    api_secret: 'VesP1pNT2PREeZHSBk82IYsPINo'
});

export default async function fetchpeople(req, res) {
    await connectToMongo();
    // const { name, username, about, _id, profileImg, linkCount, darkMode, profBg, profession } = req.body
    const form = new multiparty.Form();
    const data = await new Promise((resolve, reject) => {
        form.parse(req, function (err, fields, files) {
            if (err) reject({ err });
            resolve({ fields, files });
        });
    });
    console.log(`data: `, JSON.stringify(data));
    console.log(data.fields.linkCount)
    let tempLinkCount = Number(data.fields.linkCount)
    console.log(tempLinkCount)




    let url = eval('data.fields.linkUrl' + 0)

    console.log(data.fields.username)
    console.log(typeof data.fields.username)
    console.log(data.fields.username[0])
    console.log(data.fields.img)

    // console.log("files nahi hai", darkMode)

    let arr = []

    var _prof

    if (data.fields.img && data.fields.img[0] !== undefined) {
        _prof = data.fields.img[0]
        try {
            const getPublicId = (profileImg) => profileImg.split("/").pop().split(".")[0];
            let a = getPublicId(data.fields.profileImg[0])
            cloudinary.uploader.destroy(a, function (result) { console.log(result, '!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!') });
        } catch (error) {
            console.error(error)

        }

    } else {
        _prof = data.fields.profileImg[0]
    }

    for (let i = 0; i < tempLinkCount; i++) {
        let obj = {}
        // obj.url = req.body.linkUrl+i
        obj.url = eval('data.fields.linkUrl' + i)[0]
        obj.title = eval('data.fields.linkTitle' + i)[0]
        obj.image = eval('data.fields.linkImg' + i)[0]
        obj.fullWidth = eval('data.fields.linkFullScreen' + i)[0]
        let date = eval('data.fields.linkDate' + i)[0]
        let ObjDate = new Date(date)
        obj.date = ObjDate
        // obj.clicks = req.body
        // obj.fullWidth = req.body
        // obj.disabled = req.body

        console.log(obj)
        arr.push(obj)
    }
    console.log(arr)


    try {
        let update = await User.findByIdAndUpdate(
            { _id: data.fields._id[0] },
            {
                $set: {
                    name: data.fields.name[0],
                    username: data.fields.username[0],
                    about: data.fields.about[0],
                    profileImg: _prof,
                    links: arr,
                    darkModeProfile: data.fields.darkMode[0],
                    backgroundImage: data.fields.profBg[0],
                    profession: data.fields.profession[0],

                }
            }
        )

        console.log(update)
        res.json(update)
    } catch (error) {
        console.error(error)
    }









}



export const config = {
    api: {
        bodyParser: false,
    },
};
