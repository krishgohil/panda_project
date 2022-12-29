import React, { useEffect, useState } from 'react'
import { Col, Container, Navbar, Row, Spinner } from 'react-bootstrap'


import { FaBars, FaMoon, FaStar, FaSun, FaUserCircle } from 'react-icons/fa';

import InfiniteScroll from 'react-infinite-scroll-component';

import { host } from '../../host';
import Router, { useRouter } from 'next/router';
import Header from '../../components/Header';
import Link from 'next/link';
import styles from '../../styles/Home.module.css'
import { useAppContext, useFeedContext } from '../../context';
import CategoriesBar from '../../components/CategoriesBar';

const Search = () => {
    const context = useAppContext()
    const context_feed = useFeedContext()

    const { username, name, _id, profileImg, about, guest, links } = context.sharedState
    const { displayDarkMode, feed_Data, category } = context_feed.feedstate
    const router = useRouter()
    const { input } = router.query
    const [searchedResults, setsearchedResults] = useState([])
    const [searchedUsers, setsearchedUsers] = useState([])
    const [loading, setloading] = useState(false)
    const [_input, set_input] = useState('')
    const [notFound, setnotFound] = useState(false)

    const [darkMode, setdarkMode] = useState(false)
    useEffect(() => {


        if (router.pathname === "/search/[input]") {
            
            setloading(true)
            setnotFound(false)
            setsearchedResults([])
            setsearchedUsers([])
            search()
        }
    }, [input, category])

    useEffect(() => {



    }, [])




    useEffect(() => {


        // console.log(displayDarkMode, "ok", darkMode)
        setdarkMode(displayDarkMode)
        if (displayDarkMode) {
            document.getElementsByTagName("body")[0].style.backgroundColor = "black"
        } else {
            document.getElementsByTagName("body")[0].style.backgroundColor = "white"
        }

    }, [displayDarkMode])

    const handleSubmit = e => {

        e.preventDefault()
        // let x = input.replace(/\s\s+/g, ' ')
        console.log(input)
        Router.push(`/search/${input}`)



    }



    async function search() {
        console.log("rabba")
        const response = await fetch(`${host}/api/search`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ input: input, category: category }),
        });
        const json = await response.json();
        console.log(json)
        if (category === "") {
            setsearchedUsers(json)
            if (json.length == 0) { setnotFound(true) }
        } else {
            setsearchedResults(json)
            if (json.length == 0) { setnotFound(true) }
        }
        setloading(false)

    }


    return (
        <>
            <Container fluid className={darkMode ? 'app__main_dm' : 'app__main'} style={{ marginBottom: "16px" }} >
                {
                    loading ?
                        <div style={{ textAlign: "center", width: "100%", padding: 0, display: "flex", justifyContent: "center", height: "50px" }} >
                            <Spinner animation="border" color='orange' style={{ color: "orange" }} />
                        </div> : ""
                }
                {
                    notFound ?
                        <>
                            <h3 style={{ textAlign: "center", margin: "50px 0 16px 0" }} >
                                No results found <br /> for your search.
                            </h3>
                            <p style={{ textAlign: "center" }} >
                                Please try refining your search <br /> terms or try a different search.
                            </p>
                        </> : ""
                }
                <Row className={styles.cardMainRow} style={{ margin: '0', display: "flex" }}  >


                    {
                        searchedUsers && searchedUsers.length > 0 ?
                            <InfiniteScroll

                                id='myHeader'
                                dataLength={searchedUsers.length}
                                // next={fetchNew}
                                hasMore={true}
                                className={styles.row}

                                // loader={

                                //     !nomore ?
                                //         <div style={{ textAlign: "center", width: "100%", padding: 0, display: "flex", justifyContent: "center", height: "50px" }} >
                                //             <Spinner animation="border" color='orange' style={{ color: "orange" }} />
                                //         </div> : ""
                                // }
                                style={{ padding: 0, margin: 0, display: "flex", justifyContent: "center", }}
                            >

                                {
                                    searchedUsers && searchedUsers.length > 0 && searchedUsers.map((peep, i) =>
                                        <Col
                                            onClick={() => {
                                                Router.push(`/${peep.username}`)
                                            }}
                                            className={styles.row}
                                            lg={3} md={4} xs={6} key={i} style={{ margin: " 0 0 0.5rem 0", padding: "0.5rem", borderRadius: "1rem", }}   >
                                            <Link scroll={false} href={`/${peep.username}`} style={{ textDecoration: "none", color: 'inherit', height: "100%", width: "100%" }} >
                                                <div className={darkMode ? styles.linkCard_dm : styles.linkCard} style={{ height: "100%", width: "100%" }}  >
                                                    <div className={styles.imgupdiv} style={darkMode ? { display: "flex", justifyContent: "center", borderRadius: " 0", backgroundColor: "rgb(70,70,70)" } : { display: "flex", justifyContent: "center", borderRadius: " 0", backgroundColor: "rgb(214,214,214)" }} >
                                                        <img className={styles.img} src={peep.profileImg} alt="" />
                                                    </div>


                                                    <div style={{ padding: "0.5rem" }} >

                                                        <div style={{ display: "flex" }} >
                                                            <p style={{ textAlign: "center", width: "100%", fontSize: "14px", marginBottom: "0.5rem" }} ><b>{peep.name}</b></p>
                                                            {/* <h6>Entrepreneur</h6> */}
                                                        </div>
                                                        <p className={styles.ppp} style={{ fontSize: "13px", fontFamily: "sans-serif", marginBottom: "0.5rem", whiteSpace: 'pre-wrap', wordBreak: "break-word" }} >
                                                            {/* Student at Veermata Jijabai Technological Institute (VJTI) */}
                                                            {peep.about}
                                                        </p>

                                                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                                                            <p className={styles.card_p} style={
                                                                darkMode ?
                                                                    { fontSize: "12px", fontFamily: "sans-serif", marginBottom: "0.5rem", backgroundColor: "#212121", padding: "0.15rem 0.5rem", borderRadius: "16px", whiteSpace: 'pre-wrap', wordBreak: "break-word" } : { fontSize: "12px", fontFamily: "sans-serif", marginBottom: "0.5rem", backgroundColor: "rgb(225, 225, 225)", padding: "0.15rem 0.5rem", borderRadius: "16px", whiteSpace: 'pre-wrap', wordBreak: "break-word" }
                                                            } >
                                                                {peep.profession}
                                                            </p>
                                                            <p style={{ fontSize: "13px", fontFamily: "sans-serif", marginBottom: "0.5rem", display: "flex", alignItems: "center", fontWeight: "600", marginLeft: "4px" }} >
                                                                {peep.totalRatingsLength > 0 ?

                                                                    peep.totalRating / peep.totalRatingsLength : '5'}
                                                                <FaStar color='orange' ></FaStar>

                                                            </p>

                                                        </div>

                                                    </div>
                                                    {/* <p>Architect & Engineer</p> */}
                                                </div>
                                            </Link>



                                        </Col>

                                    )
                                }



                            </InfiniteScroll> : ""
                    }

                    {
                        searchedResults && searchedResults.length > 0 ?
                            <InfiniteScroll

                                id='myHeader'
                                dataLength={searchedResults.length}
                                // next={fetchNew}
                                hasMore={true}
                                className={styles.row}

                                // loader={

                                //     !nomore ?
                                //         <div style={{ textAlign: "center", width: "100%", padding: 0, display: "flex", justifyContent: "center", height: "50px" }} >
                                //             <Spinner animation="border" color='orange' style={{ color: "orange" }} />
                                //         </div> : ""
                                // }
                                style={{ padding: 0, margin: 0, display: "flex", justifyContent: "center", }}
                            >

                                {
                                    searchedResults && searchedResults.length > 0 && searchedResults.map((peep, i) =>
                                        <>
                                            <Col

                                                className={styles.row}
                                                lg={3} md={4} xs={6} style={{ margin: "0.5rem 0", padding: "0.5rem", borderRadius: "1rem", }}   >
                                                <Link scroll={false} href={`/${peep.category}/${peep._id}`} style={{ textDecoration: "none", color: 'inherit', height: "100%", width: "100%" }} >
                                                    <div className={darkMode ? styles.linkCard_dm : styles.linkCard} style={{ height: "100%", width: "100%" }}  >
                                                        <div className={styles.imgupdiv} style={darkMode ? { display: "flex", justifyContent: "center", borderRadius: " 0", backgroundColor: "rgb(70,70,70)" } : { display: "flex", justifyContent: "center", borderRadius: " 0", backgroundColor: "rgb(214,214,214)" }} >
                                                            <img className={styles.img} src={peep.postimg[0]} alt="" style={{ borderRadius: 0, width: "100%" }} />
                                                        </div>


                                                        <div style={{ padding: "0.5rem" }} >

                                                            <div style={{ display: "flex" }} >
                                                                <p style={{ textAlign: "center", width: "100%", fontSize: "14px", marginBottom: "0.5rem" }} ><b>{peep.title}</b></p>
                                                            </div>
                                                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                                                <p className={styles.card_p} style={
                                                                    darkMode ?
                                                                        { fontSize: "12px", fontFamily: "sans-serif", marginBottom: "0.5rem", backgroundColor: "#212121", padding: "0.15rem 0.5rem", borderRadius: "16px", whiteSpace: 'pre-wrap', wordBreak: "break-word" } : { fontSize: "12px", fontFamily: "sans-serif", marginBottom: "0.5rem", backgroundColor: "rgb(225, 225, 225)", padding: "0.15rem 0.5rem", borderRadius: "16px", whiteSpace: 'pre-wrap', wordBreak: "break-word" }
                                                                } >
                                                                    Comedy
                                                                </p>
                                                                <p style={{ fontSize: "13px", fontFamily: "sans-serif", marginBottom: "0.5rem", display: "flex", alignItems: "center", fontWeight: "600", marginLeft: "4px" }} >
                                                                    5
                                                                    <FaStar color='orange' ></FaStar>

                                                                </p>

                                                            </div>

                                                        </div>
                                                    </div>
                                                </Link>
                                            </Col>

                                        </>

                                    )
                                }



                            </InfiniteScroll> : ''
                    }


                </Row>
            </Container>



        </>
    )
}

export default Search



// export async function getServerSideProps(context) {

//     const response = await fetch(`${host}/api/searchUsers`, {
//         method: 'PUT',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ input: context.params.input }),
//     });
//     const json = await response.json();
//     console.log(json)
//     return {
//         props: { results: json },
//     }
// }