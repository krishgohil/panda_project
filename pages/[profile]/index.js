import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Button, Col, Container, Row, Navbar, Modal, FloatingLabel, Spinner, CloseButton } from 'react-bootstrap'

import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { FaImage, FaMoon, FaRegEdit, FaSun, FaWhatsapp, } from 'react-icons/fa'
import { FcCancel } from 'react-icons/fc'

import { toast, ToastContainer } from 'react-toastify'

import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd"
import { BsStars } from "react-icons/bs"
import { RiHome2Line, RiNumbersFill } from "react-icons/ri"
import { host } from '../../host';
import Analytics from '../../components/Analytics';
import { MdContentCopy, MdDelete, MdSettings } from 'react-icons/md';
import { AiOutlineShareAlt } from 'react-icons/ai';
import QrCode from '../../components/QrCode';
import Ratings from '../../components/Ratings';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useAppContext, useFeedContext } from '../../context';
import Head from 'next/head';
const Profile = (props) => {
  const router = useRouter();

  const context = useAppContext()
  const context_feed = useFeedContext()

  const { username, name, _id, profileImg, about, guest, links } = context.sharedState
  const { displayDarkMode, feed_Data } = context_feed.feedstate

  const [searchedProfile, setsearchedProfile] = useState(props.fetchuniqueser)
  const [tempLinks, settempLinks] = useState(props.fetchuniqueser.links)
  const [originalLinks, setoriginalLinks] = useState(props.fetchuniqueser.links)
  const [tempprofession, settempprofession] = useState(props.fetchuniqueser.profession)


  const [showProfile, setshowProfile] = useState(false)
  const [modalShow, setModalShow] = useState(false)


  const [tempUserInfo, settempUserInfo] = useState({ username: "", name: "", profileImg: "", about: "", darkMode: "" })


  const [tempLinkInfo, settempLinkInfo] = useState({ url: "", title: "", image: "", fullWidth: false, date: "" })
  const [checked, setchecked] = useState(false)
  const [stateCount, setstateCount] = useState(0)
  const [editing, setediting] = useState(false)

  const [profBg, setprofBg] = useState()

  const ref = useRef()
  const profileImgRef = useRef()
  const bgImg = useRef()
  const [darkMode, setdarkMode] = useState(false)
  const [editLinkModal, seteditLinkModal] = useState(false)
  const [editLink, seteditLink] = useState()
  const [cnt, setcnt] = useState(0)

  const [domain, setdomain] = useState('')
  const getHostname = (url) => {
    return new URL(url).hostname;
  }




  useEffect(() => {

  }, [])




  useEffect(() => {


    setcnt(cnt + 1)


    setshowProfile(true)
    settempUserInfo({ ...tempUserInfo, username: props.fetchuniqueser.username, about: props.fetchuniqueser.about, name: props.fetchuniqueser.name, profileImg: props.fetchuniqueser.profileImg, darkMode: props.fetchuniqueser.darkModeProfile, profBg: props.fetchuniqueser.backgroundImage, profession: props.fetchuniqueser.profession })
    if (props.fetchuniqueser.darkModeProfile) {
      document.getElementsByTagName("body")[0].style.backgroundColor = "black"
      setdarkMode(true)
    } else {
      document.getElementsByTagName("body")[0].style.backgroundColor = "white"
      setdarkMode(false)
    }
  }, [])


  useEffect(() => {
    var g = document.referrer
    console.log(g)

    if (document.referrer.length > 0) {
      console.log(getHostname(g));
      setdomain(getHostname(g))
    }


    console.log(router.query)



  }, [_id,])


  useEffect(() => {

    // alert("ksdk")
  }, [stateCount, tempLinks, originalLinks,])





  // useEffect(() => {


  //   console.log(router.query.profile)
  //   dispatch(fetchUniqueUser())



  // }, [router.query.profile])





  useEffect(() => {
    if (searchedProfile && typeof window !== 'undefined' && router.asPath !== `/${searchedProfile.username}/analytics` && !showProfile) {
      setshowProfile(true)
    }



  }, [])

  const fetchUniqueUser = () => async dispatch => {
    var ip = null
    console.log("paradiese")

    await fetch('https://api.ipify.org/').then(
      r => r.text()
    ).then(
      data => {
        ip = data
        console.log(ip)
      }
    ).catch(
      (err) => {
        console.log(err)

        return (
          ip = null
        )
      }
    )

    console.log("sfjlkajslkfjlskj")



    var g = document.referrer
    var dmn = ""
    console.log(g)
    console.log(router.query.profile)
    console.log(_id)

    if (document.referrer.length > 0) {
      console.log(getHostname(g));
      dmn = getHostname(g)
    }

    const response = await fetch(`${host}/api/fetchuniqueuser`, {
      // const response = await fetch('https://keepitupp.herokuapp.com/api/auth/fetchuniqueser', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ profile: router.query.profile, ip, _id, domain: dmn }),
    });
    const json = await response.json();
    console.log(json)

    setsearchedProfile(json.fetchuniqueser)
    settempUserInfo({ ...tempUserInfo, username: json.fetchuniqueser.username, about: json.fetchuniqueser.about, name: json.fetchuniqueser.name, profileImg: json.fetchuniqueser.profileImg, darkMode: json.fetchuniqueser.darkModeProfile, profBg: json.fetchuniqueser.backgroundImage, profession: json.fetchuniqueser.profession })
    settempLinks(json.fetchuniqueser.links)
    setoriginalLinks(json.fetchuniqueser.links)
    setshowProfile(true)
    settempprofession(json.fetchuniqueser.profession)
    if (json.fetchuniqueser.darkModeProfile) {
      document.getElementsByTagName("body")[0].style.backgroundColor = "black"
      setdarkMode(true)
    } else {
      document.getElementsByTagName("body")[0].style.backgroundColor = "white"
      setdarkMode(false)
    }

    if (typeof window !== 'undefined' && router.asPath !== `/${json.fetchuniqueser.username}`) {
      router.push(`/${json.fetchuniqueser.username}`)

    }

  }

  useEffect(() => {

    if (showProfile) {
      // console.log("herekrish", tempUserInfo.backgroundImage)

      document.getElementById("profile").style.background = `url(${tempUserInfo.profBg})`
      document.getElementById("profile").style.backgroundSize = 'cover'
      document.getElementById("profile").style.backgroundRepeat = 'no-repeat'
    }
  }, [tempUserInfo, showProfile])





  const onImgChange = (e) => {
    // console.log(e.target.files[0])
    setstateCount(stateCount + 1)
    settempLinkInfo({ ...tempLinkInfo, image: e.target.files[0] })
  }

  function onDragEnd(result) {
    console.log(
      "start"
    )
    if (!result.destination) return;

    const arr = [...tempLinks];
    console.log(arr)
    console.log(result.source.index)
    console.log(result.destination.index)

    //Changing the position of Array element
    let removedItem = arr.splice(result.source.index, 1)[0];
    console.log(removedItem)
    arr.splice(result.destination.index, 0, removedItem);
    console.log(arr)
    //Updating the list
    settempLinks(arr);

  }

  const grid = 8;


  const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    padding: 0,
    margin: `0.5rem`,
    borderRadius: "0.5rem ",

    // change background colour if dragging
    background: isDragging ? "lightgreen" : "",

    // styles we need to apply on draggables
    ...draggableStyle
  });


  async function save() {


    console.log(tempUserInfo)



    console.log("rkjaskjdfkalj", searchedProfile._id)
    const formData = new FormData();

    console.log(tempUserInfo)
    console.log(tempLinks)
    // console.log(typeof tempUserInfo.profileImg)
    if (typeof tempUserInfo.profileImg == 'object') {
      console.log(tempUserInfo.about)

      const data = new FormData()
      data.append("file", tempUserInfo.profileImg)
      data.append("upload_preset", "l0nuoz4a")


      const response = await fetch("https://api.cloudinary.com/v1_1/dmjoqk3ww/image/upload", {
        method: 'POST',
        body: data
      });
      const json = await response.json();
      console.log(json)
      formData.append("img", json.secure_url)
    }

    if (typeof profBg == 'object') {
      const data = new FormData()
      data.append("file", profBg)
      data.append("upload_preset", "l0nuoz4a")


      const response = await fetch("https://api.cloudinary.com/v1_1/dmjoqk3ww/image/upload", {
        method: 'POST',
        body: data
      });
      const json = await response.json();
      console.log(json)
      formData.append("profBg", json.secure_url)
    } else {
      formData.append('profBg', profBg);
    }


    console.log(tempUserInfo.about)

    formData.append('about', tempUserInfo.about);
    formData.append('name', tempUserInfo.name);
    formData.append('username', tempUserInfo.username);
    formData.append('profileImg', searchedProfile.profileImg);
    formData.append('_id', searchedProfile._id);
    formData.append('linkCount', tempLinks.length);
    formData.append('darkMode', darkMode);
    formData.append('profession', tempprofession);


    for (let i = 0; i < tempLinks.length; i++) {
      console.log(tempLinks[i].image)
      if (typeof tempLinks[i].image == "string") {
        formData.append(`linkImg${i}`, tempLinks[i].image)
        formData.append(`linkTitle${i}`, tempLinks[i].title)
        formData.append(`linkUrl${i}`, tempLinks[i].url)
        formData.append(`linkFullScreen${i}`, tempLinks[i].fullWidth)
        formData.append(`linkDate${i}`, tempLinks[i].date)
      } else if (typeof tempLinks[i].image == "object") {
        const dat = new FormData()
        dat.append("file", tempLinks[i].image)
        dat.append("upload_preset", "l0nuoz4a")

        const response = await fetch("https://api.cloudinary.com/v1_1/dmjoqk3ww/image/upload", {
          method: 'POST',
          body: dat
        });
        const json = await response.json();

        console.log(json)
        formData.append(`linkImg${i}`, json.secure_url)
        formData.append(`linkTitle${i}`, tempLinks[i].title)
        formData.append(`linkUrl${i}`, tempLinks[i].url)
        formData.append(`linkFullScreen${i}`, tempLinks[i].fullWidth)
        formData.append(`linkDate${i}`, tempLinks[i].date)
      }
      // formData.append(`linkImg${i}`, tempLinks[i].image)
      // formData.append(`linkTitle${i}`, tempLinks[i].title)
      // formData.append(`linkUrl${i}`, tempLinks[i].url)
      // formData.append(`linkFullScreen${i}`, tempLinks[i].fullWidth)
      // formData.append(`linkDate${i}`, tempLinks[i].date)

    }
    console.log("feedfdlk")
    const response = await fetch(`${host}/api/editprofile`, {
      method: 'POST',
      body: formData
    });
    const json = await response.json();
    console.log(json)


    settempUserInfo({ ...tempUserInfo, username: json.username, about: json.about, name: json.name, profileImg: json.profileImg, darkMode: json.darkModeProfile, profBg: json.backgroundImage, profession: json.profession })
    setsearchedProfile(json)
    settempLinks(json.links)
    setoriginalLinks(json.links)
    settempprofession(json.profession)
    setediting(false)
  }


  const background = [
    "https://images.pexels.com/photos/6479848/pexels-photo-6479848.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/14026185/pexels-photo-14026185.jpeg?auto=compress&cs=tinysrgb&w=300",
    "https://web-images.credcdn.in/_next/assets/images/home-page/security-bg-mobile.jpg",
    "https://web-images.credcdn.in/_next/assets/images/home-page/deserve-more-bg-mobile.jpg",
    "https://web-images.credcdn.in/v2/_next/assets/images/snp/flairs-snp.png",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9GJ4CATU1XK2DbDT367G3AsKmLXKA45w7RA&usqp=CAU",
    "https://images.pexels.com/photos/23795/rocket-launch-space-discovery.jpg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/773757/pexels-photo-773757.jpeg?auto=compress&cs=tinysrgb&w=600",
  ]






  const [result, setresult] = useState([]);
  const [delopts, setdelopts] = useState(false);
  const [show, setshow] = useState(false)

  const [share, setshare] = useState(false)

  const [hasRated, sethasRated] = useState(false)
  const [prevRating, setprevRating] = useState(0)


  const validURL = (str) => {
    console.log(str)
    var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    console.log(!!pattern.test(str))
    if (!!pattern.test(str) == true) {
      console.log('link hai enterred')
      return true

      // setlink(str)
      // setisLink(true)
    }
    else if (!!pattern.test(str) == false) {
      console.log('false hai enterred')

      return false
      // console.log(link.length)
      // setisLink(false)
    }
    // setcredentials({ ...credentials, link: str })


  }





  const ref1 = useRef()
  const ref2 = useRef()

  useEffect(() => {
    console.log(searchedProfile.links)
    console.log(editing)
    console.log(router.asPath)
    console.log('useEffect fired!', { asPath: router.asPath });


  }, [cnt]);



  return (
    <>
      <Head>
        <title> {searchedProfile.name} (@{searchedProfile.username}) / Ubout </title>
        <meta name="description" content={`About: ${searchedProfile.about}`} />
        <meta
          name="keywords"
          content={`${searchedProfile.name},${searchedProfile.username}`}
        />
      </Head>
      <div id='profile' className={darkMode ? 'profileBg_dm' : 'profileBg'}
      // style={{ background: profBg }}
      >
        <ToastContainer></ToastContainer>



        {
          !editing && searchedProfile._id == _id ?
            <div style={{ display: "flex", justifyContent: "space-around", marginBottom: "1rem", alignItems: "center" }} >
              {/* <div style={{ height: "100%", display: "flex", alignItems: "center", padding: "0 1rem" }} onClick={() => navigate("/")} >
  
  
                      </div> */}
              <button className='topBtn' onClick={() => {
                setshowProfile(false)
                // navigate("/")
                router.push("/")

              }
              }
                style={darkMode ? { backgroundColor: "#1b1a1a", padding: "0.25rem 1rem" } : { backgroundColor: "whitesmoke", padding: "0.15rem 1rem" }}
              ><RiHome2Line size={20} /></button>
              <button className='topBtn' onClick={() => {
                setshowProfile(false)
                // navigate("")
                router.push(`/${searchedProfile.username}/analytics`)

              }
              }
                style={darkMode ? { backgroundColor: "#1b1a1a" } : { backgroundColor: "whitesmoke" }}
              >Analytics</button>
              <button className='topBtn' onClick={() => {
                setediting(true)
                router.replace({
                  pathname: `/${searchedProfile.username}`,
                }, undefined, { shallow: true }
                )
                setcnt(cnt + 1)
                // router.push(`${router.query.profile}/edit`)
              }
              }
                style={darkMode ? { backgroundColor: "#1b1a1a" } : { backgroundColor: "whitesmoke" }}

              >Edit Profile</button>

              <button className='topBtn' onClick={() => {
                router.replace({
                  pathname: `/${searchedProfile.username}`,
                  query: {
                    tab: 'settings',
                    // edit: false
                  }
                }, undefined, { shallow: true }
                )
                document.getElementById("linkRow").style.display = 'none'
                setcnt(cnt + 1)
              }}
                style={darkMode ? { backgroundColor: "#1b1a1a" } : { backgroundColor: "whitesmoke" }}

              >
                <MdSettings size={24} />


              </button>


            </div> :
            ""
        }
        {
          editing && searchedProfile._id == _id ?
            <div style={{ display: "flex", justifyContent: "space-around", marginBottom: "1rem", alignItems: "center" }} >
              <button className='dsfdsfsd' onClick={() => {
                setediting(false)
                setprofBg(searchedProfile.backgroundImage)
                setdarkMode(searchedProfile.darkModeProfile)
                console.log(searchedProfile.links)
                console.log(originalLinks)
                settempLinks(searchedProfile.links)

                if (searchedProfile.darkModeProfile) {
                  document.getElementsByTagName("body")[0].style.backgroundColor = "black"
                } else {
                  document.getElementsByTagName("body")[0].style.backgroundColor = "white"
                }

                document.getElementById("profile").style.background = `url(${searchedProfile.backgroundImage})`

                // navigate(`/${searchedProfile.username}`)
                router.replace({
                  pathname: `/${searchedProfile.username}`,
                  query: null
                }, undefined, { shallow: true }
                )
                setcnt(cnt + 1)
              }
              }
                style={{ margin: "0.5rem 0 ", fontWeight: "500", fontSize: "14px", padding: "0.35rem 1rem", border: "none", backgroundColor: "", borderRadius: "1rem", border: "none" }}
              >Cancel</button>



              <div className="one-quarter" id="switch">
                <input onChange={() => {
                  // document.getElementsByTagName("body")[0].style.backgroundColor = "black"
                  if (!darkMode) {
                    document.getElementsByTagName("body")[0].style.backgroundColor = "black"
                    setdarkMode(true)
                  } else {
                    document.getElementsByTagName("body")[0].style.backgroundColor = "white"
                    setdarkMode(false)
                  }
                }} type="checkbox" className="checkbox" id="chk" checked={darkMode} />
                <label className="label" htmlFor="chk">
                  {/* <i className="fas fa-moon" style={{ fontSize: "8px" }} >🌛</i> */}
                  <i className="fas fa-moon" style={{ fontSize: "8px" }} ><FaMoon /></i>
                  {/* <i className="fas fa-sun" style={{ fontSize: "8px" }} >☀</i> */}
                  <i className="fas fa-sun" style={{ fontSize: "9px" }} ><FaSun /></i>
                  <div className="ball"></div>
                </label>
              </div>

              <button className='dsfdsfsd' onClick={save}
                style={{ margin: "0.5rem 0 ", fontWeight: "500", fontSize: "14px", padding: "0.35rem 1rem", border: "none", backgroundColor: "dodgerblue", borderRadius: "1rem", border: "none", color: "white" }}
              >Save</button>
            </div>
            : ""
        }


        <div style={{ width: "100%", display: "flex", alignItems: "center", marginBottom: "0.5rem", justifyContent: "center" }} >

          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}    >
            {
              editing ?
                <>
                  <div style={{ position: "absolute", fontSize: "100px", color: "gray" }} onClick={() => profileImgRef.current.click()} >+</div>
                  <input type="file" accept="image/png, image/jpg, image/jpeg" style={{ display: 'none' }} ref={profileImgRef}
                    onChange={(e) => {
                      setstateCount(stateCount + 1)
                      settempUserInfo({ ...tempUserInfo, profileImg: e.target.files[0] })
                    }
                    } />
                  <img style={{ width: "8rem", borderRadius: "50%", height: "8rem" }} src={tempUserInfo.profileImg?.name?.length > 0 ?
                    URL.createObjectURL(tempUserInfo.profileImg)
                    : searchedProfile.profileImg} >

                  </img>
                </>
                :
                <img style={{ width: "8rem", borderRadius: "50%", height: "8rem" }} src={searchedProfile.profileImg} >
                </img>
            }


          </div>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", marginLeft: "2rem" }}>

            <h3 style={{ fontWeight: "bold", textAlign: "center" }} >{searchedProfile.name}</h3>
            <div style={{ fontWeight: "600", textAlign: "center" }} >{searchedProfile.username}</div>
            {/* <Button variant="primary">Primary</Button> */}



            <div style={{ display: "flex", alignItems: "center", margin: "0.5rem 0" }} >
              <div style={{ backgroundColor: "dodgerblue", padding: "0.25rem 0.5rem", borderRadius: "16px", cursor: "pointer" }} >
                <button className='dsfdsfsd' onClick={() => {
                  toast('Feature Coming Soon !', {
                    position: "top-left",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,

                  })
                }}
                  style={{ backgroundColor: "dodgerblue", fontWeight: "500", color: "white", fontSize: "14px", border: "none", }}
                >Support</button> <span style={{ marginLeft: "0.5rem", }} onClick={() => {
                  toast('Feature Coming Soon !', {
                    position: "top-left",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,

                  })
                }}
                >🔔</span>
                <AiOutlineShareAlt size={20} style={{ margin: "0 0.5rem", }} color='white' onClick={() => { setshare(true) }} />
              </div>
              {/* <button> </button> */}
            </div>

          </div>
        </div>


        <div id='krish' className='segmain'   >
          <div ref={ref1} onClick={() => {
            if (editing) {
              router.replace({
                pathname: `/${searchedProfile.username}`,
                query: null
              }, undefined, { shallow: true }
              )
              document.getElementById("linkRow").style.display = 'none'
              setcnt(cnt + 1)
            } else {
              router.replace({
                pathname: `/${searchedProfile.username}`,
                query: null
              }, undefined, { shallow: true }
              )
              document.getElementById("linkRow").style.display = 'flex'
              document.getElementById("linkRow").style.justifyContent = 'center'


              setcnt(cnt + 1)
            }

          }}
            className={(router.asPath == `/${searchedProfile.username}` || router.asPath == `/${searchedProfile.username}/links`) ? `segactive segment ${darkMode ? 'segdm' : 'seglg'}` : " segment"}
          >Links</div>



          <div ref={ref2} onClick={() => {
            console.log(router.asPath)


            if (editing) {
              router.replace({
                pathname: `/${searchedProfile.username}`,
                query: {
                  tab: 'about',
                  // edit: false
                }
              }, undefined, { shallow: true }
              )

              document.getElementById("linkRow").style.display = 'none'


              setcnt(cnt + 1)
            } else {
              router.replace({
                pathname: `/${searchedProfile.username}`,
                query: {
                  tab: 'about',
                  // edit: false
                }
              }, undefined, { shallow: true }
              )
              document.getElementById("linkRow").style.display = 'none'


              setcnt(cnt + 1)
            }
          }}
            className={typeof window !== 'undefined' && router.asPath == `/${searchedProfile.username}?tab=about` ? `segactive segment ${darkMode ? 'segdm' : 'seglg'}` : "segment"}  >About</div>




          <div onClick={() => {





            if (editing) {
              router.replace({
                pathname: `/${searchedProfile.username}`,
                query: {
                  tab: 'ratings',
                  // edit: false
                }
              }, undefined, { shallow: true }
              )

              document.getElementById("linkRow").style.display = 'none'


              setcnt(cnt + 1)
            } else {
              router.replace({
                pathname: `/${searchedProfile.username}`,
                query: {
                  tab: 'ratings',
                  // edit: false
                }
              }, undefined, { shallow: true }
              )
              document.getElementById("linkRow").style.display = 'none'
              setcnt(cnt + 1)
            }

          }} className={typeof window !== 'undefined' && router.asPath == `/${searchedProfile.username}?tab=ratings` ? `segactive segment ${darkMode ? 'segdm' : 'seglg'}` : " segment"}  >Ratings</div>




          {
            editing ?
              <div onClick={() => {
                router.replace({
                  pathname: `/${searchedProfile.username}`,
                  query: {
                    tab: 'appearance',
                    // edit: true
                  }
                }, undefined, { shallow: true }
                )
                document.getElementById("linkRow").style.display = 'none'
                setcnt(cnt + 1)
              }} className={typeof window !== 'undefined' && router.asPath == `/${searchedProfile.username}/appearance` ? `segactive segment ${darkMode ? 'segdm' : 'seglg'}` : " segment"}  >
                <BsStars color={darkMode ? 'cyan' : "blue"} size={22} />
              </div> :
              ""

          }



        </div>

        {
          searchedProfile._id == _id && editing && typeof window !== 'undefined' && router.asPath == `/${searchedProfile.username}/edit` ?
            <div style={{ width: "50%", margin: " 0.5rem auto", border: "1px solid gray", borderRadius: "1rem" }} className={darkMode ? "linkCard_dm" : "linkCard"}  >
              <div className="container" style={{ backgroundColor: "" }} >
                <h6 style={{ textAlign: "center", marginTop: "0.5rem" }} onClick={
                  () => {
                    setModalShow(true)
                    settempLinkInfo({ ...tempLinkInfo, date: new Date().toString() })
                  }
                } ><b>Add Link</b></h6>
              </div>
            </div> : ""
        }
        <Modal
          // {...props}
          show={modalShow}
          onHide={() => {
            settempLinkInfo({ url: "", title: '', image: "", fullWidth: false, date: "" })
            setModalShow(false)
            seteditLinkModal(false)
          }
          }
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          style={darkMode ? { color: "white" } : { color: "black" }}


        >
          <Modal.Header style={darkMode ? { backgroundColor: "#1b1a1a", color: "white" } : {}}>
            <Modal.Title id="contained-modal-title-vcenter">
              {!editLinkModal ? "Add a link" : "Edit button"}
            </Modal.Title>
            <CloseButton onClick={() => {
              settempLinkInfo({ url: "", title: '', image: "", fullWidth: false, date: "" })
              setModalShow(false)
              seteditLinkModal(false)
            }} variant={darkMode ? "white" : "white"} />
          </Modal.Header>
          <Modal.Body style={darkMode ? { backgroundColor: "#1b1a1a", color: "white" } : {}} >
            {/* <h4>Add a link</h4> */}
            <Row className="g-2" style={{ margin: "0.5rem 0" }} >
              <Col md style={{ padding: "0 0.5rem" }} >
                <input type="file" accept="image/png, image/jpg, image/jpeg" style={{ display: 'none' }} ref={ref} onChange={onImgChange} />
                <FaImage onClick={() => ref.current.click()} size={24} />
                {
                  tempLinkInfo.image?.name?.length > 0 ?
                    <div style={{ display: "flex", justifyContent: "center" }} >
                      <img src={URL.createObjectURL(tempLinkInfo.image)} alt="" style={{ width: "50%", }} />
                    </div> : ""
                }
                {
                  tempLinkInfo.image && typeof tempLinkInfo.image == "string" ?
                    <div style={{ display: "flex", justifyContent: "center" }} >
                      <img src={tempLinkInfo.image} alt="" style={{ width: "50%", }} />
                    </div>
                    : ""
                }
              </Col>
            </Row>
            <Row className="g-2" style={{ margin: "0.5rem 0" }} >
              <Col md>
                <FloatingLabel controlId="floatingInputGrid" label="Title for url">
                  <Form.Control style={darkMode ? { backgroundColor: "#1b1a1a", color: "white" } : {}} value={tempLinkInfo.title} name='title' onChange={(e) => settempLinkInfo({ ...tempLinkInfo, [e.target.name]: e.target.value })} placeholder="ubout" autoComplete="off" />
                </FloatingLabel>
              </Col>
            </Row>
            <Row className="g-2" style={{ margin: "0.5rem 0" }} >
              <Col md>
                <FloatingLabel controlId="floatingInputGrid" label="Url">
                  <Form.Control style={darkMode ? { backgroundColor: "#1b1a1a", color: "white" } : {}} value={tempLinkInfo.url} name="url" onChange={(e) => settempLinkInfo({ ...tempLinkInfo, [e.target.name]: e.target.value })} placeholder="https://ubout-me.herokuapp.com/" autoComplete="off" />
                </FloatingLabel>
              </Col>
            </Row>
            <Row style={{ margin: "0.5rem 0", display: "flex" }} >
              <Form.Check
                onChange={() => {

                  if (!tempLinkInfo.fullWidth) { settempLinkInfo({ ...tempLinkInfo, fullWidth: true }) } else { settempLinkInfo({ ...tempLinkInfo, fullWidth: false }) }
                }
                }
                type="switch"
                id="custom-switch"
                label="Take full width"
                checked={tempLinkInfo.fullWidth}
              />
            </Row>
            <div style={{ width: "100%", display: "flex", justifyContent: "flex-end" }} >

              <Button onClick={() => {
                console.log(tempLinkInfo)
                console.log(tempLinks)
                const arr = [...tempLinks];
                // console.log(arr)
                // console.log(result.source.index)
                // console.log(result.destination.index)

                //Changing the position of Array element
                let removedItem = arr.splice(tempLinkInfo.index, 1)[0];
                console.log(arr)
                // arr.splice(result.destination.index, 0, removedItem);
                // console.log(arr)
                // //Updating the list
                settempLinks(arr);
                setModalShow(false)

              }} variant="danger" style={{ display: "flex", alignItems: "center" }}   >Delete <MdDelete size={18} /> </Button>
            </div>


          </Modal.Body>
          <Modal.Footer style={darkMode ? { backgroundColor: "#1b1a1a", color: "white" } : {}} >
            <Button style={{ width: "100%" }} onClick={() => {
              if (!editLinkModal) {
                let checkurl = tempLinkInfo.url.match(/\s/g)
                // let checktitle = tempLinkInfo.title.match(/\s\s+/g, ' ')
                let checktitle = tempLinkInfo.title.replace(/\s\s+/g, ' ')


                if (checkurl) {

                  return (
                    toast.warn('button Url cannot contain spaces', {
                      position: "top-center",
                      autoClose: 2000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                    })
                  )


                }
                if (checktitle.length < 1) {

                  return (
                    toast.warn('Title cannot be empty', {
                      position: "top-center",
                      autoClose: 2000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                    })
                  )


                }
                let chkURl = validURL(tempLinkInfo.url)
                if (chkURl == false) {
                  return (
                    toast.error('Invalid Url ', {
                      position: "top-center",
                      autoClose: 2000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                    })
                  )
                }


                setModalShow(false)
                settempLinks([...tempLinks, tempLinkInfo])
                // console.log(tempLinks)
                // console.log(tempLinks[0].date)
                // console.log(tempLinkInfo)
                settempLinkInfo({ url: "", title: '', image: "", fullWidth: false, date: "" })
              } else if (editLinkModal) {
                console.log(tempLinkInfo)
                let arr = tempLinks
                arr.splice(tempLinkInfo.index, 1, tempLinkInfo)
                console.log(arr)
                settempLinks(arr)
                setModalShow(false)
                seteditLinkModal(false)
                setstateCount(stateCount + 1)
                settempLinkInfo({ url: "", title: '', image: "", fullWidth: false, date: "" })

              }
            }
            } >Done</Button>
          </Modal.Footer>
        </Modal>

        <Container className="profileMain" fluid style={{ marginTop: '1rem', }} >


          <Row id="linkRow" style={!editing && (router.asPath == `/${searchedProfile.username}` || router.asPath == `/${searchedProfile.username}/links`) ?
            { alignItems: "center", justifyContent: "center", boxSizing: "border-box", marginBottom: "1rem", padding: "0" }
            : {
              display: "none"
            }
          } >
            {

              searchedProfile.links.map((link, i) =>
                <LinkItem key={i} darkMode={darkMode} link={link} />
              )

            }
          </Row>


          {
            editing && router.asPath == `/${searchedProfile.username}` ?
              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="droppable">
                  {(provided, snapshot) => (
                    <Row style={{ display: "flex", alignItems: "center", justifyContent: "center", boxSizing: "border-box", marginBottom: "1rem", padding: "0" }
                    }    {...provided.droppableProps}
                      ref={provided.innerRef}>



                      {tempLinks.map((link, i) => (
                        <Draggable key={link.date} draggableId={link.date} index={i}>
                          {(provided, snapshot) => (

                            <CardItem provided={provided} darkMode={darkMode} link={link} i={i} snapshot={snapshot} getItemStyle={getItemStyle} seteditLink={seteditLink} seteditLinkModal={seteditLinkModal} settempLinkInfo={settempLinkInfo} setModalShow={setModalShow} />

                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}

                    </Row>

                  )}
                </Droppable>
              </DragDropContext>
              :
              ""
          }



          {/* {

            typeof window !== 'undefined' && router.asPath == `/${searchedProfile.username}/about` && searchedProfile.about.length > 0 ?
             
              : ""
          } */}

          <div className={darkMode ? "linkCard_dm" : "linkCard"} style={typeof window !== 'undefined' && router.asPath == `/${searchedProfile.username}/about` && searchedProfile.about.length > 0 ? { fontWeight: "600", whiteSpace: 'pre-wrap', wordBreak: "break-word", width: "100%", padding: "1rem", marginBottom: "2rem", backgroundColor: "" } : { display: "none" }}  >
            <p style={
              darkMode ?
                { fontSize: "12px", fontFamily: "sans-serif", marginBottom: "0.5rem", backgroundColor: "", padding: "0.15rem 0.5rem", borderRadius: "16px", display: "inline-block", border: "1px solid gray" } : { fontSize: "12px", fontFamily: "sans-serif", marginBottom: "0.5rem", backgroundColor: "", padding: "0.15rem 0.5rem", borderRadius: "16px", display: "inline-block", border: "1px solid gray" }
            } >
              {searchedProfile.profession}
            </p>
            <p>
              {
                searchedProfile.about
              }
            </p>
          </div>


          {

            typeof window !== 'undefined' && router.asPath == `/${searchedProfile.username}?tab=about` ?
              <>
                <div className={darkMode ? "linkCard_dm" : "linkCard"} style={{ fontWeight: "600", whiteSpace: 'pre-wrap', wordBreak: "break-word", width: "100%", padding: "1rem", marginBottom: "2rem" }}  >
                  <input value={tempprofession} onChange={(e) => { settempprofession(e.target.value) }} style={darkMode ?
                    { fontSize: "12px", fontFamily: "sans-serif", marginBottom: "0.5rem", backgroundColor: "inherit", padding: "0.15rem 0.5rem", borderRadius: "16px", display: "inline-block", border: "1px solid gray", color: "white", width: "60%" } : { fontSize: "12px", fontFamily: "sans-serif", marginBottom: "0.5rem", backgroundColor: "inherit", padding: "0.15rem 0.5rem", borderRadius: "16px", display: "inline-block", border: "1px solid gray" }} maxLength={30} placeholder='Profession' className="form-control" id="password" name="password" minLength={8} required />
                  <Form.Control

                    onChange={(e) => settempUserInfo({ ...tempUserInfo, about: e.target.value })}
                    as="textarea"
                    placeholder="Tell more about yourself"
                    style={darkMode ? { resize: "none", border: "none", color: "white", backgroundColor: "inherit" } : { resize: "none", border: "none", color: "black", backgroundColor: "inherit" }}
                    rows={12}

                    value={tempUserInfo.about}
                  />
                </div>

              </>
              : ""

          }



          <div className={darkMode ? "linkCard_dm" : "linkCard"} style={router.asPath == `/${searchedProfile.username}?tab=ratings` ? { margin: "0.5rem", padding: "0.5rem", cursor: "pointer", opacity: '1' } : { display: "none" }}   >
            <Ratings darkMode={darkMode} searchedProfile={searchedProfile} profileImg={profileImg} _id={_id} />
          </div>


          {
            typeof window !== 'undefined' && router.asPath == `/${searchedProfile.username}?tab=appearance` ?
              <>
                <h5>Background</h5>
                <FcCancel onClick={() => {
                  document.getElementById("profile").style.background = ``
                  setprofBg('')
                }} style={{ width: "100%", margin: "auto" }} size={24} />


                <Row style={{ display: "flex", justifyContent: "center" }} >
                  <input type="file" accept="image/png, image/jpg, image/jpeg" style={{ display: 'none' }} ref={bgImg}
                    onChange={(e) => {
                      console.log(e.target.files[0])
                      setprofBg(e.target.files[0])
                      setstateCount(stateCount + 1)
                      let a = URL.createObjectURL(e.target.files[0])
                      document.getElementById("profile").style.background = `url(${a})`
                      document.getElementById("profile").style.backgroundSize = 'cover'
                      document.getElementById("profile").style.backgroundRepeat = 'no-repeat'

                    }
                    } />
                  <div onClick={() => {
                    bgImg.current.click()
                  }
                  } style={darkMode ?
                    { height: "176px", width: "100px", border: "2px solid silver", borderRadius: "1rem", margin: "0.25rem", fontSize: "50px", display: "flex", alignItems: "center", justifyContent: "center" } :
                    { height: "176px", width: "100px", border: "2px solid black", borderRadius: "1rem", margin: "0.25rem", fontSize: "50px", display: "flex", alignItems: "center", justifyContent: "center" }} >
                    +
                  </div>

                  {
                    background.map((bg, i) =>
                      <Col
                        onClick={() => {
                          setprofBg(`${bg}`)
                          document.getElementById("profile").style.background = `url(${bg})`
                          document.getElementById("profile").style.backgroundSize = 'cover'
                          document.getElementById("profile").style.backgroundRepeat = 'no-repeat'
                        }}

                        xs={3} key={i} style={darkMode ?
                          { height: "177px", width: "100px", border: "2px solid silver", borderRadius: "1rem", background: `url(${bg})`, margin: "0.25rem", backgroundSize: "contain", } :
                          { height: "177px", width: "100px", border: "2px solid black", borderRadius: "1rem", background: `url(${bg})`, margin: "0.25rem", backgroundSize: "contain", }} ></Col>
                    )
                  }
                </Row>


                <h5 style={{ marginTop: "2rem" }} >Links</h5>

                <Row style={{ display: "flex", alignItems: "center", justifyContent: "center", boxSizing: "border-box", marginBottom: "1rem", padding: "0" }} >
                  <Col className={darkMode ? "linkCard_dm" : "linkCard"} xs={4} style={{ margin: "0.5rem", padding: "0", cursor: "pointer" }}   >
                    <div className="contain">
                      <div style={{ display: "flex", justifyContent: "center" }} >
                        <img src='https://keepitupp.herokuapp.com/star-removebg-preview.png' alt="" style={{ width: "100%", }} />
                      </div>

                      <h6 style={{ textAlign: "center", marginTop: "0.5rem" }} ><b>Keepitupp</b></h6>
                    </div>
                  </Col>
                  <Col className={darkMode ? "linkCard_dm" : "linkCard"} xs={5} style={{ display: "flex", alignItems: "center" }}  >
                    <img src='https://keepitupp.herokuapp.com/star-removebg-preview.png' alt="" style={{ height: "30px", marginRight: "0.5rem" }} />
                    <h6 style={{ textAlign: "center", marginTop: "0.5rem" }} ><b>Keepitupp</b></h6>
                  </Col>
                </Row>


                <Row style={{ display: "flex", alignItems: "center", justifyContent: "space-between", margin: "4rem 0", textAlign: "center", padding: "0.5rem" }} className={darkMode ? "linkCard_dm" : "linkCard"} >
                  <Col>
                    <h6>Hide Ubout Logo</h6>
                    <h5>Ubout
                      <img src="./favicon.ico" style={{ width: "30px", height: "30px", marginLeft: "0.5rem" }} alt="" />
                    </h5>
                  </Col>
                  <Col>
                    <h6>Upgrade 🔒</h6>
                  </Col>
                </Row>


              </>
              : ""
          }



          {

            typeof window !== 'undefined' && router.asPath == `/${searchedProfile.username}?tab=settings` && searchedProfile._id == _id ?
              <div className={darkMode ? "linkCard_dm" : "linkCard"} style={{ fontWeight: "600", whiteSpace: 'pre-wrap', wordBreak: "break-word", width: "100%", padding: "1rem", marginBottom: "2rem", backgroundColor: "" }}  >

                <Link href='/terms-of-service' style={{ color: darkMode ? "white" : "black", marginBottom: "0.5rem", cursor: "pointer", display: 'block', textDecoration: "none" }} >Terms of Service</Link>
                <Link href='/privacy' style={{ color: darkMode ? "white" : "black", marginBottom: "0.5rem", cursor: "pointer", display: 'block', textDecoration: "none" }} >Privacy</Link>
                <Link href='/about' style={{ color: darkMode ? "white" : "black", marginBottom: "0.5rem", cursor: "pointer", display: 'block', textDecoration: "none" }} >About</Link>
                <p style={{ color: darkMode ? "white" : "black", marginBottom: "0.5rem", cursor: "pointer", display: 'block', textDecoration: "none" }} >@All right reserved</p>
              </div>
              : ""
          }


        </Container >






        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", margin: "1rem 0 ", position: "relative", bottom: 0 }} >
          <h5 onClick={() => window.open("https://ubout.vercel.app/about", '_blank')
          } style={{ margin: 0 }} >Ubout</h5>
          <img src="./favicon.ico" style={{ width: "30px", height: "30px", marginLeft: "0.5rem" }} alt="" />


        </div>





      </div >




      <div id="element" >

        {
          searchedProfile && typeof window !== 'undefined' && router.asPath == `/${searchedProfile.username}?tab=analytics` && !showProfile ?
            <Analytics /> : ""
        }
      </div>

      {
        share ?
          <Modal
            // {...props}
            show={share}
            onHide={() => {
              setshare(false)
            }
            }
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            // style={darkMode ? { color: "white" } : { color: "black" }}
            style={{ padding: "0.5rem" }}

          >
            <div style={{ padding: "1rem", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }} >
              <div onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: "Ubout Profile",
                    text: "Sharing a post",
                    url: `${host}/${searchedProfile.username}`

                  })

                }
              }}
                style={{ fontWeight: "bold", display: "flex", alignItems: "center", backgroundColor: " #128C7E", padding: "0.5rem", color: "white", marginBottom: "2rem", borderRadius: '6px' }}
              >
                Share Via <FaWhatsapp style={{ marginLeft: "4px" }} ></FaWhatsapp>
              </div>
              <QrCode value={`${host}/${searchedProfile.username}`} title={`${searchedProfile.username}`} />
              <div style={{ display: "flex", alignItems: "center", marginTop: '2rem', border: "1px solid gray", padding: "0.5rem", borderRadius: '6px' }} >
                <input type="text" value={`${host}/${searchedProfile.username}`} style={{ overflowX: "scroll", scrollMargin: 0, width: "90%", border: "none", color: "black" }} disabled={true} />
                <MdContentCopy onClick={() => {
                  navigator.clipboard.writeText(`${host}/${searchedProfile.username}`)
                  toast.success('Copied', {
                    position: "top-left",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,

                  })
                }} size={20} style={{ marginLeft: "4px" }} />
              </div>
              <div style={{ display: "flex", alignItems: "center", marginTop: '2rem' }} >
                <img src={searchedProfile.profileImg} style={{ width: "2.5rem", height: "2.5rem", borderRadius: "50%" }} alt="" />
                <span style={{ marginLeft: "4px", fontWeight: "500" }}>{searchedProfile.username}</span>
              </div>
            </div>
          </Modal> : ""
      }


    </>
  )
}

