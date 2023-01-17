import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Navbar from '../../components/Navbar'
import Tourcard from '../../components/Tourcard'
import Tourpage from '../../components/Tourpage'
import Head from 'next/head'
const DesertSafari = ({ categoryUrl }) => {
  const [tourData, setTourData] = useState()
  const [allTour, setAllTour] = useState([])
  const [categoryInfo, setCategoryInfo] = useState({ title: '', image: [] })
  const fetchTour = async (type) => {
    try {
      const response = await fetch("/api/tour/singlecategory", {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({ categoryUrl: categoryUrl, type:type })
      });
      const responseData = await response.json();
      console.log(responseData)
      setAllTour(responseData.tour)
    } catch (error) {
      console.log(error)
    }
  }
  const fetchCategory = async () => {
    try {
      const response = await fetch("/api/category/fetchone", {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({ url: categoryUrl })
      });
      const responseData = await response.json();
      console.log(responseData)
      setCategoryInfo(responseData.category);
    } catch (error) {
      console.log(error)
    }
  }
  const filterTour = (tour)=>{
    if(typeof window!=='undefined'){
      for(let item of document.querySelectorAll(".tour-btn")){
        item.classList.remove("text-white")
        item.classList.remove("bg-blue-400")
      }
      document.querySelector(`#${tour}-btn`).classList.add("text-white")
      document.querySelector(`#${tour}-btn`).classList.add("bg-blue-400")
    }
    fetchTour(tour);
  }
  useEffect(() => {
    fetchTour('all');
    fetchCategory();
  }, [])
  return (
    <>
    <Head>
                <title>Al Atwal - {categoryUrl}</title>
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
      <Navbar />
      <div className="w-full h-56 overflow-hidden relative">
        <img src={categoryInfo.image[1] ? categoryInfo.image[1] : `https://source.unsplash.com/random/?${categoryInfo.url}`} className='object-cover object-center w-full ' alt="" />
        <div className="w-full absolute top-0 h-56 flex justify-center items-center">
          <h3 className="md:text-5xl text-3xl font-bold font-[helvetica] text-white drop-shadow  text-center">{categoryInfo.title ? categoryInfo.title : "No Tour Found"}</h3>
        </div>
      </div>
        <div className="w-full flex justify-center items-center mt-3 px-3">
          <button onClick={()=>{filterTour('all')}} id='all-btn' className='w-1/4 bg-blue-400 text-white tour-btn border p-2 text-center rounded-l border-gray-300 font-semibold'>All Tours</button>
          <button onClick={()=>{filterTour('basic')}} id='basic-btn' className='w-1/4 tour-btn border-t border-b p-2 text-center border-gray-300 font-semibold'>Basic</button>
          <button onClick={()=>{filterTour('platinum')}} id='platinum-btn' className='w-1/4 tour-btn border p-2 text-center border-gray-300 font-semibold'>Platinum</button>
          <button onClick={()=>{filterTour('explorer')}} id='explorer-btn' className='w-1/4 tour-btn border-t border-b border-r rounded-r p-2 text-center border-gray-300 font-semibold'>Explorer</button>
        </div>
      <div className="w-full flex flex-wrap m-auto p-2 box-border">
        {
          allTour && allTour.map((data, index) => {
            return [<Tourcard key={index} data={data} />]
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
  return {
    props: {
      categoryUrl: slag
    }, // will be passed to the page component as props
  }
}