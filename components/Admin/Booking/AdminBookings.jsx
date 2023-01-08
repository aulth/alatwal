import React, { useEffect } from 'react'
import { MdClose, MdCheck, MdOutlineEdit } from 'react-icons/md'
import { AiOutlineSwap, AiOutlineDelete, AiOutlineClockCircle } from 'react-icons/ai'
import { TfiReload } from 'react-icons/tfi'
import '@animxyz/core'
import Chart from "chart.js";
import Head from 'next/head'
const AdminBookings = () => {
    let bookingData = [{ "id": "b-1" }, { "id": "b-2" }, { "id": "b-3" }]

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
                    if (booking.id.toLowerCase().match(keyword)) {
                        if (!result.includes(booking.id)) {
                            result.push(booking.id);
                        }
                    }
                }
            }
            for (let booking of bookingData) {
                document.querySelector(`#${booking.id}`).classList.add("hidden");
            }
            for (let booking of result) {
                document.querySelector(`#${booking}`).classList.remove("hidden");
            }
        }
    }
    return (
        <>
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
                            <tr id='b-1' className='border-b border-l border-r'>
                                <td className='p-1 text-center'>B-1</td>
                                <td className='p-1 border-l px-2'>Tour</td>
                                <td className='p-1 border-l px-2'>AED 300</td>
                                <td className='p-1 border-l px-2'>07-01-2023</td>
                                <td className='p-1 border-l px-2'>
                                    <span className='flex items-center text-yellow-400'><AiOutlineClockCircle className='mr-1' /> Pending</span>
                                </td>
                                <td className='p-1 border-l px-2 flex justify-center items-center'>
                                    <div className="flex items-center">
                                        <button className='px-2 py-[3px]  border rounded-l hover:bg-gray-100 text-[12px]'>
                                            Assign Tickets
                                        </button>
                                        <button className='px-2 py-[3px]  border-t border-b hover:bg-gray-100 text-[12px]'>
                                            Update Booking
                                        </button>
                                        <button className='px-2 py-[3px]  border rounded-r hover:bg-gray-100 text-[12px]'>
                                            View Details
                                        </button>
                                    </div>
                                </td>
                            </tr>
                            <tr id='b-2' className='border-b border-l border-r'>
                                <td className='p-1 text-center'>B-2</td>
                                <td className='p-1 border-l px-2'>Tour</td>
                                <td className='p-1 border-l px-2'>AED 300</td>
                                <td className='p-1 border-l px-2'>07-01-2023</td>
                                <td className='p-1 border-l px-2'>
                                    <span className='flex items-center text-yellow-400'><AiOutlineClockCircle className='mr-1' /> Pending</span>
                                </td>
                                <td className='p-1 border-l px-2 flex justify-center items-center'>
                                    <div className="flex items-center">
                                        <button className='px-2 py-[3px]  border rounded-l hover:bg-gray-100 text-[12px]'>
                                            Assign Tickets
                                        </button>
                                        <button className='px-2 py-[3px]  border-t border-b hover:bg-gray-100 text-[12px]'>
                                            Update Booking
                                        </button>
                                        <button className='px-2 py-[3px]  border rounded-r hover:bg-gray-100 text-[12px]'>
                                            View Details
                                        </button>
                                    </div>
                                </td>
                            </tr>
                            <tr id='b-3' className='border-b border-l border-r'>
                                <td className='p-1 text-center'>B-3</td>
                                <td className='p-1 border-l px-2'>Tour</td>
                                <td className='p-1 border-l px-2'>AED 300</td>
                                <td className='p-1 border-l px-2'>07-01-2023</td>
                                <td className='p-1 border-l px-2'>
                                    <span className='flex items-center text-yellow-400'><AiOutlineClockCircle className='mr-1' /> Pending</span>
                                </td>
                                <td className='p-1 border-l px-2 flex justify-center items-center'>
                                    <div className="flex items-center">
                                        <button className='px-2 py-[3px]  border rounded-l hover:bg-gray-100 text-[12px]'>
                                            Assign Tickets
                                        </button>
                                        <button className='px-2 py-[3px]  border-t border-b hover:bg-gray-100 text-[12px]'>
                                            Update Booking
                                        </button>
                                        <button className='px-2 py-[3px]  border rounded-r hover:bg-gray-100 text-[12px]'>
                                            View Details
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default AdminBookings