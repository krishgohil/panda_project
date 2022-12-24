import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import styles from '../../styles/Home.module.css'
import { useSelector } from 'react-redux'
import { FaStar } from 'react-icons/fa'

const index = () => {
  const { displayDarkMode } = useSelector(state => state.feed)

  const [darkMode, setdarkMode] = useState(false)

  const router = useRouter()
  useEffect(() => {
      setdarkMode(displayDarkMode)
  }, [displayDarkMode])
 
  return (
    
    <>
      <Row className={styles.cardMainRow} style={{ margin: '0', display: "flex" }}  >


        
         
              <Col
               
                className={styles.row}
                lg={4} md={4} xs={6}style={{ margin: "0.5rem 0", padding: "0.5rem", borderRadius: "1rem", }}   >
                <Link scroll={false} href={`/`} style={{ textDecoration: "none", color: 'inherit', height: "100%", width: "100%" }} >
                  <div className={darkMode ? styles.linkCard_dm : styles.linkCard} style={{ height: "100%", width: "100%" }}  >
                    <div className={styles.imgupdiv} style={darkMode ? { display: "flex", justifyContent: "center", borderRadius: " 0", backgroundColor: "rgb(70,70,70)" } : { display: "flex", justifyContent: "center", borderRadius: " 0", backgroundColor: "rgb(214,214,214)" }} >
                      <img className={styles.img} src="/icon-512x512.png" alt="" />
                    </div>


                    <div style={{ padding: "0.5rem" }} >

                      <div style={{ display: "flex" }} >
                        <p style={{ textAlign: "center", width: "100%", fontSize: "14px", marginBottom: "0.5rem" }} ><b>Kantara</b></p>
                        {/* <h6>Entrepreneur</h6> */}
                      </div>
                      {/* <p className={styles.ppp} style={{ fontSize: "13px", fontFamily: "sans-serif", marginBottom: "0.5rem", whiteSpace: 'pre-wrap', wordBreak: "break-word" }} >
                        {peep.about}
                      </p> */}

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
              <Col
               
                className={styles.row}
                lg={4} md={4} xs={6}style={{ margin: "0.5rem 0", padding: "0.5rem", borderRadius: "1rem", }}   >
                <Link scroll={false} href={`/`} style={{ textDecoration: "none", color: 'inherit', height: "100%", width: "100%" }} >
                  <div className={darkMode ? styles.linkCard_dm : styles.linkCard} style={{ height: "100%", width: "100%" }}  >
                    <div className={styles.imgupdiv} style={darkMode ? { display: "flex", justifyContent: "center", borderRadius: " 0", backgroundColor: "rgb(70,70,70)" } : { display: "flex", justifyContent: "center", borderRadius: " 0", backgroundColor: "rgb(214,214,214)" }} >
                      <img className={styles.img} src="/icon-512x512.png" alt="" />
                    </div>


                    <div style={{ padding: "0.5rem" }} >

                      <div style={{ display: "flex" }} >
                        <p style={{ textAlign: "center", width: "100%", fontSize: "14px", marginBottom: "0.5rem" }} ><b>Kantara</b></p>
                        {/* <h6>Entrepreneur</h6> */}
                      </div>
                      {/* <p className={styles.ppp} style={{ fontSize: "13px", fontFamily: "sans-serif", marginBottom: "0.5rem", whiteSpace: 'pre-wrap', wordBreak: "break-word" }} >
                        {peep.about}
                      </p> */}

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
              <Col
               
                className={styles.row}
                lg={4} md={4} xs={6}style={{ margin: "0.5rem 0", padding: "0.5rem", borderRadius: "1rem", }}   >
                <Link scroll={false} href={`/`} style={{ textDecoration: "none", color: 'inherit', height: "100%", width: "100%" }} >
                  <div className={darkMode ? styles.linkCard_dm : styles.linkCard} style={{ height: "100%", width: "100%" }}  >
                    <div className={styles.imgupdiv} style={darkMode ? { display: "flex", justifyContent: "center", borderRadius: " 0", backgroundColor: "rgb(70,70,70)" } : { display: "flex", justifyContent: "center", borderRadius: " 0", backgroundColor: "rgb(214,214,214)" }} >
                      <img className={styles.img} src="/icon-512x512.png" alt="" />
                    </div>


                    <div style={{ padding: "0.5rem" }} >

                      <div style={{ display: "flex" }} >
                        <p style={{ textAlign: "center", width: "100%", fontSize: "14px", marginBottom: "0.5rem" }} ><b>Kantara</b></p>
                        {/* <h6>Entrepreneur</h6> */}
                      </div>
                      {/* <p className={styles.ppp} style={{ fontSize: "13px", fontFamily: "sans-serif", marginBottom: "0.5rem", whiteSpace: 'pre-wrap', wordBreak: "break-word" }} >
                        {peep.about}
                      </p> */}

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
              <Col
               
                className={styles.row}
                lg={4} md={4} xs={6}style={{ margin: "0.5rem 0", padding: "0.5rem", borderRadius: "1rem", }}   >
                <Link scroll={false} href={`/`} style={{ textDecoration: "none", color: 'inherit', height: "100%", width: "100%" }} >
                  <div className={darkMode ? styles.linkCard_dm : styles.linkCard} style={{ height: "100%", width: "100%" }}  >
                    <div className={styles.imgupdiv} style={darkMode ? { display: "flex", justifyContent: "center", borderRadius: " 0", backgroundColor: "rgb(70,70,70)" } : { display: "flex", justifyContent: "center", borderRadius: " 0", backgroundColor: "rgb(214,214,214)" }} >
                      <img className={styles.img} src="/icon-512x512.png" alt="" />
                    </div>


                    <div style={{ padding: "0.5rem" }} >

                      <div style={{ display: "flex" }} >
                        <p style={{ textAlign: "center", width: "100%", fontSize: "14px", marginBottom: "0.5rem" }} ><b>Kantara</b></p>
                        {/* <h6>Entrepreneur</h6> */}
                      </div>
                      {/* <p className={styles.ppp} style={{ fontSize: "13px", fontFamily: "sans-serif", marginBottom: "0.5rem", whiteSpace: 'pre-wrap', wordBreak: "break-word" }} >
                        {peep.about}
                      </p> */}

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






      </Row>
    </>
  )
}

export default index