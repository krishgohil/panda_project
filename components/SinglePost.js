import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useAppContext, useFeedContext } from '../context'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper'
import { BsFlag, BsReply, BsThreeDots, BsThreeDotsVertical } from 'react-icons/bs';
import { AiOutlineClose } from 'react-icons/ai';
import Stars from './Stars';
import { Form, Modal } from 'react-bootstrap';
import { MdDelete, MdLocationOn, MdOutlineDelete } from 'react-icons/md';
import { BiUpvote, BiDownvote, BiCommentDetail } from 'react-icons/bi'
import Link from 'next/link';
import { host } from '../host';
import { FaRegEye, FaRegEyeSlash, FaRegStar, FaStar } from 'react-icons/fa';
import { DateTime } from 'luxon';
const SinglePost = ({ title, postimg, description, props }) => {

    const context = useAppContext()
    const context_feed = useFeedContext()
    const router = useRouter()
    const { _id, username, profileImg } = context.sharedState
    const { displayDarkMode } = context_feed.feedstate
    const [darkMode, setdarkMode] = useState(false)

    const stars = Array(5).fill(0)
    const [starRating, setstarRating] = useState(0);
    const [hoverValue, setHoverValue] = useState(undefined);
    const [message, setmessage] = useState('')
    const [hasRated, sethasRated] = useState(false)
    const [prevRating, setprevRating] = useState(0)
    const [show, setshow] = useState(false)
    const [result, setresult] = useState([]);
    const [average, setaverage] = useState(0)



    useEffect(() => {
        setdarkMode(displayDarkMode)
    }, [displayDarkMode])

    useEffect(() => {

        fetchreviews()
    }, [_id])




    async function fetchreviews() {
        setstarRating(0)
        console.log('inside social rating 2')
        const response = await fetch(`${host}/api/post/fetchreviews`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ postId: props._id, userId: _id }),
        });
        const json = await response.json();
        console.log(json)
        // console.log(json.final.length)
        setshow(true)
        setresult(json.ratedBy)

        var has_rated = false
        var prev_rating = 0
        for (let i = 0; i < json.ratedBy.length; i++) {
            if (json.ratedBy[i].raterId == _id) {
                has_rated = true
                prev_rating = json.ratedBy[i].rating


            }
        }
        if (has_rated == true) {
            sethasRated(true)
            setprevRating(prev_rating)
            setstarRating(prev_rating)
        }


        let avg = json.totalRating / json.totalRatingsLength
        console.log(avg, json.totalRating, json.totalRatingsLength)
        if (avg == Infinity) {
            avg = 0
        }
        if (Number.isNaN(avg) == false) {
            avg = avg
        }
        else if (Number.isNaN(avg) == true) {
            avg = 0
        }

        setaverage(avg)
    }


    const handleMouseOver = newHoverValue => {
        setHoverValue(newHoverValue)
    };

    const handleMouseLeave = () => {
        setHoverValue(undefined)
    }

    const handleClick = (value) => {
        setstarRating(value)
    }






    const postSS = () => {
        // setstarRating(0)
        // setmessage('')

        if (!_id) {
            return (
                toast.error('Sign Up to use all features', {
                    position: "top-left",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
            )
        }
        console.log(message)
        console.log(starRating, props._id)

        var scoreDifference
        if (hasRated && prevRating > 0) {

            scoreDifference = starRating - prevRating
            console.log(scoreDifference)
            // console.log(notificationSettings, "ajajajaj", notificationToken)
            postreview(scoreDifference)
        } else {

            scoreDifference = starRating
            console.log(scoreDifference)
            postreview(scoreDifference)
        }
    }



    async function postreview(scoreDifference) {
        console.log('users chala', starRating)
        const response = await fetch(`${host}/api/post/postreview`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                raterComment: message, userId: _id, rating: starRating, postId: props._id, hasRated: hasRated, scoreDifference: scoreDifference,
                // notificationToken: notificationToken, notificationSettings: notificationSettings,
                username: username
            }),
        });
        const json = await response.json();
        console.log(json)
        setstarRating(0)
        setmessage('')
        fetchreviews()
    }


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


                    <div className='cmntPostInfo' style={{ borderRadius: "0.5rem 0 0 0.5rem", color: "white", backgroundColor: darkMode ? "black" : "white", color: darkMode ? "white" : "black" }} >


                        <div style={{ marginTop: "0.5rem", padding: "0.25rem" }}>


                            <h3 style={{ fontWeight: "600", textAlign: "center" }}>
                                {title}
                            </h3>

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
                                                    <SwiperSlide style={{
                                                        width: '100%', borderRadius: "0.5rem",
                                                        //  padding: "0.25rem", 
                                                        backgroundColor: "#16181b",
                                                    }} >
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


                            <div style={{ fontSize: "0.9rem", marginTop: "16px" }}>
                                {/* {parse(feed.description)} */}

                                {description}


                            </div>





                            {/* <div style={{ display: "flex", marginTop: "1rem", justifyContent: "space-around", borderTop: "1px solid rgb(41,41,41)", padding: '0.25rem 0', borderBottom: "1px solid rgb(41,41,41)" }} >







                            </div> */}

                        </div>
                    </div>
                    <div id="commentSection" className='commentSection' style={{ backgroundColor: darkMode ? "black" : "white", color: darkMode ? "white" : "black" }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', height: '5vh', alignItems: 'center', color: darkMode ? "white" : "black", marginBottom: "8px", }}>
                            <div style={{ display: "flex", alignItems: 'center', }} >

                                <span style={{ marginLeft: '1rem', fontWeight: '500' }}>Reviews </span>
                                <span style={{ color: darkMode ? "white" : "black", marginLeft: '0.2rem', fontWeight: "700" }} >
                                    {result.length}
                                </span>
                                <span style={{ marginLeft: '1rem', fontWeight: '500' }}>Views </span>
                                <span style={{ color: darkMode ? "white" : "black", marginLeft: '0.2rem', fontWeight: "700" }} >
                                    69
                                </span>

                                <span style={{ marginLeft: '1rem', fontWeight: '500', display: "flex", alignItems: "center" }}>Avg
                                    <FaStar color={darkMode ? "white" : "black"} size={14} ></FaStar>
                                </span>
                                <span style={{ color: darkMode ? "white" : "black", marginLeft: '0.2rem', fontWeight: "700" }} >
                                    {average}
                                </span>



                            </div>

                            <div style={{ display: "flex", padding: "0 0.5rem" }} >

                                <AiOutlineClose onClick={() => {
                                    router.back()
                                }} style={{ cursor: 'pointer', color: darkMode ? "white" : "black" }} size={24} />

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

                                            {stars.map((_, index) => {
                                                return (
                                                    <>
                                                        {
                                                            (hoverValue || starRating) > index ?
                                                                <FaStar
                                                                    key={index}
                                                                    size={24}
                                                                    onClick={() => { return (handleClick(index + 1)) }}
                                                                    onMouseOver={() => handleMouseOver(index + 1)}
                                                                    onMouseLeave={handleMouseLeave}
                                                                    color='orange'

                                                                    style={{
                                                                        margin: "0.5rem",
                                                                        cursor: "pointer",
                                                                        padding: '0rem'
                                                                    }}
                                                                /> :
                                                                <FaRegStar
                                                                    key={index}
                                                                    size={24}
                                                                    onClick={() => { return (handleClick(index + 1)) }}
                                                                    onMouseOver={() => handleMouseOver(index + 1)}
                                                                    onMouseLeave={handleMouseLeave}
                                                                    color='gray'

                                                                    style={{
                                                                        margin: "0.5rem",
                                                                        cursor: "pointer",
                                                                        padding: '0rem'
                                                                    }}
                                                                />

                                                        }

                                                    </>
                                                )
                                            })}


                                        </div>
                                    </div>






                                </div>

                            </div>
                            <div style={{ width: "100%", display: 'flex', alignItems: 'center', justifyContent: "space-between" }} >


                                <Form.Control

                                    onChange={(e) => setmessage(e.target.value)}
                                    as="textarea"
                                    placeholder="Write a review"
                                    value={message}
                                    style={darkMode ? { caretColor: 'white', color: 'white', outline: 'none', border: 'none', borderBottom: '1px solid black', bottom: 0, padding: '0.5rem', margin: '0.5rem', width: "100%", resize: 'none', backgroundColor: "rgb(15, 15, 15)", borderRadius: '8px' } : { caretColor: 'black', color: 'black', outline: 'none', border: 'none', borderBottom: '1px solid black', bottom: 0, padding: '0.5rem', margin: '0.5rem', width: "100%", resize: 'none', backgroundColor: "whitesmoke", borderRadius: '8px' }}
                                    rows={3}
                                />

                                <button onClick={postSS} style={{ border: '1px solid black', padding: '0.5rem 1rem 0.5rem 1rem', marginRight: '0.5rem', borderRadius: '0.5rem', backgroundColor: '#0095f6', color: 'white', fontWeight: 'bold' }}
                                >Post</button>


                            </div>
                        </div>


                        <div className='uihjkl' style={{ backgroundColor: darkMode ? "black" : "white", color: darkMode ? "white" : "black", }} >
                            {
                                show ?
                                    <>

                                        {/* <div style={{ display: "flex", alignItems: "center", marginBottom: "1rem", paddingLeft: "0.5rem" }} >
                                            <h6 style={{ marginBottom: "0" }} >All Reviews</h6>
                                            <h6 style={{ marginBottom: "0", marginLeft: "16px" }}>{average == 0 ? 5 : average}</h6>
                                            <FaStar color='orange' ></FaStar>
                                        </div> */}

                                        <div style={{ minHeight: "50px", paddingLeft: "0.5rem" }} >
                                            {
                                                result.map((item, i) => {
                                                    return (
                                                        <RatingItem fetchreviews={fetchreviews} darkMode={darkMode} item={item} props={props} key={i} profileImg={profileImg} _id={_id} prevRating={prevRating} sethasRated={sethasRated} setprevRating={setprevRating} ></RatingItem>
                                                    )
                                                })
                                            }
                                        </div>

                                    </>
                                    : ""
                            }
                        </div>





                    </div>
                </div>








            </dialog>

        </>
    )
}

