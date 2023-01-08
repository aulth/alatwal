import React, { useEffect } from 'react'
import { MdClose, MdCheck, MdOutlineEdit } from 'react-icons/md'
import { AiOutlineSwap, AiOutlineDelete } from 'react-icons/ai'
import { TfiReload } from 'react-icons/tfi'
import '@animxyz/core'
import Chart from "chart.js";
import Head from 'next/head'
const AdminPackages = () => {
    let packageData = [{ "package": "Packages 1", "tour": "Burj Khalifa Tour 1", id: "package-1" },{ "package": "Packages 1", "tour": "Dhow Cruise Tour 1", id: "package-2" },{ "package": "Packages 2", "tour": "Burj Khalifa Tour 1", id: "package-3" }]

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
                for (let packageItem of packageData) {
                    if (packageItem.package.toLowerCase().match(keyword) || packageItem.tour.toLowerCase().match(keyword)) {
                        if (!result.includes(packageItem.id)) {
                            result.push(packageItem.id);
                        }
                    }
                }
            }
            for (let packageItem of packageData) {
                document.querySelector(`#${packageItem.id}`).classList.add("hidden");
            }
            for (let packageItem of result) {
                document.querySelector(`#${packageItem}`).classList.remove("hidden");
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
                            <td className='p-1 border-l px-2 uppercase font-semibold'>Packages</td>
                            <td className='p-1 border-l px-2 uppercase font-semibold'>Tour</td>
                            <td className='p-1 border-l px-2 uppercase font-semibold'>Tour Creation</td>
                            <td className='p-1 border-l px-2 uppercase font-semibold'>Price</td>
                            <td className='p-1 border-l px-2 uppercase font-semibold'>Action</td>
                        </thead>
                        <tbody>
                            <tr id='package-1' className='border-b border-l border-r'>
                                <td className='p-1 text-center'>1</td>
                                <td className='p-1 border-l px-2'>Packages 1</td>
                                <td className='p-1 border-l px-2'>Burj Khalifa Tour 1</td>
                                <td className='p-1 border-l px-2'>07-01-2023</td>
                                <td className='p-1 border-l px-2'>Starting From AED 200</td>
                                <td className='p-1 border-l px-2 flex justify-center items-center'>
                                    <div className="flex items-center">
                                        <button className='px-2 py-[3px]  border hover:bg-gray-100 text-[12px]'>
                                            Transport
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
                            <tr id='package-2' className='border-b border-l border-r'>
                                <td className='p-1 text-center'>2</td>
                                <td className='p-1 border-l px-2'>Packages 1</td>
                                <td className='p-1 border-l px-2'>Dhow Cruise Tour 1</td>
                                <td className='p-1 border-l px-2'>07-01-2023</td>
                                <td className='p-1 border-l px-2'>Starting From AED 200</td>
                                <td className='p-1 border-l px-2 flex justify-center items-center'>
                                    <div className="flex items-center">
                                        <button className='px-2 py-[3px]  border hover:bg-gray-100 text-[12px]'>
                                            Transport
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
                            <tr id='package-3' className='border-b border-l border-r'>
                                <td className='p-1 text-center'>3</td>
                                <td className='p-1 border-l px-2'>Packages 2</td>
                                <td className='p-1 border-l px-2'>Burj Khalifa Tour 1</td>
                                <td className='p-1 border-l px-2'>07-01-2023</td>
                                <td className='p-1 border-l px-2'>Starting From AED 200</td>
                                <td className='p-1 border-l px-2 flex justify-center items-center'>
                                    <div className="flex items-center">
                                        <button className='px-2 py-[3px]  border hover:bg-gray-100 text-[12px]'>
                                            Transport
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

export default AdminPackages