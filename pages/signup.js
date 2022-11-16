import React, { useRef } from 'react'
import { useState } from 'react';
import { GET_USER_DETAILS, } from '../actionType';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

import { AiFillCheckCircle, AiOutlineMail } from 'react-icons/ai'
import { FaRegUser } from 'react-icons/fa'
import { MdCancel, MdOutlineLock } from 'react-icons/md'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { host } from '../host'
import { GoogleLogin } from '@react-oauth/google';
import { Spinner } from 'react-bootstrap';
const Signup = (props) => {
  const [show, setshow] = useState(true)
  const [mailmessage, setmailmessage] = useState(false)
  const [mail, setmail] = useState('')
  const [wait, setwait] = useState(false)

  const [credentials, setcredentials] = useState({ _name: "", username: "", _email: "", password: "", bio: "", profileImg: "", _confirmPass: "", birthDate: "", gender: "" })
  const dispatch = useDispatch()
  const onchange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value });
  }
  const [googleSignIn, setgoogleSignIn] = useState(false)
  const sbmt = useRef()

  const [googleDetails, setgoogleDetails] = useState()

  const [getusername, setgetusername] = useState(false)
  // const accessToken = useSelector(state => state.auth2.accessToken)
  // const loading = useSelector(state => state.auth2.loading)

  // const userId = localStorage.getItem('user id')
  function handleCredentialResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);
  }


  // useEffect(() => {


  //     google.accounts.id.initialize({
  //         client_id: "87939184502-dvrtpsvn23tj3comolg0hcm6r8trqqvd.apps.googleusercontent.com",
  //         callback: handleCredentialResponse
  //     });
  //     google.accounts.id.renderButton(
  //         // googleButton.current, //this is a ref hook to the div in the official example
  //         // { theme: "outline", size: "large" }  // customization attributes

  //         document.getElementById("signInDiv"), { theme: "outline", size: "large" }
  //     );
  // }, [])


 


  async function handleSubmit(e) {
    e.preventDefault();
    setwait(true)

    console.log(googleDetails)
    console.log(googleSignIn)

    if (googleSignIn) {
      // alert("chanda bhi diwana hai tera")
      dispatch(signup_oauth_verify(googleDetails.name, googleDetails.email, credentials.username))


    } else {

      const { _name, _email, password, username, _confirmPass, } = credentials;


      let email = _email.toLowerCase()
      let checkemail = email.match(/\s/g)
      let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (email.match(regexEmail)) {
        console.log(" ")
      } else {
        setwait(false)
        return toast.error('Invalid Email', {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      }


      console.log(checkemail)

      if (checkemail) {
        setwait(false)

        return (
          toast.warn('Email cannot contain spaces', {
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


      let _nametouppercase = _name.toUpperCase()
      let withoutspacename = _nametouppercase.replace(/\s\s+/g, ' ')
      if (withoutspacename.length < 3) {
        setwait(false)

        return (
          toast.error('Enter your full name', {
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
      console.log(withoutspacename.length)

      let checkpass = password.match(/\s/g)
      if (checkpass) {
        setwait(false)

        return (
          toast.warn('Password cannot contain spaces', {
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

      if (password.length < 8) {
        setwait(false)
        return toast.warn('Password should be atleast 8 characters long', {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })

      }


      console.log(password)
      console.log(_confirmPass)

      // if (_confirmPass !== password) {
      //     toast.error('Passwords do not match', {
      //         position: "top-center",
      //         autoClose: 3000,
      //         hideProgressBar: false,
      //         closeOnClick: true,
      //         pauseOnHover: true,
      //         draggable: true,
      //         progress: undefined,
      //     });
      // }



      var expr = /^[a-zA-Z0-9._]*$/;
      if (!expr.test(username)) {
        setwait(false)

        return (
          toast.warn('Username can only contain Alphabets, Numbers, Dots and Underscores', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          })
        )


      }

      if (username.length < 1) {
        setwait(false)

        return toast.error('Invalid Username', {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })

      }

      let name = withoutspacename

      console.log(name)
      console.log(email)

      // console.log(birthDate)
      // console.log(username)


      setmail(email)
      dispatch(signUp(name, email, password, username.toLowerCase()))
    }

  }

  const gotologin = () => {
    // navigate('/login')
  }



  const signUp = (name, email, password, username) => async dispatch => {
    console.log(username)
    try {
      const response = await fetch(`${host}/api/auth/createuser`, {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password, username })
      });
      const json = await response.json();
      console.log('k', json)

      if (json.success) {
        // setmailmessage(true)
        setshow(false)
        localStorage.setItem('utoken', json.accessToken)
        // navigate(`/${json.user.username}`)
        console.log(' successsssssssssssss')

        dispatch({
          type: GET_USER_DETAILS,
          payload: {
            name: json.user.name,
            profileImg: json.user.profileImg,
            username: json.user.username,
            about: json.user.about,
            _id: json.user._id,
            ratings: json.user.ratings,
            accountType: json.user.accountType,
            notificationToken: json.user.notificationToken,
            notificationSettings: json.user.notificationSettings,
            notificationCount: json.user.notificationCount,
            links: json.user.links,
            totalRating: json.user.totalRating,
            avgRating: json.user.avgRating,

          }
        })
      }
      else if (json.error === "email_exists") {
        setwait(false)

        return toast.error('Account with this Email Already Exists', {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })

      }
      else if (json.error === "username_exists") {
        setwait(false)

        return toast.error('Username Taken 🙁 Please try other username', {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })

      }
      console.log('k')



    } catch (error) {
      setwait(false)
      console.log(error)
      return toast.warn('Oops Something went wrong', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })

    }
  }


  const [showCont, setshowCont] = useState(true)
  const [usernameavailable, setusernameavailable] = useState(null)
  useEffect(() => {
    let timerout = setTimeout(() => {
      let x = credentials.username.replace(/\s\s+/g, ' ')
      if (x.length > 0) {
        setshowCont(false)
        dispatch(usernameCheck())
        console.log("HERE")
      }
    }, 1000);
    return () => clearTimeout(timerout)
  }, [credentials.username])

  const onchangeUsername = (e) => {
    setusernameavailable(null)
    setcredentials({ ...credentials, [e.target.name]: e.target.value })
  }


  const usernameCheck = (name, email, password, username) => async dispatch => {
    const response = await fetch(`${host}/api/auth/usernameCheck`, {
      method: 'PUT',

      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username: credentials.username })
    });
    const json = await response.json();
    console.log('k', json)
    if (json.message == "congrats") {
      setusernameavailable(true)
      setshowCont(true)
    } else if (json.message == "username_exists") {
      setusernameavailable(false)
      setshowCont(true)
    }
  }


  const signup_oauth_verify = (name, email, username) => async dispatch => {
    console.log(username)
    try {
      const response = await fetch(`${host}/api/auth/signup-oauth-verify`, {
        method: 'PUT',

        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, username })
      });
      const json = await response.json();
      console.log('k', json)

      if (json.message == "email_exists") {
        dispatch({
          type: GET_USER_DETAILS,
          payload: {
            name: json.details.name,
            profileImg: json.details.profileImg,
            username: json.details.username,
            about: json.details.about,
            _id: json.details._id,
            ratings: json.details.ratings,
            accountType: json.details.accountType,
            notificationToken: json.details.notificationToken,
            notificationSettings: json.details.notificationSettings,
            notificationCount: json.details.notificationCount,
            links: json.details.links,
            totalRating: json.details.totalRating,
            avgRating: json.details.avgRating,
            profileVisits: json.details.profileVisits,
            uniqueProfileVisits: json.details.uniqueProfileVisits,
            referrers: json.details.referrers,
            totalLinkClicks: json.details.totalLinkClicks,
            darkModeProfile: json.details.darkModeProfile
          }
        })
        localStorage.setItem("utoken", json.accessToken);

        // navigate("/")
      } else if (json.message == "new_user") {

        setshow(false)
        setgetusername(true)
      }





    } catch (error) {
      setwait(false)
      console.log(error)
      return toast.warn('Oops Something went wrong', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })

    }
  }
  const signup_oauth = () => async dispatch => {
    try {
      const response = await fetch(`${host}/api/auth/signup-oauth`, {
        method: 'PUT',

        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: googleDetails.name, email: googleDetails.email,
          username: credentials.username.toLowerCase()
        })
      });
      const json = await response.json();
      console.log('k', json)

      if (json.message == "success") {
        dispatch({
          type: GET_USER_DETAILS,
          payload: {
            name: json.details.name,
            profileImg: json.details.profileImg,
            username: json.details.username,
            about: json.details.about,
            _id: json.details._id,
            ratings: json.details.ratings,
            accountType: json.details.accountType,
            notificationToken: json.details.notificationToken,
            notificationSettings: json.details.notificationSettings,
            notificationCount: json.details.notificationCount,
            links: json.details.links,
            totalRating: json.details.totalRating,
            avgRating: json.details.avgRating,
            profileVisits: json.details.profileVisits,
            uniqueProfileVisits: json.details.uniqueProfileVisits,
            referrers: json.details.referrers,
            totalLinkClicks: json.details.totalLinkClicks,
            darkModeProfile: json.details.darkModeProfile
          }
        })
        localStorage.setItem("utoken", json.accessToken);

        // navigate(`/${json.details.username}`)
      } else if (json.message == "new_user") {

        setshow(false)
        setgetusername(true)
      }





    } catch (error) {
      setwait(false)
      console.log(error)
      return toast.warn('Oops Something went wrong', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })

    }
  }


  return (
    <>
      <ToastContainer />

      {
        getusername ?
          <>
            <div className='signupdiv' style={{ height: "100vh", alignItems: "center" }} >
              <div className='supsubdiv'  >
                <div style={{ display: "flex", justifyContent: "center", marginBottom: "1rem" }} >
                  <img alt="img" src="/u.png" style={{ width: '5rem', marginRight: "1rem" }} />
                </div>
                <h5>Lets create a username for {googleDetails.name}</h5>
                <div className="mb-3" style={{ display: "flex", justifyContent: "center", marginBottom: "1rem" }}>

                  <input placeholder='Unique username' maxLength={30} onChange={onchangeUsername} type="text" required className="form-control" id="username" name="username" aria-describedby="username" style={{ textTransform: 'lowercase' }} />
                  {
                    usernameavailable ?
                      <AiFillCheckCircle color='green' size={40} />
                      : usernameavailable == false ?
                        <MdCancel color='red' size={40} /> : ''
                  }


                </div>

                <div style={{ display: 'flex', justifyContent: 'center' }} >
                  {
                    showCont ?
                      <button onClick={() => {
                        dispatch(signup_oauth())
                      }
                      } ref={sbmt} type="submit/" className="btn btn-primary" >Continue</button> : <>
                        <div style={{ textAlign: "center", width: "100%", padding: 0, display: "flex", justifyContent: "center", height: "50px" }} >
                          <Spinner animation="border" color='orange' style={{ color: "orange" }} />
                        </div>
                      </>
                  }
                </div>
              </div>
            </div>
          </> : ''
      }


      {
        show ?
          <div className='signupdiv' >
            <div className='supsubdiv'  >

              <div style={{ display: 'flex', justifyContent: 'flex-end' }} >
                <button onClick={gotologin} type="submit/" className="btn btn-success" style={{}} disabled={wait ? true : false} >Login instead</button>
              </div>
              <div style={{ display: "flex", alignItems: "center", marginBottom: "1rem" }} >
                <img alt="img" src="/u.png" style={{ width: '5rem', marginRight: "1rem" }} />

                <h1 style={{ color: "dodgerblue", marginBottom: "0rem" }} >Sign Up</h1>
              </div>

              <div onClick={() => {
                console.log("ksjflkajlsk")
                // setgoogleSignIn(true)
              }} id="signInDiv" style={{ display: "flex", justifyContent: "center", margin: "1rem 0", width: "100%" }} >
                <GoogleLogin


                  onSuccess={credentialResponse => {
                    var a = jwt_decode(credentialResponse.credential)
                    console.log(a);
                    setgoogleSignIn(true)
                    setgoogleDetails(a)
                    sbmt.current.click()
                  }}
                  onError={() => {
                    console.log('Login Failed');
                  }}
                // useOneTap
                />
              </div>


              <div className="mb-3">
                <label style={{ color: 'black' }} htmlFor="_name" className="form-label" maxLength={50}>Name</label>
                <input placeholder='Full Name' maxLength={50} required onChange={onchange} type="text" className="form-control" id="_name" name="_name" aria-describedby="name" style={{ textTransform: 'uppercase' }} />
              </div>


              <div className="mb-3">
                <label style={{ color: 'black' }} htmlFor="username" className="form-label"><FaRegUser size={20} /> Username</label>
                <input placeholder='Unique username' maxLength={30} onChange={onchangeUsername} type="text" required className="form-control" id="username" name="username" aria-describedby="username" style={{ textTransform: 'lowercase' }} />
              </div>

              <div className="mb-3">
                <label style={{ color: 'black' }} htmlFor="email" className="form-label"> <AiOutlineMail size={20} />   Email address</label>
                <input placeholder='Your email address here' onChange={onchange} required type="email" className="form-control" id="_email" name="_email" aria-describedby="emailHelp" style={{ textTransform: 'lowercase' }} />
                {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
              </div>

              <div className="mb-3">
                <label style={{ color: 'black' }} htmlFor="password" className="form-label"><MdOutlineLock size={20} /> Password</label>
                <input maxLength={30} placeholder='Enter a strong password' onChange={onchange} type="password" className="form-control" id="password" name="password" minLength={8} required />
              </div>





              <div style={{ display: 'flex', justifyContent: 'center' }} >
                <button ref={sbmt} type="submit/" onClick={handleSubmit} className="btn btn-primary" disabled={wait ? true : false} >Submit</button>
              </div>

              {/* <pwa-auth
                                appearance="list"
                                googlekey="87939184502-dvrtpsvn23tj3comolg0hcm6r8trqqvd.apps.googleusercontent.com" >

                            </pwa-auth> */}



              <div style={{ color: "gray", fontSize: "14px", marginTop: "1rem" }} >
                <div>Already have an account?</div>
                <button onClick={gotologin} style={{ border: "1px solid gray", padding: "0.25rem 0.5rem", borderRadius: "1rem" }} >Login Now</button>
              </div>





            </div>

          </div>
          :
          ""
        // <div style={{ textAlign: "center", width: "100%", padding: 0, display: "flex", justifyContent: "center", height: "50px" }} >
        //     <Spinner animation="border" color='orange' style={{ color: "orange" }} />
        // </div>
      }


      {
        mailmessage ?
          <>

            <div className='mailmsgDiv'  >

              <div className='mailsub' >
                <img alt="img" src="/star-removebg-preview.png" style={{ height: '5rem', width: '5rem', margin: "auto", marginBottom: "1rem" }} />
                <h3 style={{ color: "indigo", marginBottom: "1rem", textAlign: 'center' }} >We have sent you a mail on
                  {mail && mail.length > 0 ? " " + mail : ' your registered email address'} to confirm if its you.  </h3>
              </div>

            </div>
          </>
          : ""
      }



    </>
  )
}

export default Signup
