import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Navbar from '../../../components/Navbar'
import Head from 'next/head'
import Visacard from '../../../components/Visacard'
import VisaPage from '../../../components/VisaPage'
const DesertSafari = ({ url }) => {
  const [visaData, setVisaData] = useState();
  const fetchVisa = async (url) => {
    try {
      const response = await fetch("/api/visa/fetchone", {
        method: 'POST',
        body: JSON.stringify({ url: url })
      });
      const responseData = await response.json();
      console.log(responseData)
      setVisaData(responseData.visa)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchVisa(url);
  }, [])
  return (
    <>
      <Head>
        <title>Al Atwal - {url}</title>
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
      {
        visaData && <VisaPage data={visaData}/>
      }
      {
        visaData && console.log(visaData)
      }

    </>
  )
}

export default DesertSafari
export async function getServerSideProps(context) {
  const { slag } = context.params;
  console.log(slag)
  console.log(slag)
  return {
    props: {
      url: slag
    }, // will be passed to the page component as props
  }
}