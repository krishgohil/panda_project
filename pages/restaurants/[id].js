import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useAppContext, useFeedContext } from '../../context'

import { host } from '../../host';
import SinglePost from '../../components/SinglePost';

const ReviewPost = (props) => {
  const { title, description, postimg } = props
  const context = useAppContext()
  const context_feed = useFeedContext()
  const router = useRouter()
  const { _id, username, profileImg } = context.sharedState
  const { displayDarkMode } = context_feed.feedstate
  const [darkMode, setdarkMode] = useState(false)
  useEffect(() => {
    console.log(props)
    setdarkMode(displayDarkMode)
  }, [displayDarkMode])

  return (
    <>
      <SinglePost title={title} description={description} postimg={postimg} ></SinglePost>
    </>
  )
}

export default ReviewPost


export async function getServerSideProps(context) {

  const response = await fetch(`${host}/api/post/fetchbyid`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ _id: context.params.id }),
  });
  const json = await response.json();
  console.log(json)
  console.log("json")

  return {
    props: json.result
  }

}
