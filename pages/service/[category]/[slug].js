import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Navbar from '../../../components/Navbar'
const Servicepage = ({ service, slug }) => {
    const [serviceData, setServiceData] = useState([])// tour/burj-khalifa
    const fetchService = async () => {
        const response = await fetch("/api/category/typefetch", {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ type: service.toLowerCase() })
        });
        const responseData = await response.json();
        setServiceData(responseData.category);
        console.log(responseData.category);
    }
    useEffect(() => {
        fetchService();
    }, [])

    return (
        <>
            <Navbar />
            <div className="flex flex-wrap mt-3">
                
            </div>

        </>
    )
}

export default Servicepage
export async function getServerSideProps(context) {
    const { category, slug } = context.params;
    console.log(category)
    console.log(slug)
    return {
        props: {
            service: category,
            slug: slug

        }, // will be passed to the page component as props
    }
}