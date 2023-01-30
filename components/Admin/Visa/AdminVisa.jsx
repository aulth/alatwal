import React, { useEffect, useState } from 'react'
import { MdClose, MdCheck, MdOutlineEdit } from 'react-icons/md'
import { AiOutlineSwap, AiOutlineDelete } from 'react-icons/ai'
import {IoMdClose} from 'react-icons/io'
import { TfiReload } from 'react-icons/tfi'
import '@animxyz/core'
import Chart from "chart.js";
import Head from 'next/head'
import Link from 'next/link'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
const AdminVisa = () => {
    const [visaData, setVisaData] = useState();
    const fetchVisa = async () => {
        const response = await fetch('/api/visa/fetch');
        const json = await response.json();
        if (json.success) {
            setVisaData(json.visa);
        } else {
            console.log(json.msg);
        }
    }
    useEffect(() => {
        fetchVisa();
    }, [])
    const updateStaus = async (url, status) => {
        if(typeof window!=='undefined'){
            const response = await fetch('/api/visa/updatestatus', {
                method:'POST',
                headers:{
                    'content-type':'application/json',
                },
                body:JSON.stringify({data:{url:url, status:status}, authtoken:localStorage.getItem('alatwal-admin')})
            })
            const json = await response.json();
            if(json.success){
                toast.success(json.msg);
                fetchVisa();
            }else{
                toast.error(json.msg);
            }
        }
    }
    const performSearch = (e) => {
        e.preventDefault();
        let query = e.target.value.toLowerCase().split(" ");;
        let result = [];
        if (typeof window !== 'undefined') {
            for (let keyword of query) {
                for (let visa of visaData) {
                    if (visa.type.toLowerCase().match(keyword) || visa.title.toLowerCase().match(keyword)) {
                        if (!result.includes(visa.url)) {
                            result.push(visa.url);
                        }
                    }
                }
            }
            for (let visa of visaData) {
                document.querySelector(`#${visa.url}`).classList.add("hidden");
            }
            for (let visa of result) {
                document.querySelector(`#${visa}`).classList.remove("hidden");
            }
        }
    }
    return (
        <>
        <Head>
                <title>Visas - Alatwal</title>
                <meta name="title" content="AlAtwal Visa" />
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
        <ToastContainer/>
            <div className="w-full p-4 overflow-y-auto">
                <div className="w-full flex justify-between">
                    <h6 className=" font-semibold">Visas</h6>
                    <button className="flex items-center text-[#1F41AF]"> <TfiReload className='mx-2' /> Reload Data</button>
                </div>
                <div className="w-full flex justify-between items-center my-4 rounded border border-gray-300">
                    <input onChange={performSearch} type="text" className='w-full h-full p-2 border-none focus:outline-none' />
                    <button className='p-2 bg-[#1F41AF] rounded-r px-3 text-[white]'>Search</button>
                </div>
                <div className="w-full flex flex-wrap items-center justify-start my-2 box-border">
                    {/* Card  */}
                    {
                        visaData && visaData.length>0 &&
                        visaData.map((visa, index)=>{
                            return <div key={index} id={visa.url} className='lg:w-[23%] md:w--[48%] w-full m-1 mx-2  flex justify-center items-center relative hover:drop-shadow-xl h-48 hover:scale-105 cursor-pointer duration-150'>
                            <div className={`absolute top-0 w-full h-40 border border-gray-300 rounded-lg z-0 bg-white drop-shadow-xl flex flex-col justify-between`}>
                                <img src={visa.image[0]} className='w-full h-full object-cover object-center rounded ' alt="" />
                            </div>
                            <div className={`absolute top-0 w-full h-40 border border-gray-300 rounded-lg z-0 drop-shadow-xl flex flex-col justify-between bg-gradient-to-b from-transparent to-black`}>
                            </div>
                            <div className={`absolute top-0 w-full h-40 border border-gray-300 rounded-lg z-10 bg-transparent drop-shadow-xl p-4 flex flex-col justify-between`}>
                                <div className="w-full flex justify-between items-center">
                                    <button  onClick={()=>{updateStaus(visa.url, visa.status=='active'?'inactive':'active')}} className={`px-[6px] py-[3px] rounded-lg  ${visa.status == 'active' ? 'bg-[rgb(132,204,22)]' : 'bg-[rgb(231,153,44)]'} text-white flex items-center font-semibold text-[12px]`}>
                                        {visa.status=='active'?'Active':'Inactive'} {visa.status=='active'?<MdCheck className=' text-white ml-1' />:<IoMdClose className=' text-white ml-1' />}
                                    </button>
                                    <Link href={`/admin/visas/edit/${visa.url}`} className='hover:text-white text-gray-200 duration-100'>
                                        <MdOutlineEdit />
                                    </Link>
                                </div>
                                <div className="w-full text-white">
                                    <span className='text-xl font-bold font-[helvetica] block'>{visa.title}</span>
                                    <span className='block font-semibold text-gray-300'>{visa.description.slice(0,45)}...</span>
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

export default AdminVisa