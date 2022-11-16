
import "../styles/globals.css";
import { wrapper, store } from "../store";
import { Provider, useDispatch } from "react-redux";
import 'bootstrap/dist/css/bootstrap.css'
import { GET_USER_DETAILS } from "../actionType";
import { host } from "../host";
import { useEffect } from "react";
import 'react-toastify/dist/ReactToastify.min.css';
import { GoogleOAuthProvider } from "@react-oauth/google";
function MyApp({ Component, pageProps }) {
  const dispatch = useDispatch()
  useEffect(() => {
    const utoken = localStorage.getItem('utoken')
    document.addEventListener('contextmenu', (e) => {
      e.preventDefault();
    });
    if (utoken) {
      dispatch(fetchUniqueUser(utoken))
    }


  }, [])

  const fetchUniqueUser = (utoken) => async dispatch => {
    console.log("paradiese")
    const response = await fetch(`${host}/api/fetchuniqueuser`, {
      // const response = await fetch('https://keepitupp.herokuapp.com/api/auth/fetchuniqueser', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ utoken }),
    });
    const json = await response.json();
    console.log(json.fetchuniqueser)


    dispatch({
      type: GET_USER_DETAILS,
      payload: {
        name: json.fetchuniqueser.name,
        profileImg: json.fetchuniqueser.profileImg,
        username: json.fetchuniqueser.username,
        about: json.fetchuniqueser.about,
        _id: json.fetchuniqueser._id,
        ratings: json.fetchuniqueser.ratings,
        accountType: json.fetchuniqueser.accountType,
        notificationToken: json.fetchuniqueser.notificationToken,
        notificationSettings: json.fetchuniqueser.notificationSettings,
        notificationCount: json.fetchuniqueser.notificationCount,
        links: json.fetchuniqueser.links,
        totalRating: json.fetchuniqueser.totalRating,
        avgRating: json.fetchuniqueser.avgRating,
        profileVisits: json.fetchuniqueser.profileVisits,
        uniqueProfileVisits: json.fetchuniqueser.uniqueProfileVisits,
        referrers: json.fetchuniqueser.referrers,
        totalLinkClicks: json.fetchuniqueser.totalLinkClicks,
        darkModeProfile: json.fetchuniqueser.darkModeProfile

      }
    })

  }
  return (

    <>
      <GoogleOAuthProvider clientId="87939184502-dvrtpsvn23tj3comolg0hcm6r8trqqvd.apps.googleusercontent.com">
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </GoogleOAuthProvider>
    </>
  );
}

export default wrapper.withRedux(MyApp);
