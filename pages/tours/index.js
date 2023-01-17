import React, { useState, useEffect } from 'react'
import Navbar from '../../components/Navbar'
import Link from 'next/link'
import Head from 'next/head'
const Tours = () => {
    const [serviceData, setServiceData] = useState([])// tour/burj-khalifa
    const fetchService = async () => {
        const response = await fetch("/api/category/typefetch", {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ type: 'tour' })
        });
        const responseData = await response.json();
        setServiceData(responseData.category);
    }
    useEffect(() => {
        fetchService();
    }, [])
    return (
        <>
        <Head>
                <title>Al Atwal - Tours!</title>
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
                {
                    serviceData && serviceData.length > 0 &&
                    serviceData.map((service, index) => {
                        return <div key={index} className="w-full md:w-1/3 px-4 mb-8">
                            <div className="bg-white rounded-lg shadow-lg hover:shadow-xl overflow-hidden">
                                <img src={service.image[1]} alt="Product 1" className="w-full h-48 object-cover hover:scale-105 duration-100" />
                                <div className="px-6 py-4">
                                    <Link href={`/tours/${service.url}`}><div className="font-bold text-xl mb-2 cursor-pointer hover:text-gray-700">{service.title}</div></Link>
                                    <p className="text-gray-700 text-base">
                                        {service.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    })
                }
            </div>

        </>
    )
}

export default Tours