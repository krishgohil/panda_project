import React, { useEffect, useState } from 'react'

import { FaBars, FaMoon, FaStar, FaSun, FaUserCircle } from 'react-icons/fa';
import { AiOutlineSearch } from 'react-icons/ai';

import styles from '../styles/Home.module.css'
import { useSelector, useDispatch } from "react-redux"
import { useRouter } from "next/router";
import { host } from '../host';
import { SET_DISPLAY_MODE } from '../actionType';
import Link from 'next/link';


const Header = () => {


    const { username, name, _id, profileImg, about, guest, links } = useSelector(state => state.auth)
    const { input } = useRouter();
    const dispatch = useDispatch()
    const { feed_Data, displayDarkMode } = useSelector(state => state.feed)

    const [_input, set_input] = useState('')
    const [people, setpeople] = useState([])

    const [darkMode, setdarkMode] = useState(false)
    useEffect(() => {
        // dispatch(searchUsers())
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
        navigate(`/search/${_input}`)



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
            style={darkMode ? { bdarkModeProfileackgroundColor: "#1b1a1a", color: "white" } : { backgroundColor: "whitesmoke", color: "black" }}
        >




            <div className={styles.company} >
                <FaBars
                    className={styles.header__menu}
                    size={20}
                // onClick={() => handleToggleSidebar()}
                />
                <img alt="img" className={styles.companyLogo} src="./favicon.ico" style={{ zIndex: 999 }} />
                <span className={styles.companyName} style={darkMode ? { color: 'white', fontFamily: 'cursive', marginLeft: "1rem" } : { color: 'black', fontFamily: 'cursive', marginLeft: "1rem" }}  >
                    <b> <>
                        Ubout
                    </></b>
                </span>

                {/* <img alt="img" className='companyLogo' src="/images/k.png"  style={{ zIndex: 999 }} /> */}
            </div>


            <form className={styles._srchbar} >
                <input
                    className={styles.formInput}
                    type='text'
                    // placeholder={placeholder}
                    placeholder='Search'
                    // value={_input}
                    onChange={e => set_input(e.target.value)}
                    maxLength={100}
                    style={darkMode ? { color: "lightgreen" } : { color: "darkblue" }}
                />
                <button type='submit' className={styles.sbmtbtn}>
                    <AiOutlineSearch size={22} />
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
                            <button
                                // onClick={() => navigate("/login")}
                                className={styles.sign_up_header}
                            >Login</button>
                        </>
                }
            </div>

        </div>)
}

export default Header