import React, { useEffect } from 'react'
import { MdClose, MdCheck, MdOutlineEdit } from 'react-icons/md'
import { AiOutlineSwap, AiOutlineDelete } from 'react-icons/ai'
import { TfiReload } from 'react-icons/tfi'
import '@animxyz/core'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import Chart from "chart.js";
import Link from 'next/link'
import Head from 'next/head'
const AdminTours = ({ tour, fetchTour }) => {
    let tourData = []
    if(tour){
        for (let item of tour){
            tourData.push({title:item.title.toLowerCase().split(" ").join("-"), category:item.categoryTitle.toLowerCase().split(" ").join("-"), id:item._id});
        }
    }
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
                document.querySelector(`#tour-${tour.id}`).classList.add("hidden");
            }
            for (let tour of result) {
                document.querySelector(`#tour-${tour}`).classList.remove("hidden");
            }
        }
    }
    const updateStatus = async (title, overview, highlights, availability, status, description, category, categoryTitle, duration, adultRate, childRate, infantRate, startingTime, tourLanguage, transferOption, importantInformation, bookingPolicy, covid19, tourVideo, tourAddress, googleMapLocation, featuredTour, paymentMethod, id, image, basic, platinum, explorer)=>{
        if(typeof window!=='undefined'){
            const response = await fetch("/api/tour/update", {
                method:'POST',
                headers:{
                    'content-type':'application/json'
                },
                body:JSON.stringify({title, overview, highlights, availability, status, description, category, categoryTitle, duration, adultRate, childRate, infantRate, startingTime, tourLanguage, transferOption, importantInformation, bookingPolicy, covid19, tourVideo, tourAddress, googleMapLocation, featuredTour, paymentMethod, authtoken:localStorage.getItem('alatwal-admin'), id:id , image:image, basic:basic, platinum:platinum, explorer:explorer})
            })
            const responseData = await response.json();
            if(responseData.success){
                toast.success(responseData.msg)
                fetchTour();
            }else{
                toast.info(responseData.msg);
            }
        }
    }
    const deleteTour = async (id)=>{
        if(typeof window!=='undefined'){
            const response = await fetch("/api/tour/delete", {
                method:'POST',
                headers:{
                    'content-type':'application/json'
                },
                body:JSON.stringify({id:id, authtoken:localStorage.getItem('alatwal-admin') })
            })
            const responseData = await response.json();
            if(responseData.success){
                toast.success(responseData.msg)
                fetchTour();
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
                            {
                                tour && tour.length>0 && 
                                tour.map((tour, index)=>{
                                    return <tr key={index} id={`tour-${tour._id}`} className='border-b border-l border-r'>
                                    <td className='p-1 text-center'>{index+1}</td>
                                    <td className='p-1 border-l px-2 flex items-center'>{tour.title} {tour.basic?<img className='w-4 h-4 mx-1' src='https://img.icons8.com/ultraviolet/40/null/star-half-empty.png'  />:tour.platinum?<img className='w-4 h-4 mx-1' src='https://img.icons8.com/external-bearicons-gradient-bearicons/64/null/external-Platinum-miscellany-texts-and-badges-bearicons-gradient-bearicons.png' />:tour.explorer?<img className='w-4 h-4 mx-1' src='https://img.icons8.com/color-glass/48/null/sparkling-diamond--v1.png'  />:''}</td>
                                    <td className='p-1 border-l px-2'>{tour.categoryTitle}</td>
                                    <td className='p-1 border-l px-2'>{tour.location}</td>
                                    <td className='p-1 border-l px-2'>{tour.availability.split('')[0].toUpperCase()+tour.availability.split('').slice(1).join('')}</td>
                                    <td className='p-1 border-l px-2 text-center'><button className={`px-2 py-1 ${tour.status=='active'?'bg-green-400':'bg-orange-400'} rounded text-[12px] text-white`}>{tour.status=='active'?'Active':'Inactive'}</button></td>
                                    <td className='p-1 border-l px-2 flex justify-center items-center'>
                                        <div className="flex items-center">
                                            <button onClick={()=>{updateStatus(tour.title, tour.overview, tour.highlights, tour.availability, tour.status=='active'?'inactive':'active', tour.description, tour.category, tour.categoryTitle, tour.duration, tour.adultRate, tour.childRate, tour.infantRate, tour.startingTime, tour.tourLanguage, tour.transferOption, tour.importantInformation, tour.bookingPolicy, tour.covid19, tour.tourVideo, tour.tourAddress, tour.googleMapLocation, tour.featuredTour, tour.paymentMethod, tour._id, tour.image, tour.basic?true:false, tour.platinum?true:false, tour.explorer?true:false )}} className='px-2 py-1 border rounded-l hover:bg-gray-100'>
                                                <AiOutlineSwap />
                                            </button>
                                            <button  onClick={()=>{deleteTour(tour._id)}} className='px-2 py-1 border-r border-t border-b hover:bg-gray-100'>
                                                <AiOutlineDelete />
                                            </button>
                                            <Link href={`/admin/tours/edit/${tour.basic?"basic/":tour.platinum?"platinum/":tour.explorer?"explorer/":""}${tour.url}`} className='px-2 py-1 border-r border-t border-b rounded-r hover:bg-gray-100'>
                                                <MdOutlineEdit />
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                                })
                            }
                            
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default AdminTours