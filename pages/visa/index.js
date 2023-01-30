import React, { useState, useEffect } from 'react'
import Navbar from '../../components/Navbar'
import Link from 'next/link'
import Head from 'next/head'
const Tours = () => {
    const [serviceData, setServiceData] = useState([])// tour/burj-khalifa
    const [visaData, setVisaData] = useState([])
    const fetchVisa = async (visa = 'all') => {
        const response = await fetch("/api/visa/typefetch", {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({ url: visa })
        });
        const responseData = await response.json();
        if (responseData.success) {
            setVisaData(responseData.visa);
        } else {
            console.log(responseData.msg)
        }
    }
    const filterVisa = (visa) => {
        if (typeof window !== 'undefined') {
            for (let item of document.querySelectorAll(".visa-btn")) {
                item.classList.remove("text-white")
                item.classList.remove("bg-blue-400")
            }
            document.querySelector(`#${visa}-btn`).classList.add("text-white")
            document.querySelector(`#${visa}-btn`).classList.add("bg-blue-400")
        }
        fetchVisa(visa);
    }
    useEffect(() => {
        fetchVisa();
    }, [])
    return (
        <>
            <Head>
                <title>Al Atwal - Visa</title>
                <meta name="title" content="Al Atwal - Visa" />
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
            <div className="w-full h-56 overflow-hidden relative">
                <img src="https://source.unsplash.com/random/visa" className='object-cover object-center w-full ' alt="" />
                <div className="w-full absolute top-0 h-56 flex justify-center items-center">
                    <h3 className="md:text-5xl text-3xl font-bold font-[helvetica] text-white drop-shadow  text-center">Visa</h3>
                </div>
            </div>
            <div className="w-full flex justify-center items-center mt-3 px-3">
                <button onClick={() => { filterVisa('all') }} id='all-btn' className='w-1/3 bg-blue-400 text-white visa-btn border p-2 text-center rounded-l border-gray-300 font-semibold'>All Visa</button>
                <button onClick={() => { filterVisa('uae-visa') }} id='uae-visa-btn' className='w-1/3 visa-btn border-t border-b p-2 text-center border-gray-300 font-semibold'>UAE Visa</button>
                <button onClick={() => { filterVisa('international-visa') }} id='international-visa-btn' className='w-1/3 visa-btn border-t border-b border-r rounded-r p-2 text-center border-gray-300 font-semibold'>International Visa</button>
            </div>
            <div className="flex flex-wrap mt-3">
                {
                    visaData && visaData.length > 0 &&
                    visaData.map((service, index) => {
                        return <div key={index} className="w-full md:w-1/3 px-4 mb-8">
                            <div className="bg-white rounded-lg shadow-lg hover:shadow-xl overflow-hidden">
                                <img src={service.image[0]} alt="Product 1" className="w-full h-48 object-cover hover:scale-105 duration-100" />
                                <div className="px-6 py-4">
                                    <Link href={`/visa/explore/${service.url}`}><div className="font-bold text-xl mb-2 cursor-pointer hover:text-gray-700">{service.title}</div></Link>
                                    <p className="text-gray-700 text-base">
                                        {service.description.slice(0,128)}..
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