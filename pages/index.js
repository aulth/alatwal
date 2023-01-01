import Head from 'next/head'
import { useEffect } from 'react'
import Image from 'next/image'
import Script from 'next/script'
import Navbar from '../components/Navbar'
import '@animxyz/core'
import { BsChevronCompactDown } from 'react-icons/bs'
import Service from '../components/Service'
export default function Home() {
  const toggleService = () => {
    if (typeof window !== 'undefined') {
      document.getElementById("service-list").classList.toggle("hidden");
    }
  }
  useEffect(() => {
    if (typeof window !== 'undefined') {
      var date = new Date();
      var day = date.getDate();
      var month = date.getMonth() + 1;
      var year = date.getFullYear();
      if (month < 10) month = "0" + month;
      if (day < 10) day = "0" + day;
      var today = year + "-" + month + "-" + day;
      document.getElementById('datePicker').value = today;
    }

    if(typeof window!=='undefined'){
      
    }
  }, [])

  return (
    <>
      <style jsx>
        {`
      input:focus{
        outline:none !important;
      }
      `}
      </style>
      <Head>
        <title>Tourism</title>
        <meta name="description" content="A Tourism and Visa Website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        {/* <link rel="stylesheet" href="https://unpkg.com/flowbite@1.5.5/dist/flowbite.min.css" /> */}
        <script src="https://unpkg.com/flowbite@1.5.5/dist/flowbite.js" async></script>
      </Head>

      <Navbar />
      <div className="home">
        <div style={{ height: 'calc(100vh - 72px)' }} className="flex flex-col justify-center items-center p-1">
          <h2 className="md:text-5xl text-3xl text-center font-semibold font-[helvetica] text-white drop-shadow-lg mb-8">Book With Us And Enjoy Your Journey!</h2>
          <div className="flex md:flex-row flex-col justify-center items center border-white border rounded md:w-3/4 w-full p-1">
            <div className="flex items-center bg-white md:rounded-l md:rounded-r-none rounded-t  p-1  w-full relative">
              <button onClick={toggleService} className="w-full px-2 py-1 flex items-center text-gray-500 font-semibold">Burj Khalifa <BsChevronCompactDown className='mx-2 ' /></button>
              <div id='service-list' className="w-full hidden border-b border-l border-r border-gray-400 absolute -ml-[4.5px] top-10  rounded-b bg-white p-1 z-50">
                <ul className='w-full'>
                  <li className='w-full bg-gray-700 p-1 text-white font-semibold'>UAE Visa</li>
                  <li className=' text-gray-400 hover:text-white hover:bg-gray-600 cursor-pointer mb-1 p-1'>Desert Safari</li>
                  <li className='text-gray-400 hover:text-white hover:bg-gray-600 cursor-pointer mb-1 p-1'>Burj Khalifa</li>
                  <li className=' text-gray-400 hover:text-white hover:bg-gray-600 cursor-pointer mb-1 p-1'>Dhow Cruise</li>
                  <li className='text-gray-400 hover:text-white hover:bg-gray-600 cursor-pointer mb-1 p-1'>Wild Wadi Water Park</li>
                  <hr />
                  <li className='w-full bg-gray-700 p-1 text-white font-semibold'>Visa</li>
                  <li className='text-gray-400 hover:text-white hover:bg-gray-600 cursor-pointer mb-1 p-1'>UAE Visa</li>
                  <li className=' text-gray-400 hover:text-white hover:bg-gray-600 cursor-pointer mb-1 p-1'>International Visa</li>
                </ul>
              </div>
            </div>
            <div className="flex md:rounded-r rounded-b items-center bg-white w-full md:my-0 my-1">
              <input type="date" id='datePicker' className='w-full md:rounded-none rounded-l outline-none border-none focus:border-none focus:outline-none p-2' />
              <input type="submit" value={"Book Now"} className='flex justify-center items-center bg-white md:rounded-r rounded-br w-[200px] bg-blue-600 hover:bg-blue-700 cursor-pointer text-white font-semibold p-2' />
            </div>
          </div>
          <p className='text-center md:w-3/4 w-full my-5 text-white drop-shadow'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Est ad non cupiditate cum eveniet, recusandae neque doloribus alias quaerat deleniti eligendi a qui asperiores quisquam quasi libero magni! Porro, impedit?</p>
        </div>
      </div>
      <Service />
    </>
  )
}
