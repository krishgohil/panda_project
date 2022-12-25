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

    useEffect(() => {
        setdarkMode(displayDarkMode)
    }, [displayDarkMode])
    const keywords = [
        'People',
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
        'Books',
        'Youtube',
    ]

    const [activeElement, setActiveElement] = useState('All')
    const router = useRouter()
    const goto = (value) => {
        if (value === "People") {
            router.push(`/`)

        } else {
            const link = value.toLowerCase()
            router.push(`/${link}`)
        }
    }


    return (
        <>
            <div className='categoriesBar' style={darkMode ? { backgroundColor: "black" } : { backgroundColor: 'white' }} id='content' >
               
                {
                    keywords.map((value, i) => (

                        <div
                            // to={`/upp/${value}`.toLowerCase()}
                            // to={'/upp'value.toLowerCase()} 
                            onClick={() => goto(value)}
                            style={darkMode ? { textDecoration: 'none', color: 'white', backgroundColor: "black" } : { textDecoration: 'none', color: 'black', backgroundColor: "whitesmoke" }} key={i} className={darkMode ? "too" : "too_dm"} >
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