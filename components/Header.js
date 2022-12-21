import React, { useEffect, useState } from 'react'

import { FaBars, FaMoon, FaStar, FaSun, FaUserCircle } from 'react-icons/fa';
import { AiOutlineSearch } from 'react-icons/ai';

import styles from '../styles/Home.module.css'
import { useSelector, useDispatch } from "react-redux"
import Router, { useRouter } from "next/router";
import { host } from '../host';
import { SET_DISPLAY_MODE } from '../actionType';
import Link from 'next/link';


const Header = () => {


    const { username, name, _id, profileImg, about, guest, links } = useSelector(state => state.auth)
    const router = useRouter()
    const { input } = router.query
    const dispatch = useDispatch()
    const { feed_Data, displayDarkMode } = useSelector(state => state.feed)

    const [_input, set_input] = useState('')
    const [people, setpeople] = useState([])

    const [darkMode, setdarkMode] = useState(false)
    useEffect(() => {
        console.log("input", input)

        if (window.location.pathname == `/search/${input}`) {
            dispatch(searchUsers())
        } else {
            console.log("iuytrew", input)
        }
    }, [input])

    useEffect(() => {


        console.log(displayDarkMode, "ok", darkMode)
        if (displayDarkMode !== darkMode) {
            dispatch({
                type: SET_DISPLAY_MODE,
                payload: {
                    displayDarkMode: darkMode
                }
            })
        }

    }, [darkMode])

    useEffect(() => {
        let mode = localStorage.getItem("umode")
        if (mode) {
            if (mode == "dark") {
                setdarkMode(true)
            } else {
                setdarkMode(false)
            }
        }

    }, [])
    const handleSubmit = e => {

        e.preventDefault()
        // let x = input.replace(/\s\s+/g, ' ')
        console.log(_input)
        Router.push(`/search/${_input}`)
        // navigate(`/search/${_input}`)




    }

    const [searchedResults, setsearchedResults] = useState([])

    const searchUsers = () => async dispatch => {
        console.log("rabba")
        const response = await fetch(`${host}/api/searchUsers`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId: _id, input: input }),
        });
        const json = await response.json();
        console.log(json)
        setsearchedResults(json)


    }

    const gotoprofile = () => {
        navigate(`/${username}`)
    }

    return (
        <div className={styles.header}
            style={darkMode ? { backgroundColor: "#1b1a1a", color: "white" } : { backgroundColor: "whitesmoke", color: "black" }}
        >




            <div className={styles.company} >
                <FaBars
                    className={styles.header__menu}
                    size={20}
                // onClick={() => handleToggleSidebar()}
                />
                <img onClick={()=>{router.push("/")}} alt="img" className={styles.companyLogo} src="https://res.cloudinary.com/dmjoqk3ww/image/upload/v1668442060/emm8ons4w1bsfqzz0iwn.png" style={{ zIndex: 999 }} />
                <span onClick={()=>{router.push("/")}} className={styles.companyName} style={darkMode ? { color: 'white', fontFamily: 'cursive', marginLeft: "1rem" } : { color: 'black', fontFamily: 'cursive', marginLeft: "1rem" }}  >
                    <b> <>
                        Ubout
                    </></b>
                </span>

                {/* <img alt="img" className='companyLogo' src="/images/k.png"  style={{ zIndex: 999 }} /> */}
            </div>


            <form className={styles._srchbar} onSubmit={handleSubmit} >
                <input
                    className={styles.formInput}
                    type='text'
                    // placeholder={placeholder}
                    placeholder='Search'
                    // value={_input}
                    onChange={e => set_input(e.target.value)}
                    maxLength={100}
                    style={darkMode ? { color: "#e6f8eb" } : { color: "rgb(30,30,30)" }}
                />
                <button type='submit' className={styles.sbmtbtn}>
                    <AiOutlineSearch color={darkMode ? "white" : "black"} size={22} />
                </button>
            </form>








            <div className={styles.header__icons}>
                <div className={styles.one_quarter} id="switch">
                    <input onChange={() => {
                        document.getElementsByTagName("body")[0].style.backgroundColor = "black"
                        if (!darkMode) {
                            console.log("workde ddd")
                            document.getElementsByTagName("body")[0].style.backgroundColor = "black"
                            localStorage.setItem("umode", "dark")
                            // dispatch({
                            //     type: SET_DISPLAY_MODE,
                            //     payload: {
                            //         displayDarkMode: true
                            //     }
                            // })
                            setdarkMode(true)
                        } else {
                            console.log("workde ")
                            document.getElementsByTagName("body")[0].style.backgroundColor = "white"
                            localStorage.setItem("umode", "light")

                            setdarkMode(false)

                        }
                    }} type="checkbox" className={styles.checkbox} id="chk" checked={darkMode} />
                    <label className={styles.label} htmlFor="chk">
                        {/* <i className="fas fa-moon" style={{ fontSize: "8px" }} >🌛</i> */}
                        <i className={styles.fa_moon} style={{ fontSize: "8px" }} ><FaMoon /></i>
                        {/* <i className="fas fa-sun" style={{ fontSize: "8px" }} >☀</i> */}
                        <i className={styles.fa_sun} style={{ fontSize: "9px" }} ><FaSun /></i>
                        <div className={styles.ball}></div>
                    </label>
                </div>
                {
                    _id ?
                        <>
                            {
                                profileImg !== '' ?
                                    <>
                                        <Link href={`/${username}`}>
                                            <img alt="img" className={styles.profimg} style={{ cursor: "pointer", marginLeft: "1rem", borderRadius: '50%', backgroundColor: 'white' }} src={profileImg} />
                                        </Link>

                                    </> :
                                    <FaUserCircle style={{ height: '2rem', width: '2rem', cursor: "pointer", marginLeft: '1rem', borderRadius: '50%' }} />
                            }
                        </>
                        :
                        <>
                            <Link href='/login' style={{ textDecoration: "none", color: "white" }} >
                                <button
                                    className={styles.sign_up_header}
                                >Login</button>
                            </Link>
                        </>
                }
            </div>

        </div>)
}

export default Header