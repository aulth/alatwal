import React, { useEffect, useState } from 'react'
import { MdClose, MdCheck, MdOutlineEdit } from 'react-icons/md'
import { AiOutlineSwap, AiOutlineDelete, AiOutlineClockCircle } from 'react-icons/ai'
import { TfiReload } from 'react-icons/tfi'
import Link from 'next/link'
import '@animxyz/core'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Head from 'next/head'
const AdminBookings = ({ booking, fetchBooking }) => {
    let bookingData = []
    if(booking){
        for (let item of booking){
            bookingData.push({bookingNumber:item.bookingNumber, id:item._id});
        }
    }
    useEffect(() => {
        if (typeof window !== 'undefined') {
        }
    }, [])


    const performSearch = (e) => {
        e.preventDefault();
        let query = e.target.value.toLowerCase().split(" ");;
        let result = [];
        if (typeof window !== 'undefined') {
            for (let keyword of query) {
                for (let booking of bookingData) {
                    if (booking.bookingNumber.match(keyword)) {
                        if (!result.includes(booking.id)) {
                            result.push(booking.id);
                        }
                    }
                }
            }
            for (let booking of bookingData) {
                document.querySelector(`#b-${booking.id}`).classList.add("hidden");
            }
            for (let booking of result) {
                document.querySelector(`#b-${booking}`).classList.remove("hidden");
            }
        }
    }
    const handleOnChangePaymentStatus = async (bookingNumber, paymentStatus)=>{
        const response = await fetch('/api/booking/paymentstatus', {
            method:'POST',
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify({bookingNumber:bookingNumber, authtoken:localStorage.getItem('alatwal-admin'), paymentStatus:paymentStatus})
        })
        const responseData = await response.json();
        if(responseData.success){
            toast.success(responseData.msg);
            fetchBooking(booking.bookingNumber);
        }else{
            toast.error(responseData.msg)
        }
    }
    return (
        <>
        <ToastContainer/>
            <div className="w-full p-4 overflow-y-auto">
                <div className="w-full flex justify-between">
                    <h6 className=" font-semibold">Bookings</h6>
                    <button className="flex items-center text-[#1F41AF]"> <TfiReload className='mx-2' /> Reload Data</button>
                </div>
                <div className="w-full flex justify-between items-center my-4 rounded border border-gray-300">
                    <input onChange={performSearch} type="text" className='w-full h-full p-2 border-none focus:outline-none' />
                    <button className='p-2 bg-[#1F41AF] rounded-r px-3 text-[white]'>Search</button>
                </div>
                <div className="w-full flex  items-center justify-start my-2 box-border rounded bg-white p-4 ">
                    <table className='w-full'>
                        <thead className='border'>
                            <td className='p-1 uppercase font-semibold text-center'>Booking Number</td>
                            <td className='p-1 border-l px-2 uppercase font-semibold text-center '>Booking For</td>
                            <td className='p-1 border-l px-2 uppercase font-semibold'>Price</td>
                            <td className='p-1 border-l px-2 uppercase font-semibold text-center'>Availability</td>
                            <td className='p-1 border-l px-2 uppercase font-semibold'>Payment Status</td>
                            <td className='p-1 border-l px-2 uppercase font-semibold'>Actions</td>
                        </thead>
                        <tbody>
                            {
                                booking && booking.length>0 &&
                                booking.map((booking, index)=>{
                                    return <tr key={index} id={`b-${booking._id}`} className='border-b border-l border-r'>
                                    <td className='p-1 text-center'>{booking.bookingNumber}</td>
                                    <td className='p-1 border-l px-2'>{booking.bookingFor[0].toUpperCase()+booking.bookingFor.slice(1).toLowerCase()}</td>
                                    <td className='p-1 border-l px-2'>AED {booking.price}</td>
                                    <td className='p-1 border-l px-2'>{booking.item[0].date}</td>
                                    <td className='p-1 border-l px-2'>
                                        {
                                            booking.paymentStatus=='pending'?
                                            <span className='flex items-center text-red-500'><AiOutlineClockCircle className='mr-1' />
                                            Pending
                                            <button onClick={()=>{handleOnChangePaymentStatus(booking.bookingNumber, 'success')}} className='border border-gray-300 rounded inline ml-1 text-gray-400 text-sm hover:bg-gray-600 hover:text-white'><AiOutlineSwap /></button>
                                            </span>:
                                            <span className='flex items-center text-green-500'>
                                                Completed 
                                                 <button  onClick={()=>{handleOnChangePaymentStatus(booking.bookingNumber, 'pending')}}   className='border border-gray-300 rounded inline ml-1 text-gray-400 text-sm hover:bg-gray-600 hover:text-white'><AiOutlineSwap /></button>
                                            </span>
                                        }
                                    </td>
                                    <td className='p-1 border-l px-2 flex justify-center items-center'>
                                        <div className="flex items-center">
                                            <Link  href={`/admin/bookings/assign-ticket/${booking.bookingNumber}`} className='px-2 py-[3px]  border rounded-l hover:bg-gray-100 text-[12px]'>
                                                Assign Tickets
                                            </Link>
                                            {/* <button className='px-2 py-[3px]  border-t border-b hover:bg-gray-100 text-[12px]'>
                                                Update Booking
                                            </button> */}
                                            <Link href={`/admin/bookings/view/${booking.bookingNumber}`} className='px-2 py-[3px]  border-t border-r border-b hover:bg-gray-100 text-[12px]'>
                                                View Details
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default AdminBookings