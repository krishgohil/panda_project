import React, { useEffect, useState } from 'react'
import { Form, Modal } from 'react-bootstrap';
import { BsThreeDots, BsThreeDotsVertical } from 'react-icons/bs';
import { FaRegEye, FaRegEyeSlash, FaRegStar, FaSearchLocation, FaStar } from 'react-icons/fa'
import { FcCancel } from "react-icons/fc";
import { useDispatch } from 'react-redux';
import { host } from '../host';
import { MdDelete } from 'react-icons/md';

const Ratings = ({ darkMode, profileImg, searchedProfile, _id, username }) => {
  const stars = Array(5).fill(0)
  const [starRating, setstarRating] = useState(0);
  const [hoverValue, setHoverValue] = useState(undefined);
  const [message, setmessage] = useState('')
  const [hasRated, sethasRated] = useState(false)
  const [prevRating, setprevRating] = useState(0)
  const [show, setshow] = useState(false)
  const [result, setresult] = useState([]);
  const [average, setaverage] = useState(0)

  const dispatch = useDispatch()

  useEffect(() => {
    console.log(searchedProfile)
    // setresult(searchedProfile.ratings)
    // if (searchedProfile.ratings.length > 0) {

    //     for (let i = 0; i < searchedProfile.ratings.length; i++) {

    //         if (searchedProfile.ratings[i].raterId == _id) {
    //             sethasRated(true)

    //             setprevRating(searchedProfile.ratings[i].rating)
    //             setstarRating(searchedProfile.ratings[i].rating)
    //             break
    //         }

    //     }

    // }
    // setshow(true)
    dispatch(socialscorerdetails())
  }, [searchedProfile])


  const socialscorerdetails = () => async dispatch => {
    console.log('inside social rating 2')
    const response = await fetch(`${host}/api/ratings/socialscorerdetails`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ visitedProfId: searchedProfile._id, userId: _id }),
    });
    const json = await response.json();
    console.log(json)
    // console.log(json.final.length)
    setshow(true)
    setresult(json.ratings)

    var has_rated = false
    var prev_rating = 0
    for (let i = 0; i < json.ratings.length; i++) {
      if (json.ratings[i].raterId == _id) {
        has_rated = true
        prev_rating = json.ratings[i].rating


      }
    }
    if (has_rated == true) {
      sethasRated(true)
      setprevRating(prev_rating)
      setstarRating(prev_rating)
    }
    let avg = json.totalRating / json.totalRatingsLength

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
    // console.log("ksjdfkjklfjlsk")
  }



  const postSS = () => {
    setstarRating(0)
    setmessage('')
    console.log(message)
    console.log(starRating)

    var scoreDifference
    if (hasRated && prevRating > 0) {
      scoreDifference = starRating - prevRating
      // console.log(notificationSettings, "ajajajaj", notificationToken)
      dispatch(postsocialscore(scoreDifference))
    } else {
      scoreDifference = starRating
      dispatch(postsocialscore(scoreDifference))
    }
  }


  const postsocialscore = (scoreDifference) => async dispatch => {
    console.log('users chala')
    const response = await fetch(`${host}/api/ratings/postsocialscore`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        raterComment: message, userId: _id, rating: starRating, visitedProfId: searchedProfile._id, hasRated: hasRated, scoreDifference: scoreDifference,
        // notificationToken: notificationToken, notificationSettings: notificationSettings,
        username: username
      }),
    });
    const json = await response.json();
    console.log(json)
    dispatch(socialscorerdetails())
  }

  return (
    <>
      <div
      // style={!darkMode ? { backgroundColor: 'whitesmoke' } : { backgroundColor: 'rgb(14, 15, 16)' }}
      >
        <div style={{ display: "flex", paddingTop: "0.5rem", marginLeft: "0.5rem", alignItems: 'center', }} >
          <img alt="img" src={profileImg} style={{
            height: '2.5rem',
            width: '2.5rem', borderRadius: '50%', marginRight: '0.6rem'
          }} ></img>
          <div style={{ margin: 0, display: 'flex', justifyContent: 'space-between', width: '80%' }}>
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
          <div style={{ display: 'flex', alignItems: "center", right: 0 }}  >
            <FcCancel size={24} />

            {/* {
        starRating !== 0 ?
          <FcCancel size={24} />
          : ''
      } */}
            {/* Cancel */}
          </div>
        </div>
        <div style={{ width: "100%", display: 'flex', alignItems: 'center', marginBottom: "2rem" }} >

          <Form.Control
            placeholder={`describe ${searchedProfile.username}`} value={message} maxRows={5} style={darkMode ?
              { outline: 'none', border: "none", borderBottom: '1px solid gray', bottom: 0, padding: '0.5rem', margin: '0.5rem', marginRight: 0, width: "80%", resize: 'none', backgroundColor: "transparent", color: "white", borderRadius: "0" } :
              { outline: 'none', border: "none", borderBottom: '1px solid gray', bottom: 0, padding: '0.5rem', margin: '0.5rem', marginRight: 0, width: "80%", resize: 'none', backgroundColor: "transparent", color: "black", borderRadius: "0" }}

            onChange={(e) => setmessage(e.target.value)}
            as="textarea"

          />

          <button disabled={message.replace(/\s/g, '').length > 0 && starRating !== 0 ? false : true} style={message.replace(/\s/g, '').length > 0 && starRating !== 0
            ?

            { border: '1px solid black', padding: '0.5rem 1rem 0.5rem 1rem', borderRadius: '0.5rem', backgroundColor: '#0095f6', color: 'white', fontWeight: 'bold', margin: '0 0.5rem 0 0.5rem' } :


            { border: '1px solid black', padding: '0.5rem 1rem 0.5rem 1rem', backgroundColor: '#403f3f', borderRadius: '0.5rem', color: 'white', margin: '0 0.5rem 0 0.5rem' }

          } onClick={postSS}  >Post</button>
        </div>
      </div>
      {
        show ?
          <>

            <div style={{ display: "flex", alignItems: "center", marginBottom: "1rem", paddingLeft: "0.5rem" }} >
              <h6 style={{ marginBottom: "0" }} >All Ratings</h6>
              <h6 style={{ marginBottom: "0", marginLeft: "16px" }}>{average == 0 ? 5 : average}</h6>
              <FaStar color='inherit' ></FaStar>
            </div>

            <div style={{ minHeight: "50px", paddingLeft: "0.5rem" }} >
              {
                result.map((item, i) => {
                  return (
                    <RatingItem darkMode={darkMode} searchedProfile={searchedProfile} item={item} key={i} profileImg={profileImg} _id={_id} prevRating={prevRating} ></RatingItem>
                  )
                })
              }
            </div>

          </>
          : ""
      }

    </>
  )
}

