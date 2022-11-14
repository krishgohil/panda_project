const mongoose = require("mongoose");
import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
    newNotifications: { type: Number, default: 0 },
    logged_in: { type: Boolean, default: false },
    name: { type: Object, required: true },
    birthDate: { type: String },
    gender: { type: String },


    // secure
    email: { type: String, required: true, unique: true },
    password: { type: String, },
    loginAttempts: { type: Number, default: 0 },
    tempLoginBanTill: { type: Date, default: Date.now },

    _OAauthUser: { type: Boolean, default: false },

    //profile info
    username: { type: Object, required: true, unique: true },
    date: { type: Date, default: Date.now },
    profileImg: {
        type: String,
        default: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
    accountType: { type: String, default: 'Public' },

    // for confirmation 
    temp_id: { type: String },
    confirmation_status: { type: String },
    resetPasswordAttempt: { type: Boolean },
    resetPasswordId: { type: String },



    profileVisits: { type: Number, default: 0 },
    uniqueProfileVisits: { type: Number, default: 0 },
    totalLinkClicks: { type: Number, default: 0 },
    backgroundImage: { type: String, default: "" },
    darkModeProfile: { type: Boolean, default: false },
    about: { type: String, default: "" },
    profession: { type: String, default: "Works" },
    links: [{
        url: { type: String },
        title: { type: String },
        image: { type: String },
        clicks: { type: Number, default: 0 },
        fullWidth: { type: Boolean, default: false },
        disabled: { type: Boolean, default: false },
        date: { type: Date, default: Date.now }
    }],

    visitors: [
        {
            visitor_ip: { type: String },
            date: { type: Date, default: Date.now }
        }
    ],




    totalRating: { type: Number, default: 0 },
    totalRatingsLength: { type: Number, default: 0 },

    referrers: [

        {
            domain: { type: String },
            visitsCount: { type: Number },
            date: { type: Date, default: Date.now },
            allVisits: [
                {
                    visitor_ip: { type: String },
                    date: { type: Date, default: Date.now }
                }

            ]
        }

    ],

    ratings: [
        {
            isHidden: { type: Boolean, default: false },
            rating: { type: Number, default: 0 },
            raterId: { type: String },
            rater: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
            raterComment: { type: String },
            ratingDate: { type: Date, default: Date.now },
            replies: [
                {
                    replierId: { type: String },
                    replier: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
                    reply: { type: String },
                    replyDate: { type: Date, default: Date.now }
                }
            ],
        }
    ],

    notifications: [
        {
            action: { type: String },
            actioner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
            actionerId: { type: String },
            actionDate: { type: Date, default: Date.now }
        }
    ],






});


UserSchema.index({ name: 'text', username: 'text' }, { weights: { name: 10, username: 5 } })



// const User = models.User || model('User', UserSchema);

// export default User;


const User = models.User || model('User', UserSchema);
module.exports = User


