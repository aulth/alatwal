import React from 'react'
import Navbar from '../components/Navbar'
import Head from 'next/head'
const About = () => {
    return (
        <>
            <Head>
                <title>AlAtwal - About</title>
                <meta name="title" content="Al Atwal - Best Partner in Your Travel Dairy!" />
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
            <div className="w-full h-40 flex justify-center items-center mt-2 bg-gradient-to-r from-[#FF4066] to-[#FFF16A]">
                <h2 className="font-semibold md:text-5xl text-3xl text-white">About</h2>
            </div>
            <div className="w-full flex flex-col justify-center p-4 ">
                <div className="w-full flex lg:flex-row flex-col border border-gray-300 ">
                    <div className="w-full lg:w-1/2  ">
                        <img src="http://alatwal.com/images/dubaitours.jpg" className='w-full object-cover overflow-hidden' alt="" />
                    </div>
                    <div className="w-full lg:w-1/2   p-4 md:p-8 md:pb-4">
                        <h2 className="font-semibold text-xl md:text-2xl">ALATWAL TRAVEL & TOURISM</h2>
                        <p className='text-lg mt-1'>Up and running, Alatwal Travel & Tourism is one stop solution for all your travel needs. We are a destination management company based in UAE offering the best of local tours for your leisure while in UAE. We provide you the guidance for best local activities complemented with best price offer thourgh the direct sale aggrement with the organizer. Conveninet and hassle free dealing with 24x7 customer support that will gurantee your full satisfaction and a reason for our rocommendation to others. Travel desk, B2B, B2C, international holidays, UAE visas, flight services, coorporate services are some of our accomplished and known services.</p>
                        <button className='bg-orange-400 hover:bg-orange-500 duration-75 mt-2 rounded text-black px-4 py-2'>Get Started</button>
                    </div>
                </div>
                <div className="w-full flex lg:flex-row flex-col  mt-4">
                    <div className="w-full flex md:flex-row flex-col   border border-gray-300 my-2">
                        <div className="w-full md:w-1/2  h-[22rem]">
                            <img src="http://alatwal.com/images/dubaivisa.jpg" className='w-full object-cover overflow-hidden h-[22rem]' alt="" />
                        </div>
                        <div className="w-full md:w-1/2   p-2 md:p-4 md:pb-2">
                            <h2 className="font-semibold text-xl md:text-2xl">Our Mission</h2>
                            <p className='text-lg mt-1'>To offer exceptional and diversified services provided by our talented manpower through our advanced systems and global partnerships, while ensuring the highest standards at all levels and at the most competitive rates.</p>
                        </div>
                    </div>
                    <div className="w-full flex md:flex-row flex-col  border border-gray-300  my-2">
                        <div className="w-full md:w-1/2 h-[22rem]">
                            <img src="http://alatwal.com/images/safari.jpg" className='w-full object-cover overflow-hidden h-[22rem]' alt="" />
                        </div>
                        <div className="w-full md:w-1/2  p-2 md:p-4 md:pb-2">
                            <h2 className="font-semibold text-xl md:text-2xl">Our Vision</h2>
                            <p className='text-lg mt-1'>To be the preferred brand that provides the ultimate in reliable and innovative travel and tourism solutions. Focus, respect, care, and a genuine understanding of their needs: these are the keys to client satisfaction and happiness.</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default About