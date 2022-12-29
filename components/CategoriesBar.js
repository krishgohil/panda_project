import Router, { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useAppContext, useFeedContext } from '../context';
import Post from './Post';
import { AiOutlineSearch } from 'react-icons/ai';


const CategoriesBar = ({ extra, sethomeScroll }) => {

    const [darkMode, setdarkMode] = useState(false)


    const [addItem, setaddItem] = useState(false)

    const context = useAppContext()
    const context_feed = useFeedContext()

    const { username, name, _id, profileImg, about, guest, links } = context.sharedState
    const { displayDarkMode, feed_Data, category } = context_feed.feedstate
    const router = useRouter()

    const { input } = router.query

    useEffect(() => {
        setdarkMode(displayDarkMode)
    }, [displayDarkMode])

    useEffect(() => {
        console.log(category)
    }, [category])

    const keywords = [
        'Home',
        'Countries',
        'Places',
        'Colleges',
        'Restaurants',
        'Companies',
        'Books',
        'Hotels',
        'Sports',
        'Shows',
        'Stocks',
        'Youtube',
    ]


    const [activeElement, setActiveElement] = useState('All')
    const goto = (value) => {

        // console.log(router.pathname)
        if (router.pathname !== "/search/[input]") {

            const link = value.toLowerCase()
            let category
            if (link !== "home") {
                category = link
            } else { category = "" }
            context_feed.setfeedstate({ ...context_feed.feedstate, category: category })

            if (value === "Home") {
                router.push(`/`)

            } else {
                router.push(`/${link}`)
            }

        } else {
            const link = value.toLowerCase()
            let category
            if (link !== "home") {
                category = link
            } else { category = "" }
            context_feed.setfeedstate({ ...context_feed.feedstate, category: category })

            // router.push({
            //     pathname: `/search/${input}`,
            //     query: {
            //         category: category,
            //     }
            // }, undefined, { shallow: true }
            // )
        }
    }

    var keep = 0
    window.onscroll = () => {
        // console.log(keep, "llll", window.scrollY)
        var stickbar = document.getElementById('stickbar')
        if (stickbar) {
            if (window.scrollY < keep) {
                stickbar.style.top = "56px"
                // console.log(stickbar, 'stickbar', keep)
            } else {
                // console.log("eles", stickbar)
                stickbar.style.top = "-56px"
            }
            keep = window.scrollY
        }

    }
    return (
        <>
            <div className='stickbar' id='stickbar' style={{ width: '100%', scrollMargin: 0, scrollbarWidth: 0, position: "sticky", }} >

                <div className='categoriesBar' style={darkMode ? { backgroundColor: "rgb(17, 15, 15)" } : { backgroundColor: 'white' }} id='content' >

                    {
                        keywords.map((value, i) => (

                            <div
                                // to={`/upp/${value}`.toLowerCase()}
                                // to={'/upp'value.toLowerCase()} 


                                onClick={() => goto(value)}
                                style={
                                    category == `${value.toLowerCase()}` || (value == "Home" && (router.pathname == "/" || (router.pathname == `/search/[input]` && category == ""))) ? { border: "2px solid orange" } : {}} key={i} className={darkMode ? "too_dm" : "too"} >
                                {router.pathname == `/search/[input]` && value == "Home" ? "People" : value}
                                {
                                    router.pathname == `/search/[input]` ?
                                        <AiOutlineSearch style={{ marginLeft: '4px' }} ></AiOutlineSearch>
                                        : ''
                                }
                            </div>
                        ))
                    }
                </div >
            </div >




        </>
    )
}

export default CategoriesBar