export default Profile


export const CardItem = ({ provided, darkMode, link, i, snapshot, getItemStyle, seteditLinkModal, seteditLink, setModalShow, settempLinkInfo }) => {


  return (
    <Col ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps} className={darkMode ? "linkCard_dm" : "linkCard"} xs={link.fullWidth ? 11 : 5} key={i} style={getItemStyle(
        snapshot.isDragging,
        provided.draggableProps.style
      )}  >
      <div className="contain">
        {
          link.image?.name?.length > 0 ?
            <div style={{ display: "flex", justifyContent: "center" }} >
              <img src={URL.createObjectURL(link.image)} alt="" style={{ width: "100%", borderRadius: "0.5rem 0.5rem 0 0" }} />
            </div> : ""
        }
        {
          link.image && typeof link.image == "string" ?
            <div style={{ display: "flex", justifyContent: "center" }} >
              <img src={link.image} alt="" style={{ width: "100%", borderRadius: "0.5rem 0.5rem 0 0" }} />
            </div>
            : ""
        }

        <div style={{ display: "flex", alignItems: "center" }} >
          <h6 style={{ textAlign: "center", marginTop: "0.5rem", width: "100%", marginBottom: "0.5rem", whiteSpace: 'pre-wrap', wordBreak: "break-word", padding: '0 0.5rem' }} ><b>{link.title}</b></h6>
          <div onClick={() => {
            let obj = link
            obj.index = i
            settempLinkInfo(obj)
            setModalShow(true)
            seteditLinkModal(true)
          }} style={{ height: "inherit", padding: "0 0.5rem" }} >
            <FaRegEdit size={18} />
          </div>
        </div>

        {/* <p>Architect & Engineer</p> */}
      </div>
    </Col>
  )
}

