import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { RiHomeLine } from 'react-icons/ri'
import { useFeedContext } from '../context'

const SearchResults = () => {
    const context_feed = useFeedContext()
    const { displayDarkMode } = context_feed.feedstate
    const [darkMode, setdarkMode] = useState(false)
    const router = useRouter()
    useEffect(() => {
        if (displayDarkMode !== darkMode) {

            setdarkMode(displayDarkMode)
        }
    }, [displayDarkMode])

    return (
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: 'center' }} >
            <h5 style={{ backgroundColor: darkMode ? "rgb(17, 15, 15)" : "white", padding: "4px 0 4px 16px ", margin: "0", color: darkMode ? "white" : "black" }} >Search Results</h5>
            <div onClick={() => {
                router.push('/')
                context_feed.setfeedstate({ ...context_feed.feedstate, category: "" })
            }} style={{ color: darkMode ? "white" : "black", display: "flex", alignItems: 'center', backgroundColor: darkMode ? "rgb(30,30,30)" : "whitesmoke", padding: "0 8px", margin: "0 16px 0 0 ", cursor: "pointer",borderRadius:"6px" }} >
                Home
                <RiHomeLine color={darkMode ? "white" : "black"} style={{ margin: "0 0 0 4px", }} size={20} />
            </div>

        </div>
    )
}

export default SearchResults