export default SinglePost


const RatingItem = ({ profileImg, item, _id, props, prevRating, darkMode, fetchreviews, sethasRated, setprevRating }) => {

    const [options, setoptions] = useState(false)
    const [tempHidden, settempHidden] = useState(false)
    const [downvotes, setdownvotes] = useState(0)
    const [upvotes, setupvotes] = useState(0)
    const [replies, setreplies] = useState(0)
    const [tempDeleted, settempDeleted] = useState(false)
    const [commentOpts, setcommentOpts] = useState(false)
    const [replyOpts, setreplyOpts] = useState(false)
    const [prevResult, setprevResult] = useState()


    useEffect(() => {
        if (item.rater._id != _id) {
            settempHidden(item.isHidden)
        }

        if (item.upvotedBy && item.upvotedBy.length > 0) {
            for (let i = 0; i < item.upvotedBy.length; i++) {
                if (item.upvotedBy[i].upvoterId == _id) {
                    setupvoted(true)
                }
            }
            setupvotes(item.upvotedBy.length)
        }

        if (item.downvotedBy && item.downvotedBy.length > 0) {
            for (let i = 0; i < item.downvotedBy.length; i++) {
                if (item.downvotedBy[i].downvoterId == _id) {
                    setdownvoted(true)
                }
            }
            setdownvotes(item.downvotedBy.length)
        }

        if (item.replies) {
            setreplies(item.replies.length)
        }
    }, [item])



    const optFunc = (e) => {
        if (options) {
            setoptions(false)
        } else {
            setoptions(true)
        }
    }

    const hideScoreFunc = (e) => {
        settempHidden(true)
        setoptions(false)
        console.log(item)

        ideScore()
    }

    const showScoreFunc = (e) => {
        settempHidden(false)
        setoptions(false)
            (showScore())
    }

    async function hideScore() {
        console.log('post chala')
        const response = await fetch(`${host}/api/ratings/hideScore`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId: _id, postId: props._id, commentId: item._id }),
        });
        const json = await response.json();
        console.log(json)
        if (json.modifiedCount > 0) {
            settempHidden(true)
        }
    }

    async function showScore(score) {
        console.log(score)
        console.log('post chala')
        const response = await fetch(`${host}/api/ratings/showScore`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId: _id, postId: props._id, commentId: item._id }),
        });
        const json = await response.json();
        console.log(json)
        if (json.modifiedCount > 0) {
            settempHidden(false)
        }
    }

    const delrating = () => {
        if (window.confirm("Do you want to delete this score?") == true) {

            let score = prevRating
            console.log(score)
            setoptions(false)
            delscore(score)
        }
    }

    async function delscore(score) {
        console.log(score)
        console.log('post chala')
        const response = await fetch(`${host}/api/post/delrating`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId: _id, postId: props._id, score: score }),
        });
        const json = await response.json();
        console.log(json)
        sethasRated(false)
        setprevRating(0)
        fetchreviews()

    }


    const [upvoted, setupvoted] = useState(false)
    const [downvoted, setdownvoted] = useState(false)
    const [showComments, setshowComments] = useState(false)

    const clickUpvote = () => {
        if (downvoted) {
            setdownvoted(false)
            setdownvotes(downvotes - 1)
            remove_downvote_comment()
        }

        if (upvoted) {
            setupvoted(false)
            setupvotes(upvotes - 1)
            remove_upvote_comment()

        } else {
            // alert("koool")
            setupvoted(true)
            setupvotes(upvotes + 1)
            upvote_comment()
        }

    }

    const clickDownvote = () => {

        if (upvoted) {
            console.log("ruc")
            setupvoted(false)
            setupvotes(upvotes - 1)
            remove_upvote_comment()
        }

        if (downvoted) {
            console.log("rdc")

            setdownvoted(false)
            setdownvotes(downvotes - 1)
            remove_downvote_comment()

        } else {
            setdownvoted(true)
            setdownvotes(downvotes + 1)

            downvoteComment()
        }
    }

    const clickComment = () => {
        console.log('clickComment')
        setshowReplyInput(value => !value)
    }


    const [showReplyInput, setshowReplyInput] = useState(false)
    const [showReplies, setshowReplies] = useState(false)
    const [reply, setreply] = useState('')


    const cancelReply = () => {
        setshowReplyInput(false)
    }
    const submitReply = () => {
        setshowReplyInput(false)
        postreply()
    }
    const showRepliesfunc = () => {
        // setshowReplies(!showReplies)
        if (showReplies === false) {
            fetchreplies()
        }
        else {
            setshowReplies(false)
        }
        console.log(showReplies)
    }

    const setReply = (e) => {
        setreply(e.target.value)
    }




    async function postreply() {
        try {

            const response = await fetch(`${host}/api/post/postreply`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ postId: props._id, userId: _id, commentId: item._id, reply })
            })
            const json = await response.json();
            console.log(json)
            fetchreplies()



        } catch (error) {
            console.log(error)

        }
    }





    async function fetchreplies(temp) {
        try {
            console.log(item._id)

            const response = await fetch(`${host}/api/post/fetchreplies`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ postId: props._id, userId: _id, commentId: item._id })
            })
            const json = await response.json();
            console.log(json)
            for (let i = 0; i < json.ratedBy.length; i++) {

                if (json.ratedBy[i]._id == item._id) {
                    // console.log(json.ratedBy[0].replies)
                    setreplies(json.ratedBy[i].replies)
                    setshowReplies(true)
                }
            }
        } catch (error) {
            console.log(error)

        }
    }

    const [tricolon, setTricolon] = useState(false)
    const hoverOnComment = () => {
        setTricolon(true)

    }
    const hoverOutComment = () => {
        setTricolon(false)
        // seteditReview(false)

    }


    async function upvote_comment() {

        console.log(props._id)
        console.log(item._id)

        console.log(item.raterComment)
        console.log(item.rater._id)

        try {

            const response = await fetch(`${host}/api/post/upvoteComment`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ postId: props._id, userId: _id, commentId: item._id })
            })
            const json = await response.json();
            console.log(json)
            if (prevResult !== 'like') {
                setprevResult('like')
            }
            // fetchcomments())
        } catch (error) {
            console.log(error)
        }


    }
    async function remove_upvote_comment() {


        try {

            const response = await fetch(`${host}/api/post/remove_upvote_comment`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ postId: props._id, userId: _id, commentId: item._id })
            })
            const json = await response.json();
            console.log(json)
            if (prevResult !== 'like') {
                setprevResult('like')
            }
            // fetchcomments())
        } catch (error) {
            console.log(error)
        }

    }


    async function downvoteComment() {

        try {
            const response = await fetch(`${host}/api/post/downvoteComment`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ postId: props._id, userId: _id, commentId: item._id, })
            })
            const json = await response.json();
            console.log(json)
        } catch (error) {
            console.log(error)
        }
    }

    async function remove_downvote_comment() {
        try {

            const response = await fetch(`${host}/api/post/remove_downvote_comment`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ postId: props._id, userId: _id, commentId: item._id, })
            })
            const json = await response.json();
            console.log(json)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div style={(item.raterId === _id && tempHidden) || (!tempHidden) ? { display: "block" } : { display: "none" }} >

            {
                tempHidden ?
                    <div style={{ marginLeft: "0rem", color: "silver", fontSize: "12px" }} >
                        hidden
                    </div>
                    : ""
            }
            <div style={{ display: "block" }} >


                <div style={{ display: "flex", marginBottom: '1rem', width: "100%" }}>

                    <div style={{ width: "2.75rem", marginRight: '0.5rem' }} >
                        <img alt="img" src={item.rater.profileImg} style={{
                            height: '2.75rem',
                            width: '2.75rem', borderRadius: '50%', marginRight: '0.6rem'
                        }}
                        // onClick={onclick}
                        ></img>
                    </div>


                    <div style={{ margin: 0, width: '100%' }}>


                        <div style={{ width: "100%", display: 'flex', }} >
                            <p style={{ marginBottom: 0, fontWeight: 'bold', fontSize: '0.9rem', width: '50%' }}>
                                {item.rater.username}
                            </p>
                            <p style={{ marginBottom: 0, fontWeight: 'bold', fontSize: '0.9rem', display: "flex", alignItems: 'center', width: '20%' }}>
                                {item.rating}

                                <FaStar color='orange' ></FaStar>

                            </p>
                            {
                                item.raterId === _id ?
                                    <div style={{ padding: "0 0.5rem" }} >
                                        {
                                            options ? <BsThreeDots onClick={optFunc} size={14} />
                                                :
                                                <BsThreeDotsVertical onClick={optFunc} size={14} />
                                        }
                                    </div>
                                    : ''
                            }

                            {options ?
                                <Modal
                                    show={options}
                                    onHide={() => {
                                        setoptions(false)
                                    }
                                    }
                                    // size="lg"
                                    aria-labelledby="contained-modal-title-vcenter"
                                    centered
                                // style={{margin:"0 1rem"}}
                                >
                                    <div style={darkMode ? { backgroundColor: 'black', border: "", color: "white", } : { backgroundColor: 'white', border: "", }}
                                        className='delScoreopts' >
                                        {
                                            item.raterId === _id ?
                                                <button onClick={delrating} style={{ display: 'flex', alignItems: 'center', padding: "8px 16px", justifyContent: "center", border: "none", color: "white", backgroundColor: "red" }}>
                                                    <span style={{}} >Delete</span>
                                                    <span style={{ marginLeft: "0.5rem" }}> <MdDelete

                                                        size={18} /> </span>
                                                </button>
                                                : ""
                                        }



                                    </div>
                                </Modal>
                                : ""
                            }
                        </div>

                        <p style={{ marginBottom: 0, fontSize: '0.8rem', marginTop: '0.1rem', width: '100%', marginRight: '3rem', }}>
                            {item.raterComment}
                        </p>

                        <div style={{}} >


                            <span style={{ marginRight: '3rem', cursor: "pointer" }} onClick={clickUpvote}  >
                                <span>
                                    <BiUpvote size={16} color={upvoted ? 'orange' : darkMode ? "white" : "black"} />
                                </span>
                                <span style={{ fontSize: "0.8rem", color: 'gray', marginLeft: "0.2rem" }} >
                                    {upvotes}
                                </span>
                            </span>
                            <span style={{ marginRight: '6rem', cursor: "pointer" }} onClick={clickDownvote} >
                                <span>
                                    <BiDownvote size={16} color={downvoted ? 'orange' : darkMode ? "white" : "black"} />
                                </span>

                                <span style={{ fontSize: "0.8rem", color: 'gray', marginLeft: "0.2rem" }} >
                                    {downvotes}
                                </span>
                            </span>
                            <span onClick={clickComment} style={{ cursor: "pointer" }} >
                                <BiCommentDetail size={16} color={darkMode ? "white" : "black"} />
                            </span>
                        </div>

                        {
                            showReplyInput ?
                                <>

                                    <Form.Control

                                        onChange={setReply} as="textarea"
                                        placeholder="Reply"
                                        style={{ display: 'block', width: '100%', outline: 'none', border: 'none', borderBottom: '1px solid black', caretColor:  darkMode ?'white':"", color: 'white', marginTop: "1rem", padding: '0.25rem', resize: "none", backgroundColor: darkMode ? "rgb(17, 19, 26)" : "whitesmoke" }}
                                        rows={3}
                                    />


                                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                        <button onClick={cancelReply} style={{ border: 'none', color: 'black', padding: '0.5rem', marginLeft: '0.5rem', marginTop: '0.5rem', borderRadius: '0.5rem', fontSize: "0.8rem" }}>CANCEL</button>
                                        <button onClick={submitReply} style={{ border: 'none', backgroundColor: 'dodgerblue', padding: '0.5rem', marginLeft: '0.5rem', marginTop: '0.5rem', borderRadius: '0.5rem', fontSize: "0.8rem", color: 'white' }}  >REPLY</button>
                                    </div>
                                </>
                                : ''
                        }

                        {
                            item.replies && item.replies.length > 0 ?
                                <button onClick={showRepliesfunc} style={{ marginLeft: '9rem', border: 'none', color: 'gray', backgroundColor: 'inherit', marginTop: "0.5rem", fontSize: "12px" }} >{showReplies ? 'Hide' : "Show"} Replies</button>
                                : ''
                        }



                        {
                            showReplies && replies.length > 0 ?
                                replies.map((rep, i) => {
                                    return (
                                        <Reply key={i} rep={rep} userId={_id} item={item} postId={props._id} fetchreplies={fetchreplies} darkMode={darkMode} />

                                    )


                                })
                                : ""


                        }
                    </div>

                </div >
            </div>
        </div>
    )
}




