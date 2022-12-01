import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Header from '../components/Header'

import styles from "../styles/krishg.module.css"
const krishgohil = () => {
    return (
        <div>

            <Header />
            <div className={styles.maindiv} >


                <div className={styles.top1div}>



                    <div  >
                        <img src="./android-chrome-512x512.png" alt="" style={{ borderRadius: "50%", width: "100%" }} />
                    </div>


                    <div style={{ backgroundColor: "rgb(50,50,50)", padding: "1rem" }} >
                        <h1>KRISH GOHIL</h1>
                        {/* <h1 style={{ padding: "0.5rem", }} >Professional   Mechanical   Engineer </h1>
                        <h1 style={{ padding: "0.5rem", }} >Passionate   Programmer  </h1>
                        <h1 style={{ padding: "0.5rem", }} >LifeLong  Learner  </h1> */}

                        <h3>
                            "If Necessity is the mother of all Inventions then <br /> Curiosity is father of all Discoveries"
                        </h3>

                        <h6 style={{ color: "silver" }} >
                            A curious Mechanical Engineer that loves programming and building things
                            <br />
                            I write about Finance, Geopolitics, Philosophy, Sports
                        </h6>

                    </div>
                </div>

                <Container className={styles.top2div}    >
                    <Row >
                        <h2>BLOGS</h2>

                        <Col lg={4} md={6} xs={12} className={styles.blogcardmain} >
                            <div style={{ backgroundColor: "black" }} >
                                <img src="./android-chrome-512x512.png" alt="" style={{ borderRadius: "50%", width: "100%" }} />
                                <p style={{ padding: "0.5rem",backgroundColor:"gray" }}>UBout- A Rating App or A link in bio app Lets find out jdkfjalf kjfjsd klajslfjklj</p>
                            </div>
                        </Col>
                        <Col lg={4} md={6} xs={12} className={styles.blogcardmain} >
                            <div style={{ backgroundColor: "black" }} >
                                <img src="./android-chrome-512x512.png" alt="" style={{ borderRadius: "50%", width: "100%" }} />
                                <p style={{ padding: "0.5rem",backgroundColor:"gray" }}>UBout- A Rating App or A link in bio app Lets find out jdkfjalf kjfjsd klajslfjklj</p>
                            </div>
                        </Col>
                        <Col lg={4} md={6} xs={12} className={styles.blogcardmain} >
                            <div style={{ backgroundColor: "black" }} >
                                <img src="./android-chrome-512x512.png" alt="" style={{ borderRadius: "50%", width: "100%" }} />
                                <p style={{ padding: "0.5rem",backgroundColor:"gray" }}>UBout- A Rating App or A link in bio app Lets find out jdkfjalf kjfjsd klajslfjklj</p>
                            </div>
                        </Col>
                        <Col lg={4} md={6} xs={12} className={styles.blogcardmain} >
                            <div style={{ backgroundColor: "black" }} >
                                <img src="./android-chrome-512x512.png" alt="" style={{ borderRadius: "50%", width: "100%" }} />
                                <p style={{ padding: "0.5rem",backgroundColor:"gray" }}>UBout- A Rating App or A link in bio app Lets find out jdkfjalf kjfjsd klajslfjklj</p>
                            </div>
                        </Col>
                        <Col lg={4} md={6} xs={12} className={styles.blogcardmain} >
                            <div style={{ backgroundColor: "black" }} >
                                <img src="./android-chrome-512x512.png" alt="" style={{ borderRadius: "50%", width: "100%" }} />
                                <p style={{ padding: "0.5rem",backgroundColor:"gray" }}>UBout- A Rating App or A link in bio app Lets find out jdkfjalf kjfjsd klajslfjklj</p>
                            </div>
                        </Col>
                        <Col lg={4} md={6} xs={12} className={styles.blogcardmain} >
                            <div style={{ backgroundColor: "black" }} >
                                <img src="./android-chrome-512x512.png" alt="" style={{ borderRadius: "50%", width: "100%" }} />
                                <p style={{ padding: "0.5rem",backgroundColor:"gray" }}>UBout- A Rating App or A link in bio app Lets find out jdkfjalf kjfjsd klajslfjklj</p>
                            </div>
                        </Col>
                       

                    </Row>
                </Container>



            </div>

        </div>
    )
}

export default krishgohil