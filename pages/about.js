import React, { useEffect, useState } from 'react'
import Router from 'next/router'

import { Col, Container, Row } from 'react-bootstrap'
// import { FaStar } from 'react-icons/fa'
// import { host } from '../../Host'
import { MdOutlineCopyright } from 'react-icons/md'
import { useDispatch } from 'react-redux';
import { host } from '../host';
import { FaStar } from 'react-icons/fa'
import styles from '../styles/about.module.css'
import { useRouter } from 'next/router';

const About = () => {
    const dispatch = useDispatch()
    const router = useRouter()

    useEffect(() => {
        dispatch(fetchpeople())
    }, [])

    const [people, setpeople] = useState([])
    const fetchpeople = () => async dispatch => {
        const response = await fetch(`${host}/api/fetchpeople`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({}),
        });
        const json = await response.json();

        setpeople(json.users)

    }
    return (
        <div   >

            <div style={{
                backgroundColor: "black", color: "orange", padding: "0.5rem", display: "flex", alignItems: "center",
                height: "56px", justifyContent: "space-evenly"
            }} >
                <div style={{ display: "flex", alignItems: "center" }} >
                    <img src="./icon-192x192.png" alt="" style={{ height: "44px", userSelect: "none" }} />
                    <h1 style={{ margin: 0, userSelect: "none" }} >Ubout</h1>
                </div>
                <button className={`${styles.btn_grad} ${styles.diffbg}`} onClick={() => router.push('/signup')} >Sign In</button>
            </div>

            <div style={{ height: "100vh", width: "100vw", backgroundColor: "#fc0398", color: "white", display: "flex", justifyContent: "space-evenly", alignItems: "center", overflowY: "scroll", scrollMargin: "0" }} >
                <div style={{ display: "flex", flexDirection: "column", }} >
                    <h1 style={{ border: "5px solid white", padding: "2rem", borderRadius: "1rem" }} >

                        Create your profile <br></br>
                        In Less Than <br /> A Minute
                        <br />
                    </h1>

                    <button className={`${styles.btn_grad} ${styles.diffbg}`} onClick={() => router.push('/signup')} >Sign Up Now</button>

                </div>

                <img src="./ss1.png" alt="" style={{ height: "80vh" }} />


            </div >

            <div style={{ width: "100vw", backgroundColor: "black", color: "white", display: "flex", justifyContent: "space-evenly", alignItems: "center", padding: "1rem 0", flexDirection: "column" }} >
                <h1>Explore Profiles</h1>
                <Container fluid>
                    <Row style={{ display: "flex", justifyContent: "center", }} >




                        {
                            people.map((peep, i) => {
                                if (i < 6) {
                                    return (
                                        <Col onClick={() => navigate(`/${peep.username}`)} className={true ? "linkCard_dm" : "linkCard"} lg={3} md={3} xs={5} key={i} style={{ margin: "1rem 0.5rem", padding: "0", borderRadius: "1rem", }}   >
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
                                                            true ?
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
                                } else {
                                    return (
                                        <>
                                        </>
                                    )
                                }
                            }

                            )
                        }





                    </Row>
                </Container>
            </div>


            <div style={{ width: "100vw", backgroundColor: "indigo", color: "white", display: "flex", justifyContent: "space-evenly", alignItems: "center", padding: "1rem 0", flexDirection: "column" }} >

                <div style={{ height: "100vh", width: "100vw", backgroundColor: "indigo", color: "white", display: "flex", justifyContent: "space-evenly", alignItems: "center", overflowY: "scroll", scrollMargin: "0" }} >
                    <div style={{ display: "flex", flexDirection: "column", }} >
                        <h1 style={{ border: "5px solid white", padding: "2rem", borderRadius: "1rem" }} >

                            Rate you friends <br></br>
                            And Your Colleagues <br /> And Randoms
                            <br />
                        </h1>

                        {/* <button className={`${styles.btn-grad} ${styles.diffbg}` diffbg' onClick={()=>router.push('/signup')} >Sign Up Now</button> */}

                    </div>

                    <img src="./ss1.png" alt="" style={{ height: "80vh" }} />


                </div>
                <div style={{ height: "100vh", width: "100vw", backgroundColor: "indigo", color: "white", display: "flex", justifyContent: "space-evenly", alignItems: "center", overflowY: "scroll", scrollMargin: "0" }} >
                    <div style={{ display: "flex", flexDirection: "column", }} >
                        <h1 style={{ border: "5px solid white", padding: "2rem", borderRadius: "1rem" }} >

                            Share your link <br></br>
                            On Different <br /> Platforms
                            <br />
                        </h1>

                        <button className={`${styles.btn_grad} ${styles.diffbg}`} onClick={() => router.push('/signup')} >Sign Up Now</button>

                    </div>

                    <img src="./ss1.png" alt="" style={{ height: "80vh" }} />


                </div>
            </div >
            <footer className={styles.lpfooter} >
                <div className={styles.lpfooterlone}  >

                    <div style={{ textAlign: "center", color: "white" }} >
                        <img alt="img" src='./icon-192x192.png' style={{ width: "10rem", userSelect: "none" }} ></img>
                        <h3 style={{ marginBottom: "1rem", userSelect: "none" }} >Keepitupp</h3>
                        <p style={{ width: "80%", margin: "0 auto" }} >We are creating a tool where people can market all their products and links at one place.</p>
                    </div>

                    <div style={{ color: "silver", cursor: "pointer" }} >
                        <p >Terms of Service</p>
                        <p  >Privacy</p>
                        <p  >Contact Us</p>
                        <p >About</p>
                    </div>
                </div>
                <div style={{
                    marginTop: '2rem',
                    color: "gray", textAlign: "center"
                }} >
                    Copyright <MdOutlineCopyright /> <span>Keepitupp</span> 2022 @All rights reserved
                </div>
            </footer>
        </div >
    )
}

export default About