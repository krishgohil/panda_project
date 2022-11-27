import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { Col, Container, Row, Spinner } from 'react-bootstrap'
import InfiniteScroll from 'react-infinite-scroll-component'
import styles from '../styles/Home.module.css'
import { FaStar } from 'react-icons/fa';
import Header from '../components/Header'

import { useDispatch, useSelector } from 'react-redux';
import { FEED_DATA_STORE } from '../actionType'
import { host } from '../host'
import Router from 'next/router'
import Link from 'next/link'

const rantbin = () => {
    const [darkMode, setdarkMode] = useState(false)
    const { displayDarkMode, feed_Data } = useSelector(state => state.feed)

    useEffect(() => {


        // console.log(displayDarkMode, "ok", darkMode)
        setdarkMode(displayDarkMode)
    }, [displayDarkMode])
    return (
        <>
            <Header />




            <Row className={styles.cardMainRow} style={{ margin: '0', display: "flex" }}  >


                <InfiniteScroll

                    id='myHeader'
                    dataLength={10}
                    // next={fetchNew}
                    hasMore={true}
                    className={styles.row}

                    // loader={

                    //     <Spinner animation="border" color='orange' style={{ color: "orange" }} />

                    // }
                    style={{ padding: 0, margin: 0, display: "flex", justifyContent: "center", }}
                >



                    <Col
                        onClick={() => {
                            // Router.push(`/${peep.username}`)
                        }}
                        className={styles.row}
                        lg={3} md={3} xs={6}  style={{ margin: "0.5rem 0", padding: "0.5rem", borderRadius: "1rem", }}   >
                        <Link scroll={false} href={`/`} style={{ textDecoration: "none", color: 'inherit', height: "100%", width: "100%" }} >
                            <div className={darkMode ? styles.linkCard_dm : styles.linkCard} style={{ height: "100%", width: "100%" }}  >
                                <div className={styles.imgupdiv} style={{ display: "flex", justifyContent: "center", borderRadius: " 0", }} >
                                    <img style={{width:"100%"}} src="./love.png" alt="" />
                                </div>


                                <div style={{ padding: "0.5rem" }} >

                                    <div style={{ display: "flex" }} >
                                        <p style={{ textAlign: "center", width: "100%", fontSize: "14px", marginBottom: "0.5rem" }} ><b>KRSH GOHIL</b></p>
                                        {/* <h6>Entrepreneur</h6> */}
                                    </div>
                                    <p className={styles.ppp} style={{ fontSize: "13px", fontFamily: "sans-serif", marginBottom: "0.5rem", whiteSpace: 'pre-wrap', wordBreak: "break-word" }} >
                                        {/* Student at Veermata Jijabai Technological Institute (VJTI) */}
                                        aboutx
                                    </p>

                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                                        <p className={styles.card_p} style={
                                            darkMode ?
                                                { fontSize: "12px", fontFamily: "sans-serif", marginBottom: "0.5rem", backgroundColor: "#212121", padding: "0.15rem 0.5rem", borderRadius: "16px", whiteSpace: 'pre-wrap', wordBreak: "break-word" } : { fontSize: "12px", fontFamily: "sans-serif", marginBottom: "0.5rem", backgroundColor: "rgb(225, 225, 225)", padding: "0.15rem 0.5rem", borderRadius: "16px", whiteSpace: 'pre-wrap', wordBreak: "break-word" }
                                        } >
                                            profess
                                        </p>
                                        <p style={{ fontSize: "13px", fontFamily: "sans-serif", marginBottom: "0.5rem", display: "flex", alignItems: "center", fontWeight: "600", marginLeft: "4px" }} >

                                            <FaStar color='orange' ></FaStar>

                                        </p>

                                    </div>

                                </div>
                                {/* <p>Architect & Engineer</p> */}
                            </div>
                        </Link>



                    </Col>

                    <Col
                        onClick={() => {
                            // Router.push(`/${peep.username}`)
                        }}
                        className={styles.row}
                        lg={3} md={3} xs={6}  style={{ margin: "0.5rem 0", padding: "0.5rem", borderRadius: "1rem", }}   >
                        <Link scroll={false} href={`/`} style={{ textDecoration: "none", color: 'inherit', height: "100%", width: "100%" }} >
                            <div className={darkMode ? styles.linkCard_dm : styles.linkCard} style={{ height: "100%", width: "100%" }}  >
                                <div className={styles.imgupdiv} style={{ display: "flex", justifyContent: "center", borderRadius: " 0", }} >
                                    <img style={{width:"100%"}} src="./degree.png" alt="" />
                                </div>


                                <div style={{ padding: "0.5rem" }} >

                                    <div style={{ display: "flex" }} >
                                        <p style={{ textAlign: "center", width: "100%", fontSize: "14px", marginBottom: "0.5rem" }} ><b>KRSH GOHIL</b></p>
                                        {/* <h6>Entrepreneur</h6> */}
                                    </div>
                                    <p className={styles.ppp} style={{ fontSize: "13px", fontFamily: "sans-serif", marginBottom: "0.5rem", whiteSpace: 'pre-wrap', wordBreak: "break-word" }} >
                                        {/* Student at Veermata Jijabai Technological Institute (VJTI) */}
                                        aboutx
                                    </p>

                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                                        <p className={styles.card_p} style={
                                            darkMode ?
                                                { fontSize: "12px", fontFamily: "sans-serif", marginBottom: "0.5rem", backgroundColor: "#212121", padding: "0.15rem 0.5rem", borderRadius: "16px", whiteSpace: 'pre-wrap', wordBreak: "break-word" } : { fontSize: "12px", fontFamily: "sans-serif", marginBottom: "0.5rem", backgroundColor: "rgb(225, 225, 225)", padding: "0.15rem 0.5rem", borderRadius: "16px", whiteSpace: 'pre-wrap', wordBreak: "break-word" }
                                        } >
                                            profess
                                        </p>
                                        <p style={{ fontSize: "13px", fontFamily: "sans-serif", marginBottom: "0.5rem", display: "flex", alignItems: "center", fontWeight: "600", marginLeft: "4px" }} >

                                            <FaStar color='orange' ></FaStar>

                                        </p>

                                    </div>

                                </div>
                                {/* <p>Architect & Engineer</p> */}
                            </div>
                        </Link>



                    </Col>
                    <Col
                        onClick={() => {
                            // Router.push(`/${peep.username}`)
                        }}
                        className={styles.row}
                        lg={3} md={3} xs={6}  style={{ margin: "0.5rem 0", padding: "0.5rem", borderRadius: "1rem", }}   >
                        <Link scroll={false} href={`/`} style={{ textDecoration: "none", color: 'inherit', height: "100%", width: "100%" }} >
                            <div className={darkMode ? styles.linkCard_dm : styles.linkCard} style={{ height: "100%", width: "100%" }}  >
                                <div className={styles.imgupdiv} style={{ display: "flex", justifyContent: "center", borderRadius: " 0", }} >
                                    <img style={{width:"100%"}} src="./gender.png" alt="" />
                                </div>


                                <div style={{ padding: "0.5rem" }} >

                                    <div style={{ display: "flex" }} >
                                        <p style={{ textAlign: "center", width: "100%", fontSize: "14px", marginBottom: "0.5rem" }} ><b>KRSH GOHIL</b></p>
                                        {/* <h6>Entrepreneur</h6> */}
                                    </div>
                                    <p className={styles.ppp} style={{ fontSize: "13px", fontFamily: "sans-serif", marginBottom: "0.5rem", whiteSpace: 'pre-wrap', wordBreak: "break-word" }} >
                                        {/* Student at Veermata Jijabai Technological Institute (VJTI) */}
                                        aboutx
                                    </p>

                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                                        <p className={styles.card_p} style={
                                            darkMode ?
                                                { fontSize: "12px", fontFamily: "sans-serif", marginBottom: "0.5rem", backgroundColor: "#212121", padding: "0.15rem 0.5rem", borderRadius: "16px", whiteSpace: 'pre-wrap', wordBreak: "break-word" } : { fontSize: "12px", fontFamily: "sans-serif", marginBottom: "0.5rem", backgroundColor: "rgb(225, 225, 225)", padding: "0.15rem 0.5rem", borderRadius: "16px", whiteSpace: 'pre-wrap', wordBreak: "break-word" }
                                        } >
                                            profess
                                        </p>
                                        <p style={{ fontSize: "13px", fontFamily: "sans-serif", marginBottom: "0.5rem", display: "flex", alignItems: "center", fontWeight: "600", marginLeft: "4px" }} >

                                            <FaStar color='orange' ></FaStar>

                                        </p>

                                    </div>

                                </div>
                                {/* <p>Architect & Engineer</p> */}
                            </div>
                        </Link>



                    </Col>
                    <Col
                        onClick={() => {
                            // Router.push(`/${peep.username}`)
                        }}
                        className={styles.row}
                        lg={3} md={3} xs={6}  style={{ margin: "0.5rem 0", padding: "0.5rem", borderRadius: "1rem", }}   >
                        <Link scroll={false} href={`/`} style={{ textDecoration: "none", color: 'inherit', height: "100%", width: "100%" }} >
                            <div className={darkMode ? styles.linkCard_dm : styles.linkCard} style={{ height: "100%", width: "100%" }}  >
                                <div className={styles.imgupdiv} style={{ display: "flex", justifyContent: "center", borderRadius: " 0", }} >
                                    <img style={{width:"100%"}} src="./salary.png" alt="" />
                                </div>


                                <div style={{ padding: "0.5rem" }} >

                                    <div style={{ display: "flex" }} >
                                        <p style={{ textAlign: "center", width: "100%", fontSize: "14px", marginBottom: "0.5rem" }} ><b>KRSH GOHIL</b></p>
                                        {/* <h6>Entrepreneur</h6> */}
                                    </div>
                                    <p className={styles.ppp} style={{ fontSize: "13px", fontFamily: "sans-serif", marginBottom: "0.5rem", whiteSpace: 'pre-wrap', wordBreak: "break-word" }} >
                                        {/* Student at Veermata Jijabai Technological Institute (VJTI) */}
                                        aboutx
                                    </p>

                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                                        <p className={styles.card_p} style={
                                            darkMode ?
                                                { fontSize: "12px", fontFamily: "sans-serif", marginBottom: "0.5rem", backgroundColor: "#212121", padding: "0.15rem 0.5rem", borderRadius: "16px", whiteSpace: 'pre-wrap', wordBreak: "break-word" } : { fontSize: "12px", fontFamily: "sans-serif", marginBottom: "0.5rem", backgroundColor: "rgb(225, 225, 225)", padding: "0.15rem 0.5rem", borderRadius: "16px", whiteSpace: 'pre-wrap', wordBreak: "break-word" }
                                        } >
                                            profess
                                        </p>
                                        <p style={{ fontSize: "13px", fontFamily: "sans-serif", marginBottom: "0.5rem", display: "flex", alignItems: "center", fontWeight: "600", marginLeft: "4px" }} >

                                            <FaStar color='orange' ></FaStar>

                                        </p>

                                    </div>

                                </div>
                                {/* <p>Architect & Engineer</p> */}
                            </div>
                        </Link>



                    </Col>
                    <Col
                        onClick={() => {
                            // Router.push(`/${peep.username}`)
                        }}
                        className={styles.row}
                        lg={3} md={3} xs={6}  style={{ margin: "0.5rem 0", padding: "0.5rem", borderRadius: "1rem", }}   >
                        <Link scroll={false} href={`/`} style={{ textDecoration: "none", color: 'inherit', height: "100%", width: "100%" }} >
                            <div className={darkMode ? styles.linkCard_dm : styles.linkCard} style={{ height: "100%", width: "100%" }}  >
                                <div className={styles.imgupdiv} style={{ display: "flex", justifyContent: "center", borderRadius: " 0", }} >
                                    <img style={{width:"100%"}} src="./country.png" alt="" />
                                </div>


                                <div style={{ padding: "0.5rem" }} >

                                    <div style={{ display: "flex" }} >
                                        <p style={{ textAlign: "center", width: "100%", fontSize: "14px", marginBottom: "0.5rem" }} ><b>KRSH GOHIL</b></p>
                                        {/* <h6>Entrepreneur</h6> */}
                                    </div>
                                    <p className={styles.ppp} style={{ fontSize: "13px", fontFamily: "sans-serif", marginBottom: "0.5rem", whiteSpace: 'pre-wrap', wordBreak: "break-word" }} >
                                        {/* Student at Veermata Jijabai Technological Institute (VJTI) */}
                                        aboutx
                                    </p>

                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                                        <p className={styles.card_p} style={
                                            darkMode ?
                                                { fontSize: "12px", fontFamily: "sans-serif", marginBottom: "0.5rem", backgroundColor: "#212121", padding: "0.15rem 0.5rem", borderRadius: "16px", whiteSpace: 'pre-wrap', wordBreak: "break-word" } : { fontSize: "12px", fontFamily: "sans-serif", marginBottom: "0.5rem", backgroundColor: "rgb(225, 225, 225)", padding: "0.15rem 0.5rem", borderRadius: "16px", whiteSpace: 'pre-wrap', wordBreak: "break-word" }
                                        } >
                                            profess
                                        </p>
                                        <p style={{ fontSize: "13px", fontFamily: "sans-serif", marginBottom: "0.5rem", display: "flex", alignItems: "center", fontWeight: "600", marginLeft: "4px" }} >

                                            <FaStar color='orange' ></FaStar>

                                        </p>

                                    </div>

                                </div>
                                {/* <p>Architect & Engineer</p> */}
                            </div>
                        </Link>



                    </Col>
                    <Col
                        onClick={() => {
                            // Router.push(`/${peep.username}`)
                        }}
                        className={styles.row}
                        lg={3} md={3} xs={6}  style={{ margin: "0.5rem 0", padding: "0.5rem", borderRadius: "1rem", }}   >
                        <Link scroll={false} href={`/`} style={{ textDecoration: "none", color: 'inherit', height: "100%", width: "100%" }} >
                            <div className={darkMode ? styles.linkCard_dm : styles.linkCard} style={{ height: "100%", width: "100%" }}  >
                                <div className={styles.imgupdiv} style={{ display: "flex", justifyContent: "center", borderRadius: " 0", }} >
                                    <img style={{width:"100%"}} src="./friends.png" alt="" />
                                </div>


                                <div style={{ padding: "0.5rem" }} >

                                    <div style={{ display: "flex" }} >
                                        <p style={{ textAlign: "center", width: "100%", fontSize: "14px", marginBottom: "0.5rem" }} ><b>KRSH GOHIL</b></p>
                                        {/* <h6>Entrepreneur</h6> */}
                                    </div>
                                    <p className={styles.ppp} style={{ fontSize: "13px", fontFamily: "sans-serif", marginBottom: "0.5rem", whiteSpace: 'pre-wrap', wordBreak: "break-word" }} >
                                        {/* Student at Veermata Jijabai Technological Institute (VJTI) */}
                                        aboutx
                                    </p>

                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                                        <p className={styles.card_p} style={
                                            darkMode ?
                                                { fontSize: "12px", fontFamily: "sans-serif", marginBottom: "0.5rem", backgroundColor: "#212121", padding: "0.15rem 0.5rem", borderRadius: "16px", whiteSpace: 'pre-wrap', wordBreak: "break-word" } : { fontSize: "12px", fontFamily: "sans-serif", marginBottom: "0.5rem", backgroundColor: "rgb(225, 225, 225)", padding: "0.15rem 0.5rem", borderRadius: "16px", whiteSpace: 'pre-wrap', wordBreak: "break-word" }
                                        } >
                                            profess
                                        </p>
                                        <p style={{ fontSize: "13px", fontFamily: "sans-serif", marginBottom: "0.5rem", display: "flex", alignItems: "center", fontWeight: "600", marginLeft: "4px" }} >

                                            <FaStar color='orange' ></FaStar>

                                        </p>

                                    </div>

                                </div>
                                {/* <p>Architect & Engineer</p> */}
                            </div>
                        </Link>



                    </Col>






                </InfiniteScroll>


            </Row>

        </>
    )
}

export default rantbin