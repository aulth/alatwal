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
