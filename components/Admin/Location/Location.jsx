import React, { useEffect } from 'react'
import { MdClose, MdCheck, MdOutlineEdit} from 'react-icons/md'
import { AiOutlineSwap, AiOutlineDelete } from 'react-icons/ai'
import { TfiReload } from 'react-icons/tfi'
import '@animxyz/core'
import Chart from "chart.js";
import Head from 'next/head'
import { ToastContainer, toast } from 'react-toastify';
import Link from 'next/link'
import 'react-toastify/dist/ReactToastify.css';
const Location = ({ location, fetchLocation }) => {
    let locationData = []
    if(location){
        for (let item of location){
            locationData.push({title:item.title.toLowerCase().split(" ").join("-"), country:item.country.toLowerCase().split(" ").join("-")});
            console.log(locationData)
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
                for (let location of locationData) {
                    if (location.title.match(keyword) || location.country.match(keyword)) {
                        if (!result.includes(location.title)) {
                            result.push(location.title);
                        }
                    }
                }
            }
            for (let location of locationData) {
                document.querySelector(`#${location.title}`).classList.add("hidden");
            }
            for (let location of result) {
                document.querySelector(`#${location}`).classList.remove("hidden");
            }
        }
    }
    const updateStatus = async (title, image, status, country, featured, id)=>{
        if(typeof window!=='undefined'){
            const response = await fetch("/api/location/update", {
                method:'POST',
                headers:{
                    'content-type':'application/json'
                },
                body:JSON.stringify({title:title, image:image, status:status, country:country, featured:featured, authtoken:localStorage.getItem('alatwal-admin'), id:id })
            })
            const responseData = await response.json();
            console.log(responseData);
            if(responseData.success){
                toast.success(responseData.msg)
                fetchLocation();
            }else{
                toast.info(responseData.msg);
            }
        }
    }
    const deleteLocation = async (id)=>{
        if(typeof window!=='undefined'){
            const response = await fetch("/api/location/delete", {
                method:'POST',
                headers:{
                    'content-type':'application/json'
                },
                body:JSON.stringify({id:id, authtoken:localStorage.getItem('alatwal-admin') })
            })
            const responseData = await response.json();
            console.log(responseData);
            if(responseData.success){
                toast.success(responseData.msg)
                fetchLocation();
            }else{
                toast.info(responseData.msg);
            }
        }
    }
    return (
        <>
        <ToastContainer/>
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
                        location && location.length>0 && location.map((item, index)=>{
                            return <div key={index} id={item.title.toLowerCase().split(" ").join("-")} className='lg:w-[23%] md:w--[48%] w-full m-1 mx-2  flex justify-center items-center relative hover:drop-shadow-xl h-48 hover:scale-105 cursor-pointer duration-150'>
                            <div className={`absolute top-0 w-full h-40 border border-gray-300 rounded-lg z-0 bg-white drop-shadow-xl flex flex-col justify-between`}>
                                <img src={item.image[0]} className='w-full h-full object-cover object-center rounded ' alt="" />
                            </div>
                            <div className={`absolute top-0 w-full h-40 border border-gray-300 rounded-lg z-0 drop-shadow-xl flex flex-col justify-between bg-gradient-to-b from-transparent to-black`}>
                            </div>
                            <div className={`absolute top-0 w-full h-40 border border-gray-300 rounded-lg z-10 bg-transparent drop-shadow-xl p-4 flex flex-col justify-between`}>
                                <div className="w-full flex justify-between items-center">
                                    <button onClick={()=>{updateStatus(item.title,item.image, item.status=='active'?'inactive':'active', item.country, item.featured, item._id)}} className={`px-[6px] py-[3px] rounded-lg ${item.status=='active'?'bg-[rgb(132,204,22)]':'bg-[rgb(231,153,44)]'} text-white flex items-center font-semibold text-[12px]`}>
                                    {item.status=='active'?'Active':"Inactive"}  <MdCheck className=' text-white ml-1' />
                                    </button>
                                    <div className='flex items-center'>
                                    <button onClick={()=>{deleteLocation(item._id)}} className='hover:text-white text-gray-200 duration-100 mx-2'>
                                        <AiOutlineDelete />
                                    </button>
                                    <Link href={`/admin/location/edit/${item.url}`} className='hover:text-white text-gray-200 duration-100'>
                                        <MdOutlineEdit />
                                    </Link>
                                    </div>
                                </div>
                                <div className="w-full text-white">
                                    <span className='text-xl font-bold font-[helvetica] block'>{item.title}</span>
                                    <span className='block font-semibold text-gray-300'>{item.country}</span>
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

export default Location