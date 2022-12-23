import Router, { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';


const CategoriesBar = ({ extra,sethomeScroll }) => {
    useEffect(() => {
        let el = document.getElementById("content")
        el.scrollLeft = el.scrollWidth;
    }, [extra])


    const keywords = [
        'Countries',
        'Fun',
        'News',
        'Science-Tech',
        'Crypto',
        'Sports',
        'Movies',
        'Stocks',
        'Books',
        'Destress',
        'Youtube',
    ]

    const [activeElement, setActiveElement] = useState('All')
    const router = useRouter()
    const goto = (value) => {
        const link = value.toLowerCase()
        router.push(`/${link}`)
    }


    return (
        <div className='categoriesBar' id='content' >

            {
                keywords.map((value, i) => (

                    <div
                        // to={`/upp/${value}`.toLowerCase()}
                        // to={'/upp'value.toLowerCase()} 
                        onClick={() => goto(value)}
                        style={  { textDecoration: 'none', color: 'black',backgroundColor:"whitesmoke" }} key={i} className='too' >
                        {value}
                    </div>
                ))
            }
        </div >
    )
}

export default CategoriesBar