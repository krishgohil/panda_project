import { GET_USER_DETAILS } from "../actionType";

const initialState = {

    name: '',
    profileImg: '',
    username: '',
    about: '',
    ratings: [],
    _id: '',
    accountType: "",
    notificationToken: "",
    guest: null,
    notificationSettings: {},
    notificationCount: 0,
    links: [],
    profileVisits: 0,
    backgroundImage: "",
    totalRating: 0,
    avgRating: 0,
    referrers: [],
    totalLinkClicks: 0,
    uniqueProfileVisits: 0,
    darkModeProfile: false
}

export const authReducer = (prevState = initialState, action) => {

    const { type, payload } = action;

    switch (type) {
        case GET_USER_DETAILS:
            return {
                ...prevState,
                name: payload.name,
                profileImg: payload.profileImg,
                about: payload.about,
                username: payload.username,
                _id: payload._id,

                ratings: payload.ratings,

                accountType: payload.accountType,
                notificationToken: payload.notificationToken,
                notificationSettings: payload.notificationSettings,
                notificationCount: payload.notificationCount,
                guest: false,
                links: payload.links,
                totalRating: payload.totalRating,
                avgRating: payload.avgRating,
                profileVisits: payload.profileVisits,
                uniqueProfileVisits: payload.uniqueProfileVisits,
                referrers: payload.referrers,
                totalLinkClicks: payload.totalLinkClicks,
                darkModeProfile: payload.darkModeProfile,
            }


        default:
            return prevState;
    }

}