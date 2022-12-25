import { useState } from 'react';
import { createContext, useContext } from 'react';

const AppContext = createContext();
const YtContext = createContext()
const FeedContext = createContext()

export function AuthWrapper({ children }) {
    const [sharedState, setsharedState] = useState(
        {
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
    )

    return (
        <AppContext.Provider value={{ sharedState, setsharedState }}>
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
    return useContext(AppContext);
}













// feed context

export function FeedWrapper({ children }) {
    const [feedstate, setfeedstate] = useState(
        {
            feed_Data: [],
            displayDarkMode: false,
            category: ""
        }
    )

    return (
        <FeedContext.Provider value={{ feedstate, setfeedstate }}>
            {children}
        </FeedContext.Provider>
    );
}

export function useFeedContext() {
    return useContext(FeedContext);
}