export const LinkItem = ({ link, darkMode, key }) => {

  const ref = useRef()
  const [showShareBtn, setshowShareBtn] = useState(false)
  const handleLinkClick = (link) => {
    ref.current.click()
    // dispatch(openLinkFunc(link))
  }
  const openLinkFunc = (link) => async dispatch => {

    // window.open(link.url, '_blank')

    console.log(searchedProfile._id, "sitaram", link)
    // const response = await fetch(`${host}/api/auth/openlink`, {
    //   method: 'PUT',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ _id: searchedProfile._id, link_id: link._id })
    // });
    // const json = await response.json();
    // console.log(json)  
  }
  return (
    <>
      <Col
        onMouseOver={() => {
          setshowShareBtn(true)
        }}
        onMouseLeave={() => {
          setshowShareBtn(false)
        }}
        // onClick={() => dispatch(openLinkFunc(link))}
        className={darkMode ? "linkCard_dm" : "linkCard"} xs={link.fullWidth ? 11 : 5} key={key}
        style={{ margin: "0.5rem", padding: "0", cursor: "pointer", borderRadius: "0.5rem", display: "block" }}
      >

        <a target="_blank" ref={ref} rel="noopener noreferrer" href={`${link.url}`} style={{ display: "none" }} ></a>
        <div onClick={(e) => {
          e.stopPropagation();
          handleLinkClick(link)
        }} style={{ color: "inherit", textDecoration: "none" }} target="blank" className="contain">
          {
            link.image?.name?.length > 0 ?
              <div style={{ display: "flex", justifyContent: "center" }} >
                <img src={URL.createObjectURL(link.image)} alt="" style={{ width: "100%", borderRadius: "0.5rem 0.5rem 0 0" }} />
              </div> : ""
          }
          {
            link.image && typeof link.image == "string" ?
              <div style={{ display: "flex", justifyContent: "center", }} >
                <img src={link.image} alt="" style={{ width: "100%", borderRadius: "0.5rem 0.5rem 0 0" }} />
              </div>
              : ""
          }
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", margin: "0.5rem 0", padding: "0 0.5rem" }} >
            <h6 style={{ textAlign: "center", margin: 0 }} ><b>{link.title}</b>  </h6>
            <div >
              {showShareBtn ?
                <AiOutlineShareAlt onClick={(e) => {
                  e.stopPropagation();
                  if (navigator.share) {
                    navigator.share({
                      title: "Ubout Profile Link",
                      text: "Sharing a link",
                      url: link.url

                    })

                  }
                }} size={20} style={{ margin: "0 0.5rem", }} color='inherit' />
                : ''}
            </div>
          </div>



          {/* <p>Architect & Engineer</p> */}
        </div>
      </Col>
    </>
  )
}





export async function getServerSideProps(context) {


  console.log(context.params, "params")
  const getHostname = (url) => {
    return new URL(url).hostname;
  }

  var ip = null
  console.log("paradiese")

  await fetch('https://api.ipify.org/').then(
    r => r.text()
  ).then(
    data => {
      ip = data
      console.log(ip)
    }
  ).catch(
    (err) => {
      console.log(err)

      return (
        ip = null
      )
    }
  )

  console.log("sfjlkajslkfjlskj", context.req.headers.referer)



  var g = context.req.headers.referer
  var dmn = ""
  console.log(g)
  // console.log(_id)

  if (context.req.headers.referer?.length > 0) {
    console.log(getHostname(g));
    dmn = getHostname(g)
  }

  const response = await fetch(`${host}/api/fetchuniqueuser`, {
    // const response = await fetch('https://keepitupp.herokuapp.com/api/auth/fetchuniqueser', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ profile: context.params.profile, ip, domain: dmn }),
  });
  const json = await response.json();
  console.log(json)
  console.log("json")

  if (json.fetchuniqueser !== null) {
    return {
      props: json, // will be passed to the page component as props
    }
  } else {
    console.log("ksjdklasjfklsjdfkljsfkaljs")
    return {
      notFound: true,
    }
  }


}