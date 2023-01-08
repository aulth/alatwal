import React, { useEffect } from 'react'
import { MdClose, MdCheck, MdOutlineEdit } from 'react-icons/md'
import { AiOutlineSwap, AiOutlineDelete } from 'react-icons/ai'
import { TfiReload } from 'react-icons/tfi'
import '@animxyz/core'
import Chart from "chart.js";
import Head from 'next/head'
const AdminSubscribers = () => {
    let userData = [{ "name": "Mohd Usman", "email": "usman@gmail.com", id: "subscriber-1" }, { "name": "Mohd Noman", "email": "noman@gmail.com", "id": "subscriber-2" }, { "name": "Ashraf", "email": "ashraf@gmail.com", "id": "subscriber-3" }]

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
                for (let user of userData) {
                    if (user.name.toLowerCase().match(keyword) || user.email.toLowerCase().match(keyword)) {
                        if (!result.includes(user.id)) {
                            result.push(user.id);
                        }
                    }
                }
            }
            for (let user of userData) {
                document.querySelector(`#${user.id}`).classList.add("hidden");
            }
            for (let user of result) {
                document.querySelector(`#${user}`).classList.remove("hidden");
            }
        }
    }
    return (
        <>
            <div className="w-full p-4 overflow-y-auto">
                <div className="w-full flex justify-between">
                    <h6 className=" font-semibold">Subscribers</h6>
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
                            <td className='p-1 border-l px-2 uppercase font-semibold'>Name</td>
                            <td className='p-1 border-l px-2 uppercase font-semibold'>Email</td>
                            <td className='p-1 border-l px-2 uppercase font-semibold'>Status</td>
                            <td className='p-1 border-l px-2 uppercase font-semibold'>Action</td>
                        </thead>
                        <tbody>
                            <tr id='subscriber-1' className='border-b border-l border-r'>
                                <td className='p-1 text-center'>1</td>
                                <td className='p-1 border-l px-2'>Mohd Usman</td>
                                <td className='p-1 border-l px-2'>usman@gmail.com</td>
                                <td className='p-1 border-l px-2'>
                                    <button className="px-2 py-1 rounded bg-green-400 text-sm text-white">Active</button>
                                </td>
                                <td className='p-1 border-l px-2'>
                                    <div className="flex items-center">
                                        <button className='px-2 py-1 border rounded hover:bg-gray-100'>
                                            <AiOutlineSwap />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                            <tr id='subscriber-2' className='border-b border-l border-r'>
                                <td className='p-1 text-center'>2</td>
                                <td className='p-1 border-l px-2'>Mohd Noman</td>
                                <td className='p-1 border-l px-2'>noman@gmail.com</td>
                                <td className='p-1 border-l px-2'>
                                    <button className="px-2 py-1 rounded bg-green-400 text-sm text-white">Active</button>
                                </td>
                                <td className='p-1 border-l px-2'>
                                    <div className="flex items-center">
                                        <button className='px-2 py-1 border rounded hover:bg-gray-100'>
                                            <AiOutlineSwap />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                            <tr id='subscriber-3' className='border-b border-l border-r'>
                                <td className='p-1 text-center'>3</td>
                                <td className='p-1 border-l px-2'>Ashraf</td>
                                <td className='p-1 border-l px-2'>ashraf@gmail.com</td>
                                <td className='p-1 border-l px-2'>
                                    <button className="px-2 py-1 rounded bg-green-400 text-sm text-white">Active</button>
                                </td>
                                <td className='p-1 border-l px-2'>
                                    <div className="flex items-center">
                                        <button className='px-2 py-1 border rounded hover:bg-gray-100'>
                                            <AiOutlineSwap />
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

export default AdminSubscribers