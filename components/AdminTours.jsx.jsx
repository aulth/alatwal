import React, { useEffect } from 'react'
import { MdClose, MdCheck, MdOutlineEdit } from 'react-icons/md'
import { AiOutlineSwap, AiOutlineDelete } from 'react-icons/ai'
import { TfiReload } from 'react-icons/tfi'
import '@animxyz/core'
import Chart from "chart.js";
import Head from 'next/head'
const AdminTours = () => {
    let tourData = [{ "title": "Burj Khalifa Tour 1", "category": "Burj Khalifa", id: "tour-1" }, { "title": "Morning Desert Safari", "category": "Desert Safari", id: "tour-2" }, { "title": "Dhow Cruise Tour 1", "category": "Dhow Cruise", id: "tour-3" }]

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
                for (let tour of tourData) {
                    if (tour.title.toLowerCase().match(keyword) || tour.category.toLowerCase().match(keyword)) {
                        if (!result.includes(tour.id)) {
                            result.push(tour.id);
                        }
                    }
                }
            }
            for (let tour of tourData) {
                document.querySelector(`#${tour.id}`).classList.add("hidden");
            }
            for (let tour of result) {
                document.querySelector(`#${tour}`).classList.remove("hidden");
            }
        }
    }
    return (
        <>
            <div className="w-full p-4 overflow-y-auto">
                <div className="w-full flex justify-between">
                    <h6 className=" font-semibold">Tours</h6>
                    <button className="flex items-center text-[#1F41AF]"> <TfiReload className='mx-2' /> Reload Data</button>
                </div>
                <div className="w-full flex justify-between items-center my-4 rounded border border-gray-300">
                    <input onChange={performSearch} type="text" className='w-full h-full p-2 border-none focus:outline-none' />
                    <button className='p-2 bg-[#1F41AF] rounded-r px-3 text-[white]'>Search</button>
                </div>
                <div className="w-full flex  items-center justify-start my-2 box-border rounded bg-white p-4 ">
                    <table className='w-full'>
                        <thead className='border'>
                            <td className='p-1 uppercase font-semibold'>&nbsp;</td>
                            <td className='p-1 border-l px-2 uppercase font-semibold'>Title</td>
                            <td className='p-1 border-l px-2 uppercase font-semibold'>Category</td>
                            <td className='p-1 border-l px-2 uppercase font-semibold'>Location</td>
                            <td className='p-1 border-l px-2 uppercase font-semibold'>Availability</td>
                            <td className='p-1 border-l px-2 uppercase font-semibold'>Status</td>
                            <td className='p-1 border-l px-2 uppercase font-semibold'>Action</td>
                        </thead>
                        <tbody>
                            <tr id='tour-1' className='border-b border-l border-r'>
                                <td className='p-1 text-center'>1</td>
                                <td className='p-1 border-l px-2'>Burj Khalifa Tour 1</td>
                                <td className='p-1 border-l px-2'>Burj Khalifa</td>
                                <td className='p-1 border-l px-2'>UAE</td>
                                <td className='p-1 border-l px-2'>Daily</td>
                                <td className='p-1 border-l px-2 text-center'><button className="px-2 py-1 bg-green-400 rounded text-[12px] text-white">Active</button></td>
                                <td className='p-1 border-l px-2 flex justify-center items-center'>
                                    <div className="flex items-center">
                                        <button className='px-2 py-1 border rounded-l hover:bg-gray-100'>
                                            <AiOutlineSwap />
                                        </button>
                                        <button className='px-2 py-[3px] border-r border-t border-b hover:bg-gray-100 text-[12px]'>
                                            Reviews
                                        </button>
                                        <button className='px-2 py-[3px] border-r border-t border-b hover:bg-gray-100 text-[12px]'>
                                            Tour Images
                                        </button>
                                        <button className='px-2 py-1 border-r border-t border-b hover:bg-gray-100'>
                                            <MdOutlineEdit />
                                        </button>
                                        <button className='px-2 py-1 border-r border-t border-b rounded-r hover:bg-gray-100'>
                                            <AiOutlineDelete />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                            <tr id='tour-2' className='border-b border-l border-r'>
                                <td className='p-1 text-center'>2</td>
                                <td className='p-1 border-l px-2'>Morning Desert Safari Tour</td>
                                <td className='p-1 border-l px-2'>Desert Safari</td>
                                <td className='p-1 border-l px-2'>UAE</td>
                                <td className='p-1 border-l px-2'>Daily</td>
                                <td className='p-1 border-l px-2 text-center'><button className="px-2 py-1 bg-green-400 rounded text-[12px] text-white">Active</button></td>
                                <td className='p-1 border-l px-2 flex justify-center items-center'>
                                    <div className="flex items-center">
                                        <button className='px-2 py-1 border rounded-l hover:bg-gray-100'>
                                            <AiOutlineSwap />
                                        </button>
                                        <button className='px-2 py-[3px] border-r border-t border-b hover:bg-gray-100 text-[12px]'>
                                            Reviews
                                        </button>
                                        <button className='px-2 py-[3px] border-r border-t border-b hover:bg-gray-100 text-[12px]'>
                                            Tour Images
                                        </button>
                                        <button className='px-2 py-1 border-r border-t border-b hover:bg-gray-100'>
                                            <MdOutlineEdit />
                                        </button>
                                        <button className='px-2 py-1 border-r border-t border-b rounded-r hover:bg-gray-100'>
                                            <AiOutlineDelete />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                            <tr id='tour-3' className='border-b border-l border-r'>
                                <td className='p-1 text-center'>3</td>
                                <td className='p-1 border-l px-2'>Dhow Cruise Tour 1</td>
                                <td className='p-1 border-l px-2'>Dhow Cruise</td>
                                <td className='p-1 border-l px-2'>UAE</td>
                                <td className='p-1 border-l px-2'>Daily</td>
                                <td className='p-1 border-l px-2 text-center'><button className="px-2 py-1 bg-green-400 rounded text-[12px] text-white">Active</button></td>
                                <td className='p-1 border-l px-2 flex justify-center items-center'>
                                    <div className="flex items-center">
                                        <button className='px-2 py-1 border rounded-l hover:bg-gray-100'>
                                            <AiOutlineSwap />
                                        </button>
                                        <button className='px-2 py-[3px] border-r border-t border-b hover:bg-gray-100 text-[12px]'>
                                            Reviews
                                        </button>
                                        <button className='px-2 py-[3px] border-r border-t border-b hover:bg-gray-100 text-[12px]'>
                                            Tour Images
                                        </button>
                                        <button className='px-2 py-1 border-r border-t border-b hover:bg-gray-100'>
                                            <MdOutlineEdit />
                                        </button>
                                        <button className='px-2 py-1 border-r border-t border-b rounded-r hover:bg-gray-100'>
                                            <AiOutlineDelete />
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

export default AdminTours