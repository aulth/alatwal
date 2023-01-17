import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Navbar from '../../../components/Navbar'
import Head from 'next/head'
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
        <Head>
                <title>Al Atwal - {service}</title>
                <meta name="title" content="Al Atwal - Best Partner in Your Travel Dairy!"/>
                    <meta name="description" content="Up and running, Alatwal Travel & Tourism is one stop solution for all your travel needs. We are a destination management company based in UAE offering the best of UAE tours, UEA Visa services and International Visa services." />
                    {/* <!-- Open Graph / Facebook --> */}
                    <meta property="og:type" content="website" />
                    <meta property="og:url" content="https://tourism-zeta.vercel.app" />
                    <meta property="og:title" content="Al Atwal - Best Partner in Your Travel Dairy!" />
                    <meta property="og:description" content="Up and running, Alatwal Travel & Tourism is one stop solution for all your travel needs. We are a destination management company based in UAE offering the best of UAE tours, UEA Visa services and International Visa services." />
                    <meta property="og:image" content="https://tourism-zeta.vercel.app/logo.png" />

                    {/* <!-- Twitter --> */}
                    <meta property="twitter:card" content="summary_large_image" />
                    <meta property="twitter:url" content="https://tourism-zeta.vercel.app/" />
                    <meta property="twitter:title" content="Al Atwal - Best Partner in Your Travel Dairy!" />
                    <meta property="twitter:description" content="Up and running, Alatwal Travel & Tourism is one stop solution for all your travel needs. We are a destination management company based in UAE offering the best of UAE tours, UEA Visa services and International Visa services." />
                    <meta property="twitter:image" content="https://tourism-zeta.vercel.app/logo.png" />
            </Head>
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