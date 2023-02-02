import Head from 'next/head'
import Navbar from '../components/Navbar'
import '@animxyz/core'
import Service from '../components/Service'
import Testimonial from '../components/Testimonial'
import Footer from '../components/Footer'
import LandingPage from '../components/LandingPage'
export default function Home() {

  return (
    <>
      <Head>
        <title>Al Atwal - Best Partner in Your Travel Dairy!</title>
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
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        {/* <link rel="stylesheet" href="https://unpkg.com/flowbite@1.5.5/dist/flowbite.min.css" /> */}
        <script src="https://unpkg.com/flowbite@1.5.5/dist/flowbite.js" async></script>
        
      </Head>
      <Navbar />
      <LandingPage />
      <Service />
      <Testimonial />
      <Footer />
    </>
  )
}
