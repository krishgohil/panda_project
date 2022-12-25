import Router, { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useAppContext, useFeedContext } from '../context';
import Post from './Post';


const CategoriesBar = ({ extra, sethomeScroll }) => {

    const [darkMode, setdarkMode] = useState(false)


    const [addItem, setaddItem] = useState(false)

    const context = useAppContext()
    const context_feed = useFeedContext()

    const { username, name, _id, profileImg, about, guest, links } = context.sharedState
    const { displayDarkMode, feed_Data } = context_feed.feedstate
    const router = useRouter()

    useEffect(() => {
        setdarkMode(displayDarkMode)
    }, [displayDarkMode])

    useEffect(() => {


        console.log(router.pathname)
    }, [router])

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
        const link = value.toLowerCase()
        context_feed.setfeedstate({ ...context_feed.feedstate, category: link })

        if (value === "Home") {
            router.push(`/`)

        } else {
            router.push(`/${link}`)
        }
    }


    return (
        <>
            <div className='categoriesBar' style={darkMode ? { backgroundColor: "rgb(17, 15, 15)" } : { backgroundColor: 'white' }} id='content' >

                {
                    keywords.map((value, i) => (

                        <div
                            // to={`/upp/${value}`.toLowerCase()}
                            // to={'/upp'value.toLowerCase()} 


                            onClick={() => goto(value)}
                            style={router.pathname == `/${value.toLowerCase()}` || (value == "Home" && router.pathname == "/") ? { border: "2px solid orange" } : {}} key={i} className={darkMode ? "too_dm" : "too"} >
                            {value}
                        </div>
                    ))
                }
            </div >


            <Modal
                show={addItem}
                onHide={() => {
                    setaddItem(false)
                }
                }
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            // style={{ padding: "0.5rem" }}

            >
                <Post></Post>
            </Modal>

        </>
    )
}

export default CategoriesBar