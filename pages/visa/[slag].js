import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Navbar from '../../components/Navbar'
import Tourcard from '../../components/Tourcard'
import Tourpage from '../../components/Tourpage'
import Head from 'next/head'
import Visacard from '../../components/Visacard'
const DesertSafari = ({ categoryUrl }) => {
  const [visaData, setVisaData] = useState();
  const fetchVisa = async (type) => {
    try {
      const response = await fetch("/api/visa/typefetch", {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({ url: categoryUrl })
      });
      const responseData = await response.json();
      console.log(responseData)
      setVisaData(responseData.visa)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchVisa(categoryUrl);
  }, [])
  return (
    <>
      <Head>
        <title>Al Atwal - {categoryUrl}</title>
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
      <div className="w-full h-56 overflow-hidden relative">
        <img src="https://source.unsplash.com/random/?uae-visa" className='object-cover object-center w-full ' alt="" />
        <div className="w-full absolute top-0 h-56 flex justify-center items-center">
          <h3 className="md:text-5xl text-3xl font-bold font-[helvetica] text-white drop-shadow  text-center">{categoryUrl=='uae-visa'?'UAE Visa':'International Visa'}</h3>
        </div>
      </div>
      <div className="w-full flex flex-wrap m-auto p-2 box-border">
        {
          visaData && visaData.map((data, index) => {
            return [<Visacard key={index} data={data} />]
          })
        }
      </div>

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
      categoryUrl: slag
    }, // will be passed to the page component as props
  }
}