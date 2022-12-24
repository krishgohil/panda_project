import Router, { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';


const CategoriesBar = ({ extra, sethomeScroll }) => {
    const { displayDarkMode } = useSelector(state => state.feed)

    const [darkMode, setdarkMode] = useState(false)

    useEffect(() => {
        setdarkMode(displayDarkMode)
    }, [displayDarkMode])
    const keywords = [
        'Countries',
        'Places',
        'Colleges',
        'Restaurants',
        'Companies',
        'Books',
        'Hotels',
        'Sports',
        'Shows',
        'Stocks',
        'Books',
        'Youtube',
    ]

    const [activeElement, setActiveElement] = useState('All')
    const router = useRouter()
    const goto = (value) => {
        const link = value.toLowerCase()
        router.push(`/${link}`)
    }


    return (
        <div className='categoriesBar' style={darkMode ? { backgroundColor: "black" } : { backgroundColor: 'white' }} id='content' >

            {
                keywords.map((value, i) => (

                    <div
                        // to={`/upp/${value}`.toLowerCase()}
                        // to={'/upp'value.toLowerCase()} 
                        onClick={() => goto(value)}
                        style={darkMode ? { textDecoration: 'none', color: 'white', backgroundColor: "black" } : { textDecoration: 'none', color: 'black', backgroundColor: "whitesmoke" }} key={i} className={darkMode ? "too":"too_dm"} >
                        {value}
                    </div>
                ))
            }
        </div >
    )
}

export default CategoriesBar