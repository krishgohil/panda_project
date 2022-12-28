import React from 'react'
import { useEffect } from 'react'
import { useAppContext } from '../context'
import { host } from '../host'

const Auth = () => {
    const context = useAppContext()

    useEffect(() => {

        console.log(context)
        fetchUniqueUser()

    }, [])


    async function fetchUniqueUser() {
        const utoken = localStorage.getItem("utoken")
        // console.log(utoken)

        if (utoken) {
            const response = await fetch(`${host}/api/fetchuniqueuser`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ utoken }),
            });
            const json = await response.json();
            console.log(json)
            const { fetchuniqueser, message } = json
            context.setsharedState(
                {
                    name: json.fetchuniqueser.name,
                    profileImg: json.fetchuniqueser.profileImg,
                    username: json.fetchuniqueser.username,
                    about: json.fetchuniqueser.about,
                    _id: json.fetchuniqueser._id,
                    ratings: json.fetchuniqueser.ratings,
                    accountType: json.fetchuniqueser.accountType,
                    notificationToken: json.fetchuniqueser.notificationToken,
                    notificationSettings: json.fetchuniqueser.notificationSettings,
                    notificationCount: json.fetchuniqueser.notificationCount,
                    links: json.fetchuniqueser.links,
                    totalRating: json.fetchuniqueser.totalRating,
                    avgRating: json.fetchuniqueser.avgRating,
                    profileVisits: json.fetchuniqueser.profileVisits,
                    uniqueProfileVisits: json.fetchuniqueser.uniqueProfileVisits,
                    referrers: json.fetchuniqueser.referrers,
                    totalLinkClicks: json.fetchuniqueser.totalLinkClicks,
                    darkModeProfile: json.fetchuniqueser.darkModeProfile
                }
            )
        }



    }

    return (
        <></>
    )
}

export default Auth