import React, { useEffect, useState } from 'react'
import { Col, Container, Navbar, Row, Spinner } from 'react-bootstrap'


import { FaBars, FaMoon, FaStar, FaSun, FaUserCircle } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';

import InfiniteScroll from 'react-infinite-scroll-component';

import { host } from '../../host';
import Router, { useRouter } from 'next/router';
const Search = () => {
    const { username, name, _id, profileImg, about, guest, links } = useSelector(state => state.auth)
    const { displayDarkMode } = useSelector(state => state.feed)
    const { query } = useRouter()
    const dispatch = useDispatch()

    const [_input, set_input] = useState('')
    const [people, setpeople] = useState([])

    const [darkMode, setdarkMode] = useState(false)
    useEffect(() => {
        console.log(query)

        // dispatch(searchUsers())
    }, [query])


    useEffect(() => {


        // console.log(displayDarkMode, "ok", darkMode)
        setdarkMode(displayDarkMode)
    }, [displayDarkMode])

    const handleSubmit = e => {

        e.preventDefault()
        // let x = query.replace(/\s\s+/g, ' ')
        console.log(query)
        router.push(`/search/${query}`)



    }

    const [searchedResults, setsearchedResults] = useState([])

    const searchUsers = () => async dispatch => {
        console.log("rabba")
        const response = await fetch(`${host}/api/searchUsers`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId: _id, input: query }),
        });
        const json = await response.json();
        console.log(json)
        setsearchedResults(json)


    }

  
    return (
        <>
            <Container fluid className={darkMode ? 'app__main_dm' : 'app__main'}>
                <Row style={{ display: "flex", justifyContent: "center", minHeight: "90vh", overflowY: "scroll", scrollMargin: 0, }} >




                    <InfiniteScroll

                        id='myHeader'
                        dataLength={searchedResults.length}
                        // next={fetchNew}
                        hasMore={true}
                        className='row'

                        // loader={

                        //     <div style={{ textAlign: "center", width: "100%", padding: 0, display: "flex", justifyContent: "center", height: "50px" }} >
                        //         <Spinner animation="border" color='orange' style={{ color: "orange" }} />
                        //     </div>
                        // }
                        style={{ padding: 0, margin: 0, display: "flex", justifyContent: "center", }}
                    >
                        {
                            searchedResults.map((peep, i) =>
                                <Col  className={darkMode ? "linkCard_dm" : "linkCard"} lg={3} md={3} xs={5} key={i} style={{ margin: "1rem 0.5rem", padding: "0", borderRadius: "1rem", }}   >
                                    <div className="contain">
                                        <div style={{ display: "flex", justifyContent: "center", }} >
                                            <img src={peep.profileImg} alt="" style={{ width: "50%", borderRadius: "50%", marginTop: "0.5rem", }} />
                                        </div>


                                        <div style={{ padding: "0.5rem" }} >

                                            <div style={{ display: "flex" }} >
                                                <p style={{ textAlign: "center", width: "100%", fontSize: "14px", marginBottom: "0.5rem" }} ><b>{peep.name}</b></p>
                                                {/* <h6>Entrepreneur</h6> */}
                                            </div>
                                            <p className='ppp' style={{ fontSize: "13px", fontFamily: "sans-serif", marginBottom: "0.5rem", whiteSpace: 'pre-wrap', wordBreak: "break-word" }} >
                                                {/* Student at Veermata Jijabai Technological Institute (VJTI) */}
                                                {peep.about}
                                            </p>

                                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                                <p style={
                                                    darkMode ?
                                                        { fontSize: "12px", fontFamily: "sans-serif", marginBottom: "0.5rem", backgroundColor: "#212121", padding: "0.15rem 0.5rem", borderRadius: "16px", whiteSpace: 'pre-wrap', wordBreak: "break-word" } : { fontSize: "12px", fontFamily: "sans-serif", marginBottom: "0.5rem", backgroundColor: "#f2f2f2", padding: "0.15rem 0.5rem", borderRadius: "16px", whiteSpace: 'pre-wrap', wordBreak: "break-word" }
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



                                </Col>

                            )
                        }
                    </InfiniteScroll>






                </Row>
            </Container>



        </>
    )
}

export default Search