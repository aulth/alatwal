import React, { useEffect } from 'react'
import { MdClose, MdCheck , MdOutlineEdit} from 'react-icons/md'
import {AiOutlineSwap, AiOutlineDelete} from 'react-icons/ai'
import { TfiReload } from 'react-icons/tfi'
import '@animxyz/core'
import Chart from "chart.js";
import Head from 'next/head'
const Location = () => {
    let locationData = [{"title":"dubai", "country":"united-arab-emirates"}, {"title":"abu-dhabi", "country":"united-arab-emirates"}]
    
    useEffect(() => {
        if (typeof window !== 'undefined') {
        }
    }, [])


    const performSearch = (e)=>{
        e.preventDefault();
        let query = e.target.value.toLowerCase().split(" ");;
        let result = [];
        if(typeof window!=='undefined'){
            for(let keyword of query){
                for(let location of locationData){
                    if(location.title.match(keyword) || location.country.match(keyword)){
                        if(!result.includes(location.title)){
                          result.push(location.title);  
                        }
                    }
                }
            }
            for(let location of locationData){
                document.querySelector(`#${location.title}`).classList.add("hidden");
            }
            for(let location of result){
                document.querySelector(`#${location}`).classList.remove("hidden");
            }
        }
    }
  return (
    <>
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
                            <div id='dubai'  className='lg:w-[23%] md:w--[48%] w-full m-1 mx-2  flex justify-center items-center relative hover:drop-shadow-xl h-48 hover:scale-105 cursor-pointer duration-150'>
                                <div className={`absolute top-0 w-full h-40 border border-gray-300 rounded-lg z-0 bg-white drop-shadow-xl flex flex-col justify-between`}>
                                    <img src="https://rstrip4u.com/uploads/locations/1615736066_ummalquwain.png" className='w-full h-full object-cover object-center rounded ' alt="" />
                                </div>
                                <div className={`absolute top-0 w-full h-40 border border-gray-300 rounded-lg z-0 drop-shadow-xl flex flex-col justify-between bg-gradient-to-b from-transparent to-black`}>
                                </div>
                                <div className={`absolute top-0 w-full h-40 border border-gray-300 rounded-lg z-10 bg-transparent drop-shadow-xl p-4 flex flex-col justify-between`}>
                                    <div className="w-full flex justify-between items-center">
                                        <button className="px-[6px] py-[3px] rounded-lg bg-[rgb(132,204,22)] text-white flex items-center font-semibold text-[12px]">
                                            Active <MdCheck className=' text-white ml-1' />
                                        </button>
                                        <button className='hover:text-white text-gray-200 duration-100'>
                                                <MdOutlineEdit />
                                            </button>
                                    </div>
                                    <div className="w-full text-white">
                                        <span className='text-xl font-bold font-[helvetica] block'>Dubai</span>
                                        <span className='block font-semibold text-gray-300'>United Arab Emirates</span>
                                    </div>
                                </div>
                            </div>
                             {/* Card  */}
                             <div id='abu-dhabi'  className='lg:w-[23%] md:w--[48%] w-full m-1 mx-2  flex justify-center items-center relative hover:drop-shadow-xl h-48 hover:scale-105 cursor-pointer duration-150 dubai united-arab-emirates'>
                                <div className={`absolute top-0 w-full h-40 border border-gray-300 rounded-lg z-0 bg-white drop-shadow-xl flex flex-col justify-between`}>
                                    <img src="https://rstrip4u.com/uploads/locations/1615730036_abudhabi.png" className='w-full h-full object-cover object-center rounded ' alt="" />
                                </div>
                                <div className={`absolute top-0 w-full h-40 border border-gray-300 rounded-lg z-0 drop-shadow-xl flex flex-col justify-between bg-gradient-to-b from-transparent to-black`}>
                                </div>
                                <div className={`absolute top-0 w-full h-40 border border-gray-300 rounded-lg z-10 bg-transparent drop-shadow-xl p-4 flex flex-col justify-between`}>
                                    <div className="w-full flex justify-between items-center">
                                        <button className="px-[6px] py-[3px] rounded-lg bg-[rgb(132,204,22)] text-white flex items-center font-semibold text-[12px]">
                                            Active <MdCheck className=' text-white ml-1' />
                                        </button>
                                        <button className='hover:text-white text-gray-200 duration-100'>
                                                <MdOutlineEdit />
                                            </button>
                                    </div>
                                    <div className="w-full text-white">
                                        <span className='text-xl font-bold font-[helvetica] block'>Abu Dhabi</span>
                                        <span className='block font-semibold text-gray-300'>United Arab Emirates</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
    </>
  )
}

export default Location