import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { Col, Container, Modal, Row, Spinner } from 'react-bootstrap'
import styles from '../../styles/Home.module.css'
import { useSelector } from 'react-redux'
import { FaStar } from 'react-icons/fa'
import { useAppContext, useFeedContext } from '../../context'
import Post from '../../components/Post'
import { host } from '../../host'
import InfiniteScroll from 'react-infinite-scroll-component'
import PostsLayout from '../../components/PostsLayout'

const Shows = () => {
  const router = useRouter()
  const { country } = router.query
  const context = useAppContext()
  const context_feed = useFeedContext()
  const [addItem, setaddItem] = useState(false)

  const { _id, username, profileImg } = context.sharedState
  const { displayDarkMode } = context_feed.feedstate
  const [darkMode, setdarkMode] = useState(false)
  const [items, setitems] = useState([])


  useEffect(() => {
    setdarkMode(displayDarkMode)
  }, [displayDarkMode])


  useEffect(() => {
    fetchitems()
  }, [])


  async function fetchitems() {

    const response = await fetch(`${host}/api/post/fetchitems`, {
      // const response = await fetch('https://keepitupp.herokuapp.com/api/auth/fetchuniqueser', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ skip: 0, category: "shows" }),
    });
    const json = await response.json();
    console.log(json)
    console.log("json")
    setitems(json.items)
  }

  const fetchNew = () => {
    console.log("fetchNew")
  }
  return (

    <>
      <PostsLayout length={items.length} fetchNew={fetchNew} >

        {
          items.map((show) => {
            return (
              <>
                <Col

                  className={styles.row}
                  lg={3} md={4} xs={6} style={{ margin: "0.5rem 0", padding: "0.5rem", borderRadius: "1rem", }}   >
                  <Link scroll={false} href={`/shows/${show._id}`} style={{ textDecoration: "none", color: 'inherit', height: "100%", width: "100%" }} >
                    <div className={darkMode ? styles.linkCard_dm : styles.linkCard} style={{ height: "100%", width: "100%" }}  >
                      <div className={styles.imgupdiv} style={darkMode ? { display: "flex", justifyContent: "center", borderRadius: " 0", backgroundColor: "rgb(70,70,70)" } : { display: "flex", justifyContent: "center", borderRadius: " 0", backgroundColor: "rgb(214,214,214)" }} >
                        <img className={styles.img} src={show.postimg[0]} alt="" style={{ borderRadius: 0,width:"100%" }} />
                      </div>


                      <div style={{ padding: "0.5rem" }} >

                        <div style={{ display: "flex" }} >
                          <p style={{ textAlign: "center", width: "100%", fontSize: "14px", marginBottom: "0.5rem" }} ><b>{show.title}</b></p>
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
          })
        }

      </PostsLayout>



    </>
  )
}

export default Shows