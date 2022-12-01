import Header from '../components/Header'
import React, { useRef, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import styles from '../styles/Home.module.css'

const admin = () => {

    const [contentArr, setcontentArr] = useState([])
    const [tempContent, settempContent] = useState({ tag: "", text: "", img: "", imgAlt: "" })
    const [modalShow, setmodalShow] = useState(false)

    const [title, settitle] = useState('')
    const [thumbnail, setthumbnail] = useState()

    const [preview, setpreview] = useState(false)
    const ref = useRef()
    return (
        <div>
            <Header ></Header>

            {
                !preview ?
                    <div style={{ width: "90%", margin: 'auto' }} >
                        <h3 onClick={() => { setpreview(true) }} >Preview</h3>
                        <div>
                            <Form.Control onChange={(e) => { settitle(e.target.value) }} type="email" placeholder="Enter blog title " />
                        </div>


                        <input type="file" name="" id="" onChange={((e) => { setthumbnail(e.target.files[0]) })} />

                        <div>
                            <button onClick={() => { setmodalShow(true) }} >Add new</button>
                            on click on add new open a modal thats shows option to add content like p, video, code, h1,h2,h3,h4,h5,h6,picture
                        </div>
                        <button onClick={(e) => {
                            console.log(e.target.innerText, tempContent, title)
                            settempContent({ ...tempContent, tag: e.target.innerText })
                        }} style={{ border: "1px solid black", padding: "0.5rem", margin: "0.5rem" }}>p</button>
                        <button onClick={(e) => {
                            console.log(e.target.innerText, tempContent)
                            settempContent({ ...tempContent, tag: e.target.innerText })
                        }} style={{ border: "1px solid black", padding: "0.5rem", margin: "0.5rem" }}>h1</button>
                        <button onClick={(e) => {
                            console.log(e.target.innerText, tempContent)
                            settempContent({ ...tempContent, tag: e.target.innerText })
                        }} style={{ border: "1px solid black", padding: "0.5rem", margin: "0.5rem" }}>h2</button>
                        <button onClick={(e) => {
                            console.log(e.target.innerText, tempContent)
                            settempContent({ ...tempContent, tag: e.target.innerText })
                        }} style={{ border: "1px solid black", padding: "0.5rem", margin: "0.5rem" }}>h3</button>
                        <button onClick={(e) => {
                            console.log(e.target.innerText, tempContent)
                            settempContent({ ...tempContent, tag: e.target.innerText })
                        }} style={{ border: "1px solid black", padding: "0.5rem", margin: "0.5rem" }}>h4</button>
                        <button onClick={(e) => {
                            console.log(e.target.innerText, tempContent)
                            settempContent({ ...tempContent, tag: e.target.innerText })
                        }} style={{ border: "1px solid black", padding: "0.5rem", margin: "0.5rem" }}>h5</button>
                        <button onClick={(e) => {
                            console.log(e.target.innerText, tempContent)
                            settempContent({ ...tempContent, tag: e.target.innerText })
                        }} style={{ border: "1px solid black", padding: "0.5rem", margin: "0.5rem" }}>h6</button>
                        <button onClick={(e) => {
                            console.log(e.target.innerText, tempContent)
                            settempContent({ ...tempContent, tag: e.target.innerText })
                        }} style={{ border: "1px solid black", padding: "0.5rem", margin: "0.5rem" }}>video</button>
                        <button onClick={(e) => {
                            ref.current.click()
                        }} style={{ border: "1px solid black", padding: "0.5rem", margin: "0.5rem" }}>img</button>



                        <input onChange={(e) => settempContent({ ...tempContent, img: e.target.files[0] })} ref={ref} type="file" style={{ display: "none" }} />

                        <div style={{ border: "1px solid black", padding: '0.5rem' }} >

                            <div style={{ display: "flex", justifyContent: "space-evenly" }} >

                                <h3>CURRENT</h3>
                                <button onClick={() => {
                                    settempContent({ tag: "", text: "", img: "", imgAlt: "" })
                                    setcontentArr([...contentArr, tempContent])

                                }} >DONE</button>
                            </div>

                            <div>
                                <h6>tag:</h6>
                                {tempContent.tag}
                            </div>
                            <div style={{ whiteSpace: 'pre-wrap', wordBreak: "break-word", }} >
                                <h6>text:</h6>{tempContent.text}
                            </div>

                            <div>
                                <h6>img:</h6>

                                {
                                    tempContent.img &&
                                    <img style={{ width: "50%", margin: 'auto' }} src={URL.createObjectURL(tempContent.img)} alt="" />
                                }


                                <h6>ImgAlt</h6>
                                <Form.Control type="text" onChange={(e) => { settempContent({ ...tempContent, imgAlt: e.target.value }) }} />
                            </div>



                            <Form.Control

                                onChange={(e) => settempContent({ ...tempContent, text: e.target.value })}
                                as="textarea"
                                placeholder="Content text"
                                style={{ resize: "none", border: "none", color: "black", backgroundColor: "inherit", borderTop: "1px solid gray" }}
                                rows={12}

                                value={tempContent.text}
                            />
                        </div>


                        <Modal
                            // {...props}
                            show={modalShow}
                            onHide={() => {
                                setmodalShow(false)
                            }
                            }
                            size="lg"
                            aria-labelledby="contained-modal-title-vcenter"
                            centered
                        // style={darkMode ? { color: "white" } : { color: "black" }}


                        >


                            <div style={{ padding: "0.5rem", }} >
                                <button style={{ border: "1px solid black", padding: "0.5rem", margin: "0.5rem" }}>p</button>
                                <button style={{ border: "1px solid black", padding: "0.5rem", margin: "0.5rem" }}>img</button>
                                <button style={{ border: "1px solid black", padding: "0.5rem", margin: "0.5rem" }}>h1</button>
                                <button style={{ border: "1px solid black", padding: "0.5rem", margin: "0.5rem" }}>h2</button>
                                <button style={{ border: "1px solid black", padding: "0.5rem", margin: "0.5rem" }}>h3</button>
                                <button style={{ border: "1px solid black", padding: "0.5rem", margin: "0.5rem" }}>h4</button>
                                <button style={{ border: "1px solid black", padding: "0.5rem", margin: "0.5rem" }}>h5</button>
                                <button style={{ border: "1px solid black", padding: "0.5rem", margin: "0.5rem" }}>h6</button>
                                <button style={{ border: "1px solid black", padding: "0.5rem", margin: "0.5rem" }}>video</button>
                            </div>


                            <Modal.Footer  >
                                <Button style={{ width: "100%" }}>Done</Button>
                            </Modal.Footer>
                        </Modal>
                    </div> :
                    <div className={styles.blogbg} style={{ height: "100vh", width: "100vw", overflowY: "scroll", scrollMargin: 0, }} >
                        <h3 onClick={() => { setpreview(false) }} >
                            Back
                        </h3>
                        <h1 style={{ width: "80%", margin: "1rem auto", }}>{title}

                        </h1>
                        <div style={{ width: "80%", margin: "1rem auto", display: "flex", justifyContent: "center" }} >
                            {
                                thumbnail &&
                                <img style={{ width: "50%", margin: 'auto' }} src={URL.createObjectURL(thumbnail)} alt="" />
                            }
                        </div>

                        {
                            contentArr.map(c => {
                                return (
                                    <div style={{ margin: 'auto', width: "80%", }} >
                                        <div style={{ width: "100%", display: "flex", justifyContent: "center" }} >
                                            {
                                                c.img &&
                                                <img style={{ width: "50%" }} src={URL.createObjectURL(c.img)} alt="" />
                                            }
                                        </div>

                                        <p style={{ width: "80%", margin: "1rem 0", whiteSpace: 'pre-wrap', wordBreak: "break-word", }} >
                                            {c.text}
                                        </p>
                                    </div>
                                )
                            })
                        }



                    </div>
            }

        </div>
    )
}

export default admin