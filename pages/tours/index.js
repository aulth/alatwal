import React, { useState, useEffect } from 'react'
import Navbar from '../../components/Navbar'
import Link from 'next/link'
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
            <Navbar />
            <div className="flex flex-wrap mt-3">
                {
                    serviceData && serviceData.length > 0 &&
                    serviceData.map((service, index) => {
                        return <div key={index} className="w-full md:w-1/3 px-4 mb-8">
                            <div className="bg-white rounded-lg shadow-lg hover:shadow-xl overflow-hidden">
                                <img src={service.image[0]} alt="Product 1" className="w-full h-48 object-cover hover:scale-105 duration-100" />
                                <div className="px-6 py-4">
                                    <Link href="/tours/desert-safari"><div className="font-bold text-xl mb-2 cursor-pointer hover:text-gray-700">{service.title}</div></Link>
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