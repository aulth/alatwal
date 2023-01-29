import React, { useEffect } from 'react'
import { parse, stringify } from 'flatted';
import { MdClose, MdCheck, MdOutlineEdit } from 'react-icons/md'
import { AiOutlineSwap, AiOutlineDelete } from 'react-icons/ai'
import { TfiReload } from 'react-icons/tfi'
import '@animxyz/core'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Chart from "chart.js";
import Head from 'next/head'
import Link from 'next/link';
const Category = ({ category, fetchCategory }) => {
    let categoryArray = [];
    if (category) {
        for (let item of category) {
            categoryArray.push(item.title.toLowerCase().split(" ").join("-"));
        }
    }
    const performSearch = (e) => {
        e.preventDefault();
        let query = e.target.value.toLowerCase().split(" ");;
        let result = [];
        if (typeof window !== 'undefined') {
            for (let keyword of query) {
                for (let category of categoryArray) {
                    if (category.match(keyword)) {
                        if (!result.includes(category)) {
                            result.push(category);
                        }
                    }
                }
            }
            for (let category of categoryArray) {
                document.querySelector(`#${category}`).classList.add("hidden");
            }
            for (let category of result) {
                document.querySelector(`#${category}`).classList.remove("hidden");
            }
        }
    }
    const updateStatus = async (title, image, status, type, id, description) => {
        if (typeof window !== 'undefined') {
            const response = await fetch("/api/category/update", {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({ title: title, image: image, status: status, type: type, description: description, authtoken: localStorage.getItem('alatwal-admin'), id: id })
            })
            const responseData = await response.json();
            if (responseData.success) {
                toast.success(responseData.msg)
                fetchCategory();
            } else {
                toast.info(responseData.msg);
            }
        }
    }
    const deleteCategory = async (url) => {
        if (typeof window !== 'undefined') {
            const response = await fetch("/api/category/delete", {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({ url: url, authtoken: localStorage.getItem('alatwal-admin') })
            })
            const responseData = await response.json();
            if (responseData.success) {
                toast.success(responseData.msg)
                fetchCategory();
            } else {
                toast.info(responseData.msg);
            }
        }
    }
    return (
        <>
            <Head>
                <title>Categories</title>
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
            <ToastContainer />
            <div className="w-full p-4 overflow-y-auto">
                <div className="w-full flex justify-between">
                    <h6 className=" font-semibold">Category</h6>
                    <button className="flex items-center text-[#1F41AF]"> <TfiReload className='mx-2' /> Reload Data</button>
                </div>
                <div className="w-full flex justify-between items-center my-4 rounded border border-gray-300">
                    <input onChange={performSearch} type="text" className='w-full h-full p-2 border-none focus:outline-none' />
                    <button className='p-2 bg-[#1F41AF] rounded-r px-3 text-[white]'>Search</button>
                </div>
                <div className="w-full flex flex-wrap items-center justify-start my-2 box-border">
                    {/* Card  */}
                    {
                        category && category.length > 0 && category.map((category, index) => {
                            return <div key={index} id={category.title.toLowerCase().split(" ").join("-")} className='lg:w-[23%] md:w--[48%] w-full m-1 mx-2  flex justify-center items-center relative hover:drop-shadow-xl h-48 hover:scale-105 cursor-pointer duration-150'>
                                <div className=" absolute top-0 w-[92%] h-44 border border-gray-300 rounded-lg z-0 bg-gray-50  drop-shadow-xl"></div>
                                <div className=" absolute top-0 w-full h-40 border border-gray-300 rounded-lg z-10 bg-white drop-shadow-xl p-4 flex flex-col justify-between">
                                    <div className="w-full flex justify-between items-center">
                                        <img src={category.image[0]} className='w-[30px] h-[30px]' alt="" />
                                        <button className={`px-[6px] py-[3px] rounded-lg ${category.status == 'active' ? 'bg-[rgb(132,204,22)]' : 'bg-[rgb(231,153,44)]'} text-white flex items-center font-semibold text-[12px]`}>
                                            {category.status == 'active' ? 'Active' : "Inactive"} <MdCheck className=' text-white ml-1' />
                                        </button>
                                    </div>
                                    <div className="w-full">
                                        <span className='text-xl font-bold font-[helvetica] block'>{category.title}</span>
                                        <div className='w-full flex items-center border-t border-b border-gray-300 mt-2'>
                                            <button onClick={() => { updateStatus(category.title, category.image, category.status == 'active' ? 'inactive' : 'active', category.type, category._id, category.description ? category.description : 'Lorem ipsum default') }} className='w-1/3 p-1 flex justify-center items-center border-r border-gray-300 hover:bg-gray-100'>
                                                <AiOutlineSwap />
                                            </button>
                                            <Link className='w-1/3 p-1 flex justify-center items-center hover:bg-gray-100' href={`/admin/category/edit/${category.url}`}><button >
                                                <MdOutlineEdit />
                                            </button></Link>
                                            <button onClick={() => { deleteCategory(category.url) }} className='w-1/3 p-1 flex justify-center items-center border-l border-gray-300 hover:bg-gray-100'>
                                                <AiOutlineDelete />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        })
                    }



                </div>
            </div>
        </>
    )
}

export default Category