const Reply = ({ rep, userId, item, postId, fetchreplies, darkMode }) => {
    const [upvoted, setupvoted] = useState(false)
    const [downvoted, setdownvoted] = useState(false)
    const [showComments, setshowComments] = useState(false)

    const [replyOpts, setreplyOpts] = useState(false)
    const [tricolon, settricolon] = useState(false)

    useEffect(() => {
        console.log("rur", rep)

        if (rep.upvotedBy && rep.upvotedBy.length > 0) {
            for (let i = 0; i < rep.upvotedBy.length; i++) {
                if (rep.upvotedBy[i].upvoterId == userId) {
                    setupvoted(true)
                }
            }
            setupvotes(rep.upvotedBy.length)
        }

        if (rep.downvotedBy && rep.downvotedBy.length > 0) {
            for (let i = 0; i < rep.downvotedBy.length; i++) {
                if (rep.downvotedBy[i].downvoterId == userId) {
                    setdownvoted(true)
                }
            }
            setdownvotes(rep.downvotedBy.length)
        }

    }, [rep])


    const gotoProfile = () => {
        navigate(`/${rep.username}`)
    }

    const [upvotes, setupvotes] = useState(0)
    const [downvotes, setdownvotes] = useState(0)
    const [prevResult, setprevResult] = useState()


    const clickUpvote = () => {
        if (downvoted) {
            setdownvoted(false)
            setdownvotes(downvotes - 1)
            console.log("rdr")

            remove_downvote_reply()
        }
        if (upvoted) {
            console.log("rur")

            setupvoted(false)
            setupvotes(upvotes - 1)
            remove_upvote_reply()

        } else {
            setupvoted(true)
            setupvotes(upvotes + 1)
            console.log("ur")

            upvoteReply()
        }


    }

    const clickDownvote = () => {
        if (upvoted) {
            setupvoted(false)
            setupvotes(upvotes - 1)
            remove_upvote_reply()
        }

        if (downvoted) {
            setdownvoted(false)
            setdownvotes(downvotes - 1)
            remove_downvote_reply()
        } else {
            setdownvoted(true)
            setdownvotes(downvotes + 1)
            downvoteReply()
        }
    }

    const editReplyOpts = () => {
        setreplyOpts(value => !value)
    }

    const hoveredOn = () => {
        settricolon(true)
    }

    const hoveredOff = () => {
        settricolon(false)
        setreplyOpts(false)
    }

    const delReplyFunc = () => {
        console.log(rep.replyObjId)
        setreplyOpts(false)
        delreply()
    }

    async function delreply() {

        console.log(rep, 'guzaarish', postId)
        try {

            const response = await fetch(`${host}/api/post/delreply`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ postId, commentId: item._id, replyId: rep._id })
            })
            const json = await response.json();
            console.log(json)
            fetchreplies()



        } catch (error) {
            console.log(error)

        }
    }



    async function upvoteReply() {

        console.log(postId)

        console.log(userId)
        try {

            const response = await fetch(`${host}/api/post/upvoteReply`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ postId, userId, commentId: item._id, replyId: rep._id })
            })
            const json = await response.json();
            console.log(json)

        } catch (error) {
            console.log(error)
        }

    }
    async function remove_upvote_reply() {

        console.log(postId)

        console.log(userId)
        try {

            const response = await fetch(`${host}/api/post/remove_upvote_reply`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ postId, userId, commentId: item._id, replyId: rep._id })
            })
            const json = await response.json();
            console.log(json)
            if (prevResult !== 'like') {
                setprevResult('like')
            }
        } catch (error) {
            console.log(error)
        }

    }


    async function downvoteReply() {



        try {

            const response = await fetch(`${host}/api/post/downvoteReply`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ postId, userId, commentId: item._id, replyId: rep._id })
            })
            const json = await response.json();
            console.log(json)
        } catch (error) {
            console.log(error)
        }
    }

    async function remove_downvote_reply() {



        try {

            const response = await fetch(`${host}/api/post/remove_downvote_reply`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ postId, userId, commentId: item._id, replyId: rep._id })
            })
            const json = await response.json();
            console.log(json)
        } catch (error) {
            console.log(error)
        }
    }



    return (
        <div style={{ marginBottom: "1rem", color: "white" }} onMouseOver={hoveredOn} onMouseLeave={hoveredOff} >
            <div style={{ display: 'flex', backgroundColor: 'inherit', alignItems: 'center', }}>
                <div style={{ display: 'flex', alignItems: 'center', width: '70%' }}>
                    <img alt="img" onClick={gotoProfile} src={rep.replier.profileImg} style={{ height: '2rem', width: '2rem', borderRadius: '50%', marginRight: '0.6rem', cursor: 'pointer' }} ></img>
                    <p onClick={gotoProfile} style={{ marginBottom: 0, fontWeight: 'bold', fontSize: '0.9rem', cursor: 'pointer', color: darkMode ? "white" : "black" }} className='cmntUsername' >{rep.replier.username}</p>
                </div>
                <div style={{ color: darkMode ? "white" : "black", width: '30%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.7rem', }}>
                        {DateTime.fromISO(rep.replier.replyDate).toRelative()}
                    </span>
                    <span style={{ padding: '0.2rem', cursor: 'pointer' }}>
                        {
                            tricolon ?
                                replyOpts ?
                                    <BsThreeDots size={20} onClick={editReplyOpts} /> : <BsThreeDotsVertical onClick={editReplyOpts}
                                    />
                                : ''
                        }
                    </span>
                    {replyOpts ?
                        <>



                            <Modal
                                show={replyOpts}
                                onHide={() => {
                                    setreplyOpts(false)
                                }
                                }
                                // size="lg"
                                aria-labelledby="contained-modal-title-vcenter"
                                centered
                            // style={{margin:"0 1rem"}}
                            >
                                <div style={{ backgroundColor: 'black', border: "", color: darkMode ? "white" : "black", }}
                                    className='delScoreopts' >
                                    {
                                        rep.replierId === userId ?
                                            <button onClick={delReplyFunc} style={{ display: 'flex', alignItems: 'center', padding: "8px 16px", justifyContent: "center", border: "none", color: "white", backgroundColor: "red" }}>
                                                <span style={{}} >Delete</span>
                                                <span style={{ marginLeft: "0.5rem" }}> <MdDelete

                                                    size={18} /> </span>
                                            </button>
                                            : ""
                                    }



                                </div>
                            </Modal>
                        </>
                        : ""
                    }
                </div>
            </div>
            <p style={{ color: darkMode ? "white" : "black", marginLeft: '2.5rem', marginRight: '1rem', fontSize: '0.8rem', marginBottom: '0.4rem' }} >{rep.reply}
            </p>
            <div style={{ marginLeft: '3rem' }} >


                <span style={{ marginRight: '3rem', cursor: "pointer" }} onClick={clickUpvote}  >
                    <span>
                        <BiUpvote size={16} color={upvoted ? 'orange' : darkMode ? "white" : "black"} />
                    </span>
                    <span style={{ fontSize: "0.8rem", color: 'gray', marginLeft: "0.2rem" }} >
                        {upvotes}
                    </span>
                </span>
                <span style={{ marginRight: '6rem', cursor: "pointer" }} onClick={clickDownvote} >
                    <span>
                        <BiDownvote size={16} color={downvoted ? 'orange' : darkMode ? "white" : "black"} />
                    </span>

                    <span style={{ fontSize: "0.8rem", color: 'gray', marginLeft: "0.2rem" }} >
                        {downvotes}
                    </span>
                </span>

            </div>
        </div>
    )
}