import Head from 'next/head'
import { useEffect } from 'react'
import Image from 'next/image'
import Script from 'next/script'
import Navbar from '../components/Navbar'
import '@animxyz/core'
import Service from '../components/Service'
import LandingPage from '../components/LandingPage'
import Testimonial from '../components/Testimonial'
import Tour from '../components/Tour'
import Footer from '../components/Footer'
export default function Home() {
  
  return (
    <>
      <Head>
        <title>Tourism</title>
        <meta name="description" content="A Tourism and Visa Website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        {/* <link rel="stylesheet" href="https://unpkg.com/flowbite@1.5.5/dist/flowbite.min.css" /> */}
        <script src="https://unpkg.com/flowbite@1.5.5/dist/flowbite.js" async></script>
      </Head>
      <Navbar />
      <LandingPage/>
      <Service />
      <Testimonial/>
      <Footer/>
    </>
  )
}
