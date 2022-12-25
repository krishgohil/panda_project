import React, { useEffect, useState } from 'react'
import { Container, Row, Spinner } from 'react-bootstrap'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useAppContext, useFeedContext } from '../context'
import styles from '../styles/Home.module.css'

const PostsLayout = ({ length, children, fetchNew }) => {
    const context = useAppContext()
    const context_feed = useFeedContext()
    const [addItem, setaddItem] = useState(false)

    const { _id, username, profileImg } = context.sharedState
    const { displayDarkMode } = context_feed.feedstate
    const [darkMode, setdarkMode] = useState(false)

    useEffect(() => {
        setdarkMode(displayDarkMode)
    }, [displayDarkMode])
    return (
        <>
            <Container fluid className={darkMode ? "app__main_dm":"app__main"}>

                <Row className={styles.cardMainRow} style={{ margin: '0', display: "flex" }}  >

                    <InfiniteScroll

                        id='myHeader'
                        dataLength={length}
                        next={fetchNew}
                        hasMore={true}
                        className='row'

                        loader={

                            <div style={{ textAlign: "center", width: "100%", padding: 0, display: "flex", justifyContent: "center", height: "50px" }} >
                                <Spinner animation="border" color='orange' style={{ color: "orange" }} />
                            </div>
                        }
                        style={{ padding: 0, margin: 0, display: "flex", justifyContent: "center", }}
                    >

                        {children}

                    </InfiniteScroll>

                </Row>
            </Container>
        </>
    )
}

export default PostsLayout