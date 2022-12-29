
import "../styles/globals.css";
import 'bootstrap/dist/css/bootstrap.css'
import { useEffect, useState } from "react";
import 'react-toastify/dist/ReactToastify.min.css';
import { GoogleOAuthProvider } from "@react-oauth/google";
import "../styles/categoriesBar.css"
import "../styles/comments.css"
import '../styles/imageCropDialog.css'
import "../styles/post.css"
import 'swiper/css'
import 'swiper/swiper.min.css'
import 'swiper/css/pagination'
import Header from "../components/Header";
import CategoriesBar from "../components/CategoriesBar";
import { AuthWrapper, FeedWrapper } from "../context";
import Auth from '../components/Auth';
import { useRouter } from "next/router";
import { ToastContainer } from "react-toastify";
import SearchResults from "../components/SearchResults";

function MyApp({ Component, pageProps }) {

  const router = useRouter()



  const [show, setshow] = useState(false)

  useEffect(() => {

    if (router.query.profile === undefined || router.query.profile === "undefined") {
      // console.log("hereeeeeeeeeeeee")
      setshow(true)
    } else {
      // console.log("hereeeeeeeeeeeee")
      setshow(false)
    }
    // console.log(router.pathname)
  }, [router])

  // useEffect(() => {

  //   console.log(router.query.input)
  //   console.log(router.pathname)
  //   console.log(router.asPath)
  // }, [router.query.input])


 

  return (
    <GoogleOAuthProvider clientId="87939184502-dvrtpsvn23tj3comolg0hcm6r8trqqvd.apps.googleusercontent.com">
      <AuthWrapper>

        <FeedWrapper>
          <ToastContainer />
          <Auth></Auth>
          {
            show ?
              <>
                <Header></Header>

                {
                  router.pathname == "/search/[input]" ?
                    <SearchResults></SearchResults>
                    : ""
                }


                  <CategoriesBar />
              </>

              : ""
          }

          <Component {...pageProps} />
        </FeedWrapper>
      </AuthWrapper>
    </GoogleOAuthProvider>


  )
}

export default MyApp
