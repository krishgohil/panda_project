import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useAppContext, useFeedContext } from '../context'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper'
import { BsReply } from 'react-icons/bs';
import { AiOutlineClose } from 'react-icons/ai';
import Stars from './Stars';
import { Form } from 'react-bootstrap';
import { MdLocationOn } from 'react-icons/md';
import Link from 'next/link';
import { host } from '../host';
const SinglePost = ({ title, postimg, description }) => {

    const context = useAppContext()
    const context_feed = useFeedContext()
    const router = useRouter()
    const { _id, username, profileImg } = context.sharedState
    const { displayDarkMode } = context_feed.feedstate
    const [darkMode, setdarkMode] = useState(false)
    useEffect(() => {
      setdarkMode(displayDarkMode)
    }, [displayDarkMode])

    

    return (
        <>

            <dialog open style={{ position: 'absolute', border: 'none', color: 'white', zIndex: 999, left: '0%', backgroundColor: "rgba(0,0,0,.85)", height: '100vh', width: '100vw', position: 'fixed', display: 'flex', overflow: 'hidden', justifyContent: 'center', top: '0vh', alignItems: 'center', padding: 0 }}>


                <Head>
                    <title>Reviews on {title}</title>
                    <meta name="description" content={`Reviews on ${title}`} />
                    <meta
                        name="keywords"
                        content={`title`}
                    />
                </Head>
                <div className='uniqDiv'  >


                    <div className='cmntPostInfo' style={{ borderRadius: "0.5rem 0 0 0.5rem", color: "white" }} >


                        <div style={{ marginTop: "0.5rem", padding: "0.25rem" }}>


                            <div style={{ color: "white", fontWeight: "600", fontSize: "1rem", textAlign: "center" }}>
                                {title}
                            </div>
                            <div style={{ color: "white", fontSize: "0.9rem" }}>
                                {/* {parse(feed.description)} */}

                                {description}


                            </div>

                            <div style={{ width: '100%' }}>
                                
                                <Swiper
                                    className='jkliop'
                                    style={{ width: 'auto', height: "auto", backgroundColor: "#16181b", }}
                                    modules={[Navigation, Pagination, Scrollbar, A11y]}
                                    slidesPerView={1}
                                    navigation
                                    pagination={{ clickable: true }}
                                    scrollbar={{ draggable: true }}
                                >

                                    {
                                        postimg.map((img, i) => {
                                            return (

                                                <div key={i} >
                                                    <SwiperSlide style={{ width: '100%', borderRadius: "0.5rem", padding: "0.25rem", backgroundColor: "#16181b", }} >
                                                        <img alt="img" style={{
                                                            width: '100%',
                                                        }} src={img} />
                                                    </SwiperSlide>

                                                </div>

                                            )
                                        })
                                    }
                                </Swiper>

                            </div>







                            <div style={{ display: "flex", marginTop: "1rem", justifyContent: "space-around", borderTop: "1px solid rgb(41,41,41)", padding: '0.25rem 0', borderBottom: "1px solid rgb(41,41,41)" }} >







                            </div>

                        </div>
                    </div>
                    <div id="commentSection" className='commentSection' style={{}}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', height: '5vh', alignItems: 'center', color: "silver" }}>
                            <div style={{ display: "flex", alignItems: 'center', }} >

                                <span style={{ marginLeft: '1rem', fontWeight: '500' }}>Comments </span>
                                <span style={{ color: 'gray', marginLeft: '0.2rem' }} >
                                    5
                                </span>
                                <span style={{ marginLeft: '1rem', fontWeight: '500' }}>Views </span>
                                <span style={{ color: 'gray', marginLeft: '0.2rem' }} >
                                    69
                                </span>



                            </div>

                            <div style={{ display: "flex", padding: "0 0.5rem" }} >

                                <AiOutlineClose onClick={() => {
                                    router.back()
                                }} style={{ cursor: 'pointer', color: "white" }} size={24} />

                            </div>
                        </div>
                        <div className='jfkslxk'  >
                            <div style={{ display: "flex", paddingTop: "0.5rem", marginLeft: "0.5rem", alignItems: 'center', }} >
                                <img alt="img" src={profileImg} style={{
                                    height: '2.5rem',
                                    width: '2.5rem', borderRadius: '50%', marginRight: '0.6rem'
                                }} ></img>
                                <div style={{ margin: 0, display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: "center" }}>

                                    <div style={{ margin: 0, display: 'flex', justifyContent: 'space-between' }}>
                                        <div style={{ margin: 0, display: 'flex', flexDirection: 'row', overflowY: 'scroll' }}>

                                            <Stars
                                            />

                                        </div>
                                    </div>






                                </div>

                            </div>
                            <div style={{ width: "100%", display: 'flex', alignItems: 'center', justifyContent: "space-between" }} >

                                {/* <TextareaAutosize onChange={onchange} value={comment} maxRows={3} style={{ caretColor: 'white', color: 'white', outline: 'none', border: 'none', borderBottom: '1px solid black', bottom: 0, padding: '0.5rem', margin: '0.5rem', width: "100%", resize: 'none', backgroundColor: "rgb(15, 15, 15)", borderRadius: '8px' }} /> */}

                                <Form.Control

                                    // onChange={(e) => settempUserInfo({ ...tempUserInfo, about: e.target.value })}
                                    as="textarea"
                                    placeholder="Write a review"
                                    style={darkMode ? { caretColor: 'white', color: 'white', outline: 'none', border: 'none', borderBottom: '1px solid black', bottom: 0, padding: '0.5rem', margin: '0.5rem', width: "100%", resize: 'none', backgroundColor: "rgb(15, 15, 15)", borderRadius: '8px' } : { caretColor: 'white', color: 'white', outline: 'none', border: 'none', borderBottom: '1px solid black', bottom: 0, padding: '0.5rem', margin: '0.5rem', width: "100%", resize: 'none', backgroundColor: "rgb(15, 15, 15)", borderRadius: '8px' }}
                                    rows={3}

                                // value={tempUserInfo.about}
                                />
                                <button style={{ border: '1px solid black', padding: '0.5rem 1rem 0.5rem 1rem', marginRight: '0.5rem', borderRadius: '0.5rem', backgroundColor: '#0095f6', color: 'white', fontWeight: 'bold' }}
                                >Post</button>


                            </div>
                        </div>

                        <div className='uihjkl'>
                            comments here
                        </div>





                    </div>
                </div>








            </dialog>

        </>
    )
}

export default SinglePost