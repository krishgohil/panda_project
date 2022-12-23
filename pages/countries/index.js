import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import styles from '../../styles/Home.module.css'

const Countries = () => {
    const [countries, setcountries] = useState([])
    const { displayDarkMode } = useSelector(state => state.feed)
    const [darkMode, setdarkMode] = useState(false)
    const router = useRouter()

    async function getCountries() {

        const response = await fetch(`https://restcountries.com/v3.1/all`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const json = await response.json();
        // console.log(json)

        // for (let i = 0; i < json.length; i++) {

        //     console.log(json[i].name.common)
        //     console.log(json[i].name.official)
        //     console.log(json[i].flags.svg)
        //     console.log(json[i].population)
        //     console.log("")



        // }


        let sortit = json.sort(function (a, b) {
            return (a.population < b.population) ? 1 : ((a.population > b.population) ? -1 : 0);
        });

        console.log(sortit)
        setcountries(sortit)
    }


    useEffect(() => {

        getCountries()
    }, [])
    useEffect(() => {


        // console.log(displayDarkMode, "ok", darkMode)
        setdarkMode(displayDarkMode)
    }, [displayDarkMode])


    return (
        <>
            <Container fluid className={darkMode ? styles.app__main_dm : styles.app__main}>

                <Row className={styles.cardMainRow} style={{ margin: '0', display: "flex" }}  >




                    {
                        countries.map((peep, i) =>
                            <Col
                                onClick={() => {
                                    router.push(`/countries/${peep.name.common}`)
                                }}
                                className={styles.row}
                                lg={3} md={4} xs={6} key={i} style={{ margin: "0.5rem 0", padding: "0.5rem", borderRadius: "1rem", }}   >
                                <Link scroll={false} href={`/countries/${peep.name.common}`} style={{ textDecoration: "none", color: 'inherit', height: "100%", width: "100%" }} >
                                    <div className={darkMode ? styles.linkCard_dm : styles.linkCard} style={{ height: "100%", width: "100%" }}  >
                                        {/* <div className={styles.imgupdiv} style={darkMode ? { display: "flex", justifyContent: "center", borderRadius: " 0", backgroundColor: "rgb(70,70,70)" } : { display: "flex", justifyContent: "center", borderRadius: " 0", backgroundColor: "rgb(214,214,214)" }} >
                                            <img className={styles.img} src={peep.flags.svg} alt="" style={{ borderRadius: 0, }} />
                                        </div> */}
                                        <div className={styles.imgupdiv} style={darkMode ? { display: "flex", justifyContent: "center", borderRadius: " 0", backgroundColor: "rgb(70,70,70)" } : { display: "flex", justifyContent: "center", borderRadius: " 0", backgroundColor: "rgb(214,214,214)" }} >
                                            <img className={styles.img} src={peep.flags.svg} alt="" style={{ borderRadius: 0, width: "100%"}} />
                                        </div>

                                        <div style={{ padding: "0.5rem" }} >

                                            <div style={{ display: "flex" }} >
                                                <p style={{ textAlign: "center", width: "100%", fontSize: "14px", marginBottom: "0.5rem" }} ><b>{peep.name.common}</b></p>
                                                {/* <h6>Entrepreneur</h6> */}
                                            </div>

                                        </div>
                                    </div>
                                </Link>



                            </Col>

                        )
                    }





                </Row>
            </Container>
        </>
    )
}

export default Countries