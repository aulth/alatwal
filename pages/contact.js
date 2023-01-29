import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { BsMap } from 'react-icons/bs'
import { IoCallOutline } from 'react-icons/io5'
import { GiEarthAfricaEurope } from 'react-icons/gi'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Head from 'next/head'
import Spinner from './../components/Spinner'
import Footer from './../components/Footer'
const About = () => {
    const [contactData, setContactData] = useState({ name: '', email: '', subject: '', message: '' });
    const [loading, setLoading] = useState(false)
    const handleOnChange = (e) => {
        e.preventDefault();
        setContactData({ ...contactData, [e.target.name]: e.target.value });
    }
    const handleOnSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const response = await fetch('/api/email/sendcontactform', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({ data: contactData })
        })
        const json = await response.json();
        setLoading(false)
        if (json.success) {
            toast.success("Form submitted");
        } else {
            toast.error("Form Not submitted");
        }
        setContactData({ name: '', email: '', subject: '', message: '' });
    }
    return (
        <>
            <ToastContainer />
            <Head>
                <title>AlAtwal - Contact</title>
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
            <div className="w-full h-40 flex justify-center items-center mt-2 bg-gradient-to-r from-[#103ce7] to-[#64e9ff]">
                <h2 className="font-semibold md:text-5xl text-3xl text-white">Contact</h2>
            </div>
            <div className="w-fullflex flex-col justify-center p-4 ">
                <div className="w-full flex lg:flex-row flex-col border border-gray-300 ">
                    <div className="w-full lg:w-1/2  p-4">
                        <h2 className="font-semibold text-xl md:text-2xl my-2">Our Address</h2>
                        <p className='text-lg my-5'>You can found us at multiple hotel desks or at out work place.</p>
                        <div className='text-lg my-5 flex items-start'><BsMap /><p className='mx-1 -mt-1.5 '>Shop No. 06, Muhaisnah Shop Building, Muhaisnah 2-Dubai</p></div>
                        <div className='text-lg my-5 flex items-start'><IoCallOutline /><a href='tel:+971-42990852' className='mx-1 -mt-1 '>+971-42990852</a></div>
                        <div className='text-lg my-5 flex items-start'><IoCallOutline /><a href='tel:+971-589398039' className='mx-1 -mt-1 '>+971-589398039</a></div>
                        <div className='text-lg my-5 flex items-start'><GiEarthAfricaEurope /><a href='https://www.alatwal.com' className='mx-1 -mt-1 '>www.alatwal.com</a></div>
                    </div>
                    <form onSubmit={handleOnSubmit} className="w-full lg:w-1/2  p-4  md:border-none border-t border-gray-300 ">
                        <h2 className="text-center text-xl font-semibold">Get in Touch</h2>
                        <div className="mb-3">
                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                            <input type="text" id="name" value={contactData.name} name='name' onChange={handleOnChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Mohd Usman" required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                            <input type="email" id="email"  value={contactData.email}  name='email' onChange={handleOnChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="usman@gmail.com" required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="subject" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Subject</label>
                            <input type="text" id="subject"  value={contactData.subject}  name='subject' onChange={handleOnChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Tour Ticket" required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Message</label>
                            <textarea name='message'  value={contactData.message}  onChange={handleOnChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Message" required></textarea>
                        </div>
                        {
                            loading &&
                            <div className="flex justify-center"> <Spinner /></div>
                        }{
                            !loading &&
                            <button type="submit" className="text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit Form</button>
                        }
                    </form>
                </div>
            </div>
            <div className="w-full h-[26rem] flex justify-center items-center mt-2">
            <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14433.260655501066!2d55.4241387!3d25.2599814!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x6c394dafd7d14c0d!2sAlatwal%20Travel%20%26%20Tourism%20LLC!5e0!3m2!1sen!2sin!4v1675009151851!5m2!1sen!2sin" width="100%" height="100%" style={{border:0}} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>
            <Footer />
        </>
    )
}

export default About