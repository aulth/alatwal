import React, { useEffect } from 'react'
import { MdClose, MdCheck, MdOutlineEdit } from 'react-icons/md'
import { AiOutlineSwap, AiOutlineDelete } from 'react-icons/ai'
import { TfiReload } from 'react-icons/tfi'
import '@animxyz/core'
import Chart from "chart.js";
import Head from 'next/head'
const AdminCMS = () => {
    let cmsData = [{ "title": "Contact", "overview": "contact us through the page", id: "cms-contact" }, { "title": "About", "overview": "About our company", id: "cms-about" }, { "title": "Services", "overview": "We provides best services", id: "cms-service" },{ "title": "FAQ", "overview": "Frequently Asked Questions", id: "cms-faq" },  ]

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
                for (let data of cmsData) {
                    if (data.title.toLowerCase().match(keyword) || data.overview.toLowerCase().match(keyword)) {
                        if (!result.includes(data.id)) {
                            result.push(data.id);
                        }
                    }
                }
            }
            for (let data of cmsData) {
                document.querySelector(`#${data.id}`).classList.add("hidden");
            }
            for (let data of result) {
                document.querySelector(`#${data}`).classList.remove("hidden");
            }
        }
    }
    return (
        <>
            <div className="w-full p-4 overflow-y-auto">
                <div className="w-full flex justify-between">
                    <h6 className=" font-semibold">CMS Pages</h6>
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
                            <td className='p-1 border-l px-2 uppercase font-semibold'>Page</td>
                            <td className='p-1 border-l px-2 uppercase font-semibold'>Overview</td>
                            <td className='p-1 border-l px-2 uppercase font-semibold'>Action</td>
                        </thead>
                        <tbody>
                            <tr id='cms-contact' className='border-b border-l border-r'>
                                <td className='p-1 text-center'>1</td>
                                <td className='p-1 border-l px-2'>Contact</td>
                                <td className='p-1 border-l px-2'>contact us through the page</td>
                                <td className='p-1 border-l px-2'>
                                    <div className="flex items-center">
                                        <button className='px-2 py-1 border rounded hover:bg-gray-100'>
                                            <MdOutlineEdit />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                            <tr id='cms-about' className='border-b border-l border-r'>
                                <td className='p-1 text-center'>2</td>
                                <td className='p-1 border-l px-2'>About</td>
                                <td className='p-1 border-l px-2'>About our company</td>
                                <td className='p-1 border-l px-2'>
                                    <div className="flex items-center">
                                        <button className='px-2 py-1 border rounded hover:bg-gray-100'>
                                            <MdOutlineEdit />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                            <tr id='cms-service' className='border-b border-l border-r'>
                                <td className='p-1 text-center'>3</td>
                                <td className='p-1 border-l px-2'>Services</td>
                                <td className='p-1 border-l px-2'>We provides best services</td>
                                <td className='p-1 border-l px-2'>
                                    <div className="flex items-center">
                                        <button className='px-2 py-1 border rounded hover:bg-gray-100'>
                                            <MdOutlineEdit />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                            <tr id='cms-faq' className='border-b border-l border-r'>
                                <td className='p-1 text-center'>4</td>
                                <td className='p-1 border-l px-2'>FAQ</td>
                                <td className='p-1 border-l px-2'>Frequently Asked Questions</td>
                                <td className='p-1 border-l px-2'>
                                    <div className="flex items-center">
                                        <button className='px-2 py-1 border rounded hover:bg-gray-100'>
                                            <MdOutlineEdit />
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

export default AdminCMS