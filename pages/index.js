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

export default function Home(props) {

  const [people, setpeople] = useState([])
  const dispatch = useDispatch()
  // const navigate = useNavigate()
  const { username, name, _id, profileImg, about, guest, links } = useSelector(state => state.auth)
  const { displayDarkMode, feed_Data } = useSelector(state => state.feed)
  const [cnt, setcnt] = useState(0)

  const [input, setinput] = useState('')
  const [darkMode, setdarkMode] = useState(false)
  const [nomore, setnomore] = useState(false)

  const [tempArr, settempArr] = useState(props.users)
  useEffect(() => {


    console.log(process.env.VERCEL_URL, "URL")


  }, [])

  useEffect(() => {

    dispatch({
      type: FEED_DATA_STORE,
      payload: {
        feed_Data: props.users
      }
    })
  }, [])

  useEffect(() => {


    // console.log(displayDarkMode, "ok", darkMode)
    setdarkMode(displayDarkMode)
  }, [displayDarkMode])





  useEffect(() => {

    document.getElementById("cardSsr_Row").style.display = "none"
  }, [])





  const fetchpeople = () => async dispatch => {
    console.log("fkksdllsdkflsf", feed_Data.length)
    const response = await fetch(`${host}/api/fetchpeople`, {
      // const response = await fetch('https://keepitupp.herokuapp.com/api/auth/fetchuniqueser', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ skip: feed_Data.length }),
    });
    const json = await response.json();
    console.log(json.users)
    if (json.users.length == 0) {
      setnomore(true)
    }
    setpeople(json.users)

    dispatch({
      type: FEED_DATA_STORE,
      payload: {
        feed_Data: json.users
      }
    })


  }

  const gotoprofile = () => {
    navigate(`/${username}`)
  }

  const handleSubmit = e => {

    e.preventDefault()
    // let x = input.replace(/\s\s+/g, ' ')
    console.log(input)
    navigate(`/search/${input}`)

  }

  const fetchNew = () => {
    dispatch(fetchpeople())
  }




  return (
    <>

      <Header />

      <Container onClick={() => {
        console.log(feed_Data)
      }} fluid className={darkMode ? styles.app__main_dm : styles.app__main}>
        <Row id='cardSsr_Row' className={styles.cardMainRow} style={typeof window !== 'undefined' ? { margin: 0, display: "none" } : { margin: 0, display: 'flex' }}  >


          <InfiniteScroll

            id='myHeader'
            dataLength={feed_Data.length}
            next={fetchNew}
            hasMore={true}
            className={styles.row}

            loader={

              !nomore ?
                <div style={{ textAlign: "center", width: "100%", padding: 0, display: "flex", justifyContent: "center", height: "50px" }} >
                  <Spinner animation="border" color='orange' style={{ color: "orange" }} />
                </div> : ""
            }
            style={{ padding: 0, margin: 0, display: "flex", justifyContent: "center", }}
          >

            {
              tempArr.map((peep, i) =>
                <Col
                  onClick={() => {
                    Router.push(`/${peep.username}`)
                  }}
                  className={darkMode ? styles.linkCard_dm : styles.linkCard} lg={3} md={3} xs={5} key={i} style={{ margin: "0", padding: "0", borderRadius: "1rem", }}   >
                  <Link href={`/${peep.username}`} style={{ textDecoration: "none", color: 'inherit' }} >
                    <div className={styles.contain}>
                      <div className={styles.imgupdiv} style={{ display: "flex", justifyContent: "center", borderRadius: "1rem 1rem 0 0", }} >
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



          </InfiniteScroll>


        </Row>

        <Row className={styles.cardMainRow} style={{ margin: '0', display: "flex" }}  >


          <InfiniteScroll

            id='myHeader'
            dataLength={feed_Data.length}
            next={fetchNew}
            hasMore={true}
            className={styles.row}

            loader={

              !nomore ?
                <div style={{ textAlign: "center", width: "100%", padding: 0, display: "flex", justifyContent: "center", height: "50px" }} >
                  <Spinner animation="border" color='orange' style={{ color: "orange" }} />
                </div> : ""
            }
            style={{ padding: 0, margin: 0, display: "flex", justifyContent: "center", }}
          >

            {
              feed_Data.map((peep, i) =>
                <Col
                  onClick={() => {
                    Router.push(`/${peep.username}`)
                  }}
                  className={styles.row}
                  lg={4} md={4} xs={6} key={i} style={{ margin: "0.5rem 0", padding: "0.5rem", borderRadius: "1rem", }}   >
                  <Link scroll={false} href={`/${peep.username}`} style={{ textDecoration: "none", color: 'inherit', height: "100%", width: "100%" }} >
                    <div className={darkMode ? styles.linkCard_dm : styles.linkCard} style={{ height: "100%", width: "100%" }}  >
                      <div className={styles.imgupdiv} style={{ display: "flex", justifyContent: "center", borderRadius: " 0", }} >
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



          </InfiniteScroll>


        </Row>
      </Container>
    </>
  )
}




export async function getStaticProps(context) {

  const response = await fetch(`${host}/api/fetchpeople`, {
    // const response = await fetch('https://keepitupp.herokuapp.com/api/auth/fetchuniqueser', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ skip: 0 }),
  });
  const json = await response.json();
  // console.log(json)
  console.log("json cards")

  return {
    props: json, // will be passed to the page component as props
  }
}


