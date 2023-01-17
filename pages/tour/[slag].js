import React, {useState, useEffect} from 'react'
import { useRouter } from 'next/router'
import Navbar from '../../components/Navbar'
import Tourcard from '../../components/Tourcard'
import Head from 'next/head'
import Tourpage from '../../components/Tourpage'
const DesertSafari = ({tourUrl}) => {
  const [tourData, setTourData] = useState()
  const [categoryInfo, setCategoryInfo] = useState({title:'', image:''})
    const fetchTour = async () => {
        try {
          const response = await fetch("/api/tour/fetchone", {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ url: tourUrl })
        });
        const responseData = await response.json();
        console.log(responseData)
        setTourData(responseData.tour);
        } catch (error) {
          console.log(error)
        }
    }
    useEffect(() => {
        fetchTour();
    }, [])
  return (
    <>
    <Head>
                <title>Al Atwal - {tourUrl}</title>
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
   {
     tourData && 
    <Tourpage data={tourData}/>
   }
   </>
  )
}

export default DesertSafari
export async function getServerSideProps(context) {
  const {slag} = context.params;
  console.log(slag)
  return {
    props: {
      tourUrl:slag
    }, // will be passed to the page component as props
  }
}