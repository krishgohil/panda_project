// IT WILL CONNECT TO THE DATABASE WITH THE USE OF MONGOOSE

import mongoose from "mongoose";


// const mongoURI = "mongodb+srv://uboutuser:krishubout@cluster0.gzy5hhg.mongodb.net/?retryWrites=true&w=majority"
const mongoURI = "mongodb+srv://uboutuser:krishubout@cluster0.gzy5hhg.mongodb.net/ubout"


const connectToMongo = () => {

    mongoose.connect(mongoURI, () => {
        console.log("mdb connected and runs")
    })
}

module.exports = connectToMongo;