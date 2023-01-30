import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { IoIosCloseCircleOutline } from 'react-icons/io'
import { useRouter } from 'next/router'
import Head from 'next/head'
const SuccessPage = ({ id }) => {
  const [orderData, setOrderData] = useState({ id: '', payment_status: ''})
  const [isOrderFound, setIsOrderFound] = useState(false)
  const fetchBooking = async (bookingNumber) => {
    let response = await fetch('/api/booking/fetchone', {
      method: 'POST',
      headers: {
        'content-type': 'application/jspon'
      },
      body: JSON.stringify({ bookingNumber: bookingNumber })
    })
    let responseData = await response.json();
    console.log(responseData)
    if (responseData.success) {
      setIsOrderFound(true)
      sendConfirmation(responseData.booking);
      sendToAdmin(responseData.booking)
      if (responseData.booking.paymentMethod == 'stripe') {
        response = await fetch('/api/stripe/status', {
          method: 'POST',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify({ sessionId: responseData.booking.sessionId })
        })
        responseData = await response.json();
        if (responseData.session.payment_status == 'unpaid') {
          setOrderData({ id: bookingNumber, payment_status: 'pending' })
        } else {
          setOrderData({id: bookingNumber, payment_status: 'success' })
          response = await fetch('/api/booking/success', {
            method:'POST',
            headers:{
              'content-type':'application/json'
            },
            body:JSON.stringify({bookingNumber:bookingNumber})
          })
          responseData = response.json();
        }
      } else {
        setOrderData({id: bookingNumber, payment_status: responseData.booking.paymentStatus })
      }
    }
  }
  useEffect(() => {
    fetchBooking(id)
  }, [])
  const sendConfirmation = async (booking)=>{
    let response = await fetch('/api/email/sendconfirmation', {
      method:'POST',
      headers:{
        'content-type':'application/json'
      },
      body:JSON.stringify({bookingInfo:booking})
    })
    let responseData = response.json();
    console.log(responseData)
  }
  const sendToAdmin = async (booking)=>{
    let response = await fetch('/api/email/sendtoadmin', {
      method:'POST',
      headers:{
        'content-type':'application/json'
      },
      body:JSON.stringify({bookingInfo:booking})
    })
    let responseData = response.json();
    console.log(responseData)
  }
  return (
    <>
    <Head>
                <title>Order - Success</title>
                <meta name="title" content="Order Placed successfully"/>
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
    <div className="w-full h-screen flex justify-center items-center p-1 bg-gray-50">
      <div className='md:w-[400px] md:h-[400px] w-full h-[300px] bg-white shadow-lg border-gray-100 border border-l-4 border-l-blue-300 flex justify-center items-center relative'>
        <Link href={"/"} className='absolute -top-2 -right-2 rounded-full bg-white hover:bg-orange-500 hover:text-white duration-150 text-gray-800'><IoIosCloseCircleOutline className='text-xl' /></Link>
        {
          isOrderFound && 
          <div className='flex justify-center items-center flex-col p-2'>
          <img src="/images/mark.png" className='w-[100px] aspect-square' alt="" />
          <h2 className="text-center font-bold text-orange-400 text-xl">Thank You!</h2>
          <p className='text-center capitalize font-semibold text-lg'>Your order has been placed</p>
          {
            orderData.payment_status == 'pending' ?
              <p className='text-center capitalize font-semibold text-orange-500 text-sm'>Payment Pending</p> : orderData.payment_status == 'success' ?
                <p className='text-center capitalize font-semibold text-green-500 text-sm'>Payment Completed</p> : ''
          }
          <p className='text-center capitalize'>Booking id: #{id}</p>
        </div>
        }
        {
          !isOrderFound && 
          <div className='flex justify-center items-center flex-col p-2'>
          <img src="/images/warn.png" className='w-[100px] aspect-auto' alt="" />
          <h2 className="text-center font-bold text-orange-400 text-xl">Sorry!</h2>
          <p className='text-center capitalize font-semibold text-lg'>No Order Found</p>
          <p className='text-center capitalize'>Order id: #{id}</p>
        </div>
        }
      </div>
    </div>
    </>

  )
}

export default SuccessPage
export async function getServerSideProps(context) {
  const { id } = context.query;
  return {
    props: {
      id: id
    },
  }
}