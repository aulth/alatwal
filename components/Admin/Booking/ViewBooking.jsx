import React, { useEffect, useState } from 'react'
import { MdClose, MdCheck, MdOutlineEdit } from 'react-icons/md'
import { AiOutlineSwap, AiOutlineDelete, AiOutlineClockCircle } from 'react-icons/ai'
import { TfiReload } from 'react-icons/tfi'
import '@animxyz/core'
import Head from 'next/head'
const ViewBooking = ({ bookingNumber }) => {
    const [bookingDetails, setBookingDetails] = useState();
    const [isError, setIsError] = useState('')
    const fetchBooking = async (bookingNumber) => {
        const response = await fetch('/api/booking/fetchone', {
            method: 'POST',
            body: JSON.stringify({ bookingNumber: bookingNumber })
        })
        const responseData = await response.json();
        if (responseData.success) {
            setBookingDetails(responseData.booking)
        } else {
            setIsError(responseData.msg)
        }

    }
    useEffect(() => {
        fetchBooking(bookingNumber)
    }, [])

    return (
        <>
            <Head>
                <title>View Booking</title>
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
            <div className="w-full p-4 overflow-y-auto">
                <div className="w-full flex justify-between">
                    <h6 className=" font-semibold ">Booking Details</h6>
                    <button className="flex items-center text-[#1F41AF]"> <span className='text-gray-700 mr-1'>Bookings / <span className='mx-1 text-blue-500'>View Details</span> </span></button>
                </div>
                <div className="w-full  my-2 box-border rounded bg-white ">
                    <h2 className="text-lg p-4 border-b font-semibold border-gray-300 w-full text-left ">Booking Details</h2>
                    {
                        bookingDetails &&
                        <div className="w-full flex flex-col md:flex-row p-4">
                            <div className='md:w-1/2 w-full'>
                                <div className='flex items-center'>
                                    <label htmlFor="" className='font-semibold'>Booking Id: </label>
                                    <label htmlFor="" className='mx-2'>{bookingDetails.bookingNumber} </label>
                                </div>
                                <div className='flex items-center my-3'>
                                    <label htmlFor="" className='font-semibold'>First Name: </label>
                                    <label htmlFor="" className='mx-2'>{bookingDetails.firstName} </label>
                                </div>
                                <div className='flex items-center my-3'>
                                    <label htmlFor="" className='font-semibold'>Contact: </label>
                                    <label htmlFor="" className='mx-2'>{bookingDetails.contact}  </label>
                                </div>
                                {
                                    bookingDetails.bookingFor == 'tour' &&
                                    <div className='flex items-center my-3'>
                                        <label htmlFor="" className='font-semibold'>Special Request: </label>
                                        <label htmlFor="" className='mx-2'>{bookingDetails.specialRequest ? bookingDetails.specialRequest : ''}  </label>
                                    </div>
                                }
                            </div>
                            <div className='md:w-1/2 w-full'>
                                <div className='flex items-center'>
                                    <label htmlFor="" className='font-semibold'>Payment Method: </label>
                                    <label htmlFor="" className='mx-2'>{bookingDetails.paymentMethod[0].toUpperCase() + bookingDetails.paymentMethod.slice(1).toLowerCase()}  </label>
                                </div>
                                <div className='flex items-center my-3'>
                                    <label htmlFor="" className='font-semibold'>Last Name: </label>
                                    <label htmlFor="" className='mx-2'>{bookingDetails.lastName}  </label>
                                </div>
                                <div className='flex items-center my-3'>
                                    <label htmlFor="" className='font-semibold'>Date: </label>
                                    <label htmlFor="" className='mx-2'>{bookingDetails.bookingFor == 'tour' ? bookingDetails.item[0].date : bookingDetails.date}  </label>
                                </div>
                                {
                                    bookingDetails.bookingFor == 'tour' &&
                                    <div className='flex items-center my-3'>
                                        <label htmlFor="" className='font-semibold'>Pickup Location: </label>
                                        <label htmlFor="" className='mx-2'>{bookingDetails.pickupLocation ? bookingDetails.pickupLocation : ''} </label>
                                    </div>
                                }
                            </div>
                        </div>
                    }
                    {
                        bookingDetails && bookingDetails.item && bookingDetails.item.length > 0 &&
                        bookingDetails.item.map((booking, index) => {
                            return <div key={index}>
                                <hr />
                                <div className="w-full p-4">
                                    <div className="w-full flex flex-col md:flex-row md:justify-between my-3">
                                        <label className='font-semibold flex items-center mr-2 md:mb-0 mb-1 w-52' htmlFor="">{bookingDetails.bookingFor[0].toUpperCase() + bookingDetails.bookingFor.slice(1).toUpperCase()} Title</label>
                                        <input type="text" value={booking.title} className='w-full focus:outline focus:outline-blue-400 p-1 rounded border text-sm' disabled />
                                    </div>
                                    {
                                        bookingDetails.bookingFor == 'tour' &&
                                        <div className="w-full flex flex-col md:flex-row md:justify-between my-3">
                                            <label className='font-semibold flex items-center mr-2 md:mb-0 mb-1 w-52' htmlFor="">Arrival</label>
                                            <input type="text" value={booking.date} className='w-full focus:outline focus:outline-blue-400 p-1 rounded border text-sm' disabled />
                                        </div>
                                    }
                                    {
                                        booking.time &&
                                        <div className="w-full flex flex-col md:flex-row md:justify-between my-3">
                                            <label className='font-semibold flex items-center mr-2 md:mb-0 mb-1 w-52' htmlFor="">Start Time</label>
                                            <input type="text" value={booking.time} className='w-full focus:outline focus:outline-blue-400 p-1 rounded border text-sm' disabled />
                                        </div>
                                    }
                                    {
                                        bookingDetails.bookingFor == 'tour' &&
                                        <div className="w-full flex flex-col md:flex-row md:justify-between my-3">
                                            <label className='font-semibold flex items-center mr-2 md:mb-0 mb-1 w-52' htmlFor="">Passengers</label>
                                            <input type="text" value={`${booking.adult}x Adult, ${booking.child}x Child, ${booking.infant}x Infant `} className='w-full focus:outline focus:outline-blue-400 p-1 rounded border text-sm' disabled />
                                        </div>
                                    }
                                    {
                                        bookingDetails.bookingFor == 'tour' ?
                                            <div className="w-full flex flex-col md:flex-row md:justify-between my-3">
                                                <label className='font-semibold flex items-center mr-2 md:mb-0 mb-1 w-52' htmlFor="">Total Amount</label>
                                                <input type="text" value={booking.price + (booking.explorer ? booking.transport : 0) + (booking.isFastTrackAddOn ? booking.fastTrackAddOn : 0)} className='w-full focus:outline focus:outline-blue-400 p-1 rounded border text-sm' disabled />
                                            </div> :
                                            <div className="w-full flex flex-col md:flex-row md:justify-between my-3">
                                                <label className='font-semibold flex items-center mr-2 md:mb-0 mb-1 w-52' htmlFor="">Total Amount</label>
                                                <input type="text" value={bookingDetails.price} className='w-full focus:outline focus:outline-blue-400 p-1 rounded border text-sm' disabled />
                                            </div>
                                    }
                                    {
                                        bookingDetails.bookingFor == 'tour' &&
                                        <div className="w-full flex flex-col md:flex-row md:justify-between my-3">
                                            <label className='font-semibold flex items-center mr-2 md:mb-0 mb-1 w-52' htmlFor="">VAT</label>
                                            <input type="text" value={booking.vat} className='w-full focus:outline focus:outline-blue-400 p-1 rounded border text-sm' disabled />
                                        </div>
                                    }
                                    {
                                        bookingDetails.bookingFor == 'visa' &&
                                        <div className="w-full flex md:flex-row flex-col mt-6">
                                            <div className="flex flex-col w-80">
                                                <img src={bookingDetails.image[0]} className='w-80 h-64' alt="passport" />
                                                <a className='px-2 py-1  text-center rounded bg-gray-200 hover:bg-gray-300 my-2 cursor-pointer' href={bookingDetails.image[0]} download>Download</a>
                                            </div>
                                            <div className="flex flex-col w-60 md:ml-2 ml-0 md:mt-0 mt-2">
                                                <img src={bookingDetails.image[1]} className='w-80 h-64' alt="photograph" />
                                                <a className='px-2 py-1 text-center  rounded bg-gray-200 hover:bg-gray-300 my-2 cursor-pointer' href={bookingDetails.image[1]} download>Download</a>
                                            </div>
                                        </div>
                                    }
                                </div>
                            </div>
                        })
                    }

                </div>
            </div>
        </>
    )
}

export default ViewBooking