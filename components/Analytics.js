import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { AiOutlineStock } from 'react-icons/ai'
import { MdAdsClick, MdArrowBack, MdOutlineRemoveRedEye } from 'react-icons/md'
import { useSelector } from 'react-redux'

const Analytics = ({ }) => {
  const { profileVisits, uniqueProfileVisits, links, _id, referrers, totalLinkClicks, darkModeProfile } = useSelector(state => state.auth)
  const [darkMode, setdarkMode] = useState(false)


  const router = useRouter()

  useEffect(() => {

    if (darkModeProfile) {
      setdarkMode(true)
    }
    else {
      setdarkMode(false)
    }

  }, [darkModeProfile])

  return (
    <div style={
      darkMode ?
        { width: "100vw", height: "100vh", overflowY: "scroll", scrollMargin: 0, overflowX: "hidden", display: "flex", alignItems: "center", flexDirection: "column", color: "inherit" } : { width: "100vw", height: "100vh", overflowY: "scroll", scrollMargin: 0, overflowX: "hidden", display: "flex", alignItems: "center", flexDirection: "column", color: "inherit" }
    } >

      <div onClick={()=>{router.back()}} style={{ width: "90%" }} >
        <MdArrowBack  color={darkMode ? "white" : "black"}  size={28} />
      </div>
      <div
        className='widthCommon'
        // className='linkCard'
        style={
          darkMode ?
            { border:"1px solid gray",margin: "0.5rem 1rem", borderRadius: "0.5rem", backgroundColor: "#1b1a1a", color: "white" } :
            {
              border:"1px solid gray",margin: "0.5rem 1rem", borderRadius: "0.5rem",
              backgroundColor: "whitesmoke", color: "black"
            }
        } >
        <h1 style={darkMode ?
          { textAlign: "center", marginTop: "0.5rem", color: "Whitesmoke", fontFamily: "sans-serif" } : { textAlign: "center", marginTop: "0.5rem", color: "#2b2b2b", fontFamily: "sans-serif" }} >Overall Analytics
          <AiOutlineStock color='' style={{ marginLeft: "0.5rem" }} />

        </h1>

        <Row style={{ display: "flex", justifyContent: "center" }} >
          <Col xs={3} style={{ textAlign: "center", display: "flex", justifyContent: "center", margin: "0.5rem", }}  >
            <div className={darkMode ? "linkCard_dm" : "linkCard"} style={{ display: "flex", padding: "1rem", flexDirection: "column", alignItems: "center", borderRadius: "0.5rem", border: "2px solid red", }}>
              <h6>
                Views
                <MdOutlineRemoveRedEye />

              </h6>
              <h5>
                {profileVisits}
              </h5>

            </div>
          </Col>
          <Col xs={3} style={{ textAlign: "center", display: "flex", justifyContent: "center", margin: "0.5rem", }} >
            <div className={darkMode ? "linkCard_dm" : "linkCard"} style={{ display: "flex", padding: "1rem", flexDirection: "column", alignItems: "center", borderRadius: "0.5rem", border: "2px solid cyan", }}>
              <h6>
                Clicks
                <MdAdsClick />
              </h6>
              <h5>
                {totalLinkClicks}
              </h5>

            </div></Col>
          <Col xs={3} style={{ textAlign: "center", display: "flex", justifyContent: "center", margin: "0.5rem", }} >
            <div className={darkMode ? "linkCard_dm" : "linkCard"} style={{ display: "flex", padding: "1rem", flexDirection: "column", alignItems: "center", borderRadius: "0.5rem", border: "2px solid lightgreen", }}>
              <h6>
                Unique
                <MdOutlineRemoveRedEye />


              </h6>
              <h5>
                {uniqueProfileVisits}
              </h5>

            </div></Col>
          <Col xs={3} style={{ textAlign: "center", display: "flex", justifyContent: "center", margin: "0.5rem", }} >
            <div className={darkMode ? "linkCard_dm" : "linkCard"} style={{ display: "flex", padding: "1rem", flexDirection: "column", alignItems: "center", borderRadius: "0.5rem", border: "2px solid hotpink", }}>
              <h6>
                CTR %

              </h6>
              <h5>
                {(profileVisits / totalLinkClicks).toFixed(2)}
              </h5>

            </div></Col>
          <Col xs={3} style={{ textAlign: "center", display: "flex", justifyContent: "center", margin: "0.5rem", }} >
            <div className={darkMode ? "linkCard_dm" : "linkCard"} style={{ display: "flex", padding: "1rem", flexDirection: "column", alignItems: "center", borderRadius: "0.5rem", border: "2px solid orange", }}>
              <h6>
                Views

              </h6>
              <h5>
                9810
              </h5>

            </div></Col>
        </Row>
      </div>

      <div className='widthCommon' style={darkMode ? { border:"1px solid gray",borderRadius: "0.5rem", marginTop: "2rem", display: "flex", justifyContent: "center", backgroundColor: "#1b1a1a", flexDirection: "column", alignItems: "center" } : { border:"1px solid gray",borderRadius: "0.5rem", marginTop: "2rem", display: "flex", justifyContent: "center", backgroundColor: "whitesmoke", flexDirection: "column", alignItems: "center" }} >
        <h3 style={darkMode ? { color: "whitesmoke", margin: "1rem 0", width: "100%", borderBottom: "1px solid #2b2b2b", textAlign: "center", paddingBottom: "0.5rem" } : { color: "#2b2b2b", margin: "1rem 0", width: "100%", borderBottom: "1px solid #2b2b2b", textAlign: "center", paddingBottom: "0.5rem" }} >Link Statistics</h3>
        <div style={{ display: "flex", alignItems: "center", width: "100%", justifyContent: "center" }} >
          <h5 style={darkMode ? { textAlign: "center", flex: "0.7", color: 'whitesmoke', } : { textAlign: "center", flex: "0.7", color: '#2b2b2b', }} >Link</h5>
          <h5 style={darkMode ? { textAlign: "center", flex: "0.3", color: 'whitesmoke', textAlign: "center" } : { textAlign: "center", flex: "0.3", color: '#2b2b2b', textAlign: "center" }} >Clicks</h5>
        </div>

        {
          links.map((link,i) => {
            return (
              <div key={i} style={darkMode ?
                {
                  display: "flex", alignItems: "center", width: "100%", margin: "0.25rem 0", borderRadius: "1rem", padding: "0.5rem 0"
                } : {
                  display: "flex", alignItems: "center", width: "100%", backgroundColor: "whitesmoke", color: "black", margin: "0.25rem 0 ", padding: "0.5rem 0"
                }} >
                <h6 style={darkMode ? { textAlign: "center", flex: "0.7", color: 'white', marginBottom: "0", } : { textAlign: "center", flex: "0.7", color: 'black', marginBottom: "0", }} >{link.title}</h6>
                <h6 style={darkMode ? { textAlign: "center", flex: "0.3", color: 'white', marginBottom: "0", textAlign: "center", } : { textAlign: "center", flex: "0.3", color: 'black', marginBottom: "0", textAlign: "center", }} >{link.clicks}</h6>
              </div>
            )
          })
        }

      </div>



      <div className='widthCommon' style={darkMode ?
        { border:"1px solid gray",borderRadius: "0.5rem", marginTop: "2rem", marginBottom: "2rem", display: "flex", justifyContent: "center", backgroundColor: "#1b1a1a", flexDirection: "column", alignItems: "center" } : { border:"1px solid gray",borderRadius: "0.5rem", marginTop: "2rem", marginBottom: "2rem", display: "flex", justifyContent: "center", backgroundColor: "whitesmoke", flexDirection: "column", alignItems: "center" }} >

        <h3 style={darkMode ? { color: "whitesmoke", margin: "1rem 0", width: "100%", borderBottom: "1px solid #2b2b2b", textAlign: "center", paddingBottom: "0.5rem" } : { color: "#2b2b2b", margin: "1rem 0", width: "100%", borderBottom: "1px solid #2b2b2b", textAlign: "center", paddingBottom: "0.5rem" }} >Referring Platforms</h3>
        <div style={{ display: "flex", alignItems: "center", width: "100%", justifyContent: "center" }} >
          <h5 style={darkMode ? { textAlign: "center", flex: "0.7", color: 'whitesmoke', } : { textAlign: "center", flex: "0.7", color: 'black', }} >Link</h5>
          <h5 style={darkMode ? { textAlign: "center", flex: "0.3", color: 'whitesmoke', textAlign: "center" } : { textAlign: "center", flex: "0.3", color: 'black', }} >Clicks</h5>
        </div>

        {
          referrers.map((ref,i) => {
            return (
              <div key={i} style={darkMode ? {
                display: "flex", alignItems: "center", width: "100%", backgroundColor: "", margin: "0.25rem", borderRadius: "1rem", padding: "0.5rem"
              } : {
                display: "flex", alignItems: "center", width: "100%", backgroundColor: "whitesmoke", margin: "0.25rem", borderRadius: "1rem", padding: "0.5rem"
              }} >
                <h6 style={darkMode ? { textAlign: "center", flex: "0.7", color: 'white', marginBottom: "0", } : { textAlign: "center", flex: "0.7", color: 'black', marginBottom: "0", }} >{ref.domain}</h6>
                <h6 style={darkMode ? { textAlign: "center", flex: "0.3", color: 'white', marginBottom: "0", textAlign: "center", } : { textAlign: "center", flex: "0.3", color: 'black', marginBottom: "0", textAlign: "center", }} >{ref.visitsCount}</h6>
              </div>
            )
          })
        }

      </div>


    </div >
  )
}

export default Analytics