export default Ratings


const RatingItem = ({ profileImg, item, _id, searchedProfile, darkMode, prevRating }) => {

  const dispatch = useDispatch()
  const [options, setoptions] = useState(false)
  const [tempHidden, settempHidden] = useState(false)

  useEffect(() => {
    if (item.rater._id != _id) {
      settempHidden(item.isHidden)
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

    dispatch(hideScore())
  }

  const showScoreFunc = (e) => {
    settempHidden(false)
    setoptions(false)
    dispatch(showScore())
  }

  const hideScore = () => async dispatch => {
    console.log('post chala')
    const response = await fetch(`${host}/api/ratings/hideScore`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId: _id, visitedProfId: searchedProfile._id, commentId: item._id }),
    });
    const json = await response.json();
    console.log(json)
    if (json.modifiedCount > 0) {
      settempHidden(true)
    }
  }

  const showScore = (score) => async dispatch => {
    console.log(score)
    console.log('post chala')
    const response = await fetch(`${host}/api/ratings/showScore`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId: _id, visitedProfId: searchedProfile._id, commentId: item._id }),
    });
    const json = await response.json();
    console.log(json)
    if (json.modifiedCount > 0) {
      settempHidden(false)
    }
  }

  const delScore = () => {
    if (window.confirm("Do you want to delete this score?") == true) {

      let score = prevRating
      console.log(score)

      dispatch(delscore(score))
    }
  }
  const delscore = (score) => async dispatch => {
    console.log(score)
    console.log('post chala')
    const response = await fetch(`${host}/api/ratings/delScore`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId: _id, visitedProfId: searchedProfile._id, score: score }),
    });
    const json = await response.json();
    console.log(json)

    // fetchscores()

  }
  return (
    <div style={(searchedProfile._id === _id && tempHidden) || (!tempHidden) ? { display: "block" } : { display: "none" }} >

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

                <span style={{ fontSize: '0.8rem' }} ></span>
                <FaStar color='inherit' ></FaStar>

              </p>
              {
                item.raterId === _id || searchedProfile._id === _id ?
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
                  <div style={darkMode ? { backgroundColor: 'black', border: "1px solid gray", color: "white", } : { backgroundColor: 'white', border: "1px solid white", }}
                    className='delScoreopts' >
                    {
                      item.raterId === _id ?
                        <p onClick={delScore} style={{ marginBottom: "0.5rem", display: 'flex', alignItems: 'center', padding: "0.2rem", justifyContent: "center" }}>
                          <span style={{}} >Delete</span>
                          <span style={{ marginLeft: "0.5rem" }}> <MdDelete

                            size={18} /> </span>
                        </p>
                        : ""
                    }

                    {
                      searchedProfile._id === _id && (tempHidden == false) ?
                        <p
                          onClick={hideScoreFunc}
                          style={{ marginBottom: "0.5rem", display: 'flex', alignItems: 'center', padding: "0.2rem", justifyContent: "center" }}>
                          <span style={{}} >Hide</span>
                          <span style={{ marginLeft: "0.5rem" }}> <FaRegEyeSlash size={16} /> </span>
                        </p>

                        : ""
                    }

                    {
                      searchedProfile._id === _id && (tempHidden == true) ?
                        <p
                          onClick={showScoreFunc}
                          style={{ marginBottom: "0.5rem", display: 'flex', alignItems: 'center', padding: "0.2rem", justifyContent: "center" }}>
                          <span style={{}} >Show</span>
                          <span style={{ marginLeft: "0.5rem" }}> <FaRegEye size={16} /> </span>
                        </p>

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


          </div>

        </div >
      </div>
    </div>
  )
}