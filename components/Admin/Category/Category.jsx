import React, { useEffect } from 'react'
import { MdClose, MdCheck , MdOutlineEdit} from 'react-icons/md'
import {AiOutlineSwap, AiOutlineDelete} from 'react-icons/ai'
import { TfiReload } from 'react-icons/tfi'
import '@animxyz/core'
import Chart from "chart.js";
import Head from 'next/head'
const Category = () => {
    let categoryArray = ["uae-tour", "uae-visa", "international-visa"];
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
                for(let category of categoryArray){
                    if(category.match(keyword)){
                        if(!result.includes(category)){
                          result.push(category);  
                        }
                    }
                }
            }
            for(let category of categoryArray){
                document.querySelector(`#${category}`).classList.add("hidden");
            }
            for(let category of result){
                document.querySelector(`#${category}`).classList.remove("hidden");
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
                            <div id='uae-visa' className='lg:w-[23%] md:w--[48%] w-full m-1 mx-2  flex justify-center items-center relative hover:drop-shadow-xl h-48 hover:scale-105 cursor-pointer duration-150'>
                                <div className=" absolute top-0 w-[92%] h-44 border border-gray-300 rounded-lg z-0 bg-gray-50  drop-shadow-xl"></div>
                                <div className=" absolute top-0 w-full h-40 border border-gray-300 rounded-lg z-10 bg-white drop-shadow-xl p-4 flex flex-col justify-between">
                                    <div className="w-full flex justify-between items-center">
                                        <img src="/images/visa-uae.png" className='w-[30px] h-[30px]' alt="" />
                                        <button className="px-[6px] py-[3px] rounded-lg bg-[rgb(132,204,22)] text-white flex items-center font-semibold text-[12px]">
                                            Active <MdCheck className=' text-white ml-1' />
                                        </button>
                                    </div>
                                    <div className="w-full">
                                        <span className='text-xl font-bold font-[helvetica] block'>UAE Visa</span>
                                        <div className='w-full flex items-center border-t border-b border-gray-300 mt-2'>
                                            <button className='w-1/3 p-1 flex justify-center items-center border-r border-gray-300 hover:bg-gray-100'>
                                                <AiOutlineSwap />
                                            </button>
                                            <button className='w-1/3 p-1 flex justify-center items-center hover:bg-gray-100'>
                                                <MdOutlineEdit />
                                            </button>
                                            <button className='w-1/3 p-1 flex justify-center items-center border-l border-gray-300 hover:bg-gray-100'>
                                                <AiOutlineDelete />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Card  */}
                            <div id='uae-tour' className='lg:w-[23%] md:w--[48%] w-full m-1  mx-2 flex justify-center items-center relative hover:drop-shadow-xl h-48 hover:scale-105 cursor-pointer duration-150'>
                                <div className=" absolute top-0 w-[92%] h-44 border border-gray-300 rounded-lg z-0 bg-gray-50  drop-shadow-xl"></div>
                                <div className=" absolute top-0 w-full h-40 border border-gray-300 rounded-lg z-10 bg-white drop-shadow-xl p-4 flex flex-col justify-between">
                                    <div className="w-full flex justify-between items-center">
                                        <img src="/images/travel-icon.png" className='w-[30px] h-[30px]' alt="" />
                                        <button className="px-[6px] py-[3px] rounded-lg bg-[rgb(132,204,22)] text-white flex items-center font-semibold text-[12px]">
                                            Active <MdCheck className=' text-white ml-1' />
                                        </button>
                                    </div>
                                    <div className="w-full">
                                        <span className='text-xl font-bold font-[helvetica] block'>UAE Tours</span>
                                        <div className='w-full flex items-center border-t border-b border-gray-300 mt-2'>
                                            <button className='w-1/3 p-1 flex justify-center items-center border-r border-gray-300 hover:bg-gray-100'>
                                                <AiOutlineSwap />
                                            </button>
                                            <button className='w-1/3 p-1 flex justify-center items-center hover:bg-gray-100'>
                                                <MdOutlineEdit />
                                            </button>
                                            <button className='w-1/3 p-1 flex justify-center items-center border-l border-gray-300 hover:bg-gray-100'>
                                                <AiOutlineDelete />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Card  */}
                            <div id='international-visa' className='lg:w-[23%] md:w--[48%] w-full m-1  mx-2 flex justify-center items-center relative hover:drop-shadow-xl h-48 hover:scale-105 cursor-pointer duration-150'>
                                <div className=" absolute top-0 w-[92%] h-44 border border-gray-300 rounded-lg z-0 bg-gray-50  drop-shadow-xl"></div>
                                <div className=" absolute top-0 w-full h-40 border border-gray-300 rounded-lg z-10 bg-white drop-shadow-xl p-4 flex flex-col justify-between">
                                    <div className="w-full flex justify-between items-center">
                                        <img src="/images/passport.png" className='w-[30px] h-[30px]' alt="" />
                                        <button className="px-[6px] py-[3px] rounded-lg bg-[rgb(132,204,22)] text-white flex items-center font-semibold text-[12px]">
                                            Active <MdCheck className=' text-white ml-1' />
                                        </button>
                                    </div>
                                    <div className="w-full">
                                        <span className='text-xl font-bold font-[helvetica] block'>International Visa</span>
                                        <div className='w-full flex items-center border-t border-b border-gray-300 mt-2'>
                                            <button className='w-1/3 p-1 flex justify-center items-center border-r border-gray-300 hover:bg-gray-100'>
                                                <AiOutlineSwap />
                                            </button>
                                            <button className='w-1/3 p-1 flex justify-center items-center hover:bg-gray-100'>
                                                <MdOutlineEdit />
                                            </button>
                                            <button className='w-1/3 p-1 flex justify-center items-center border-l border-gray-300 hover:bg-gray-100'>
                                                <AiOutlineDelete />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    </div>
    </>
  )
}

export default Category