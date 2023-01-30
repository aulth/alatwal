import React, { useEffect, useState } from 'react'
import { MdClose, MdCheck, MdOutlineEdit, MdFileDownloadDone } from 'react-icons/md'
import { IoAdd } from 'react-icons/io5'
import { AiOutlineSwap, AiOutlineDelete } from 'react-icons/ai'
import { TfiReload } from 'react-icons/tfi'
import { BiImageAdd } from 'react-icons/bi'
import UploadImage from '../Upload/UploadImage'
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router'
import { ToastContainer, toast } from 'react-toastify';
import '@animxyz/core'
import Head from 'next/head'
const AddNewLocation = ({locationUrl}) => {
    const router = useRouter();
    const [locationData, setLocationData] = useState({title:'', country:'', featured:'yes',  status:'active', id:''});
    const [image, setImage] = useState([]);
    const handleOnChange = (e)=>{
        e.preventDefault();
        setLocationData({...locationData, [e.target.name]:e.target.value});
    }
    const fetchLocation = async ()=>{
        if(typeof window!=='undefined'){
            const response = await fetch('/api/location/fetchone', {
                method:'POST',
                headers:{
                    'content-type':'application/json'
                },
                body:JSON.stringify({url:locationUrl})
            })
            const responseData = await response.json();
            if(responseData.success){
                setLocationData({title:responseData.location.title, status:responseData.location.status, country:responseData.location.country, featured:responseData.location.featured, id:responseData.location._id });
                setImage(responseData.location.image)
            }
        }
    }
    useEffect(() => {
        fetchLocation();
      }, [])

    const handleOnEdit = async (e)=>{
        e.preventDefault();
        if(typeof window!=='undefined'){
            if(!locationData.title || !image || !locationData.status || !locationData.featured || !locationData.country || !locationData.id){
                toast.info("All fields required");
                return;
            }
            const add = await fetch('/api/location/update', {
                method:"POST",
                headers:{
                    'content-type':'application/json'
                },
                body:JSON.stringify({title:locationData.title, image:image, status:locationData.status, country:locationData.country, featured:locationData.featured , id:locationData.id , authtoken:localStorage.getItem('alatwal-admin')})
            })
            const addData = await add.json();
            if(!addData.success){
                toast.error(addData.msg);
                return;
            }
            toast.success("Edited Succesfully");
            router.push("/admin/location");
        }
    }
    return (
        <>
         <Head>
                <title>Edit Location</title>
                <meta name="title" content="Edit Location"/>
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
            {
                locationData && image && 
                <>
                <div className="w-full flex justify-between">
                    <h6 className=" font-semibold">Add New Location</h6>
                    <button className="flex items-center text-[#1F41AF]"> <span className='text-gray-700 mr-1'>Location</span> / Add</button>
                </div>
                <div className="w-full rounded border border-gray-300  my-6 box-border">
                    <h5 className="text-2xl font-semibold p-4 text-left border-b border-gray-300">Add New Location</h5>
                    <form onSubmit={handleOnEdit} className='w-full p-4 ' action="">
                        <div className="w-full flex flex-col md:flex-row md:justify-between mb-6">
                            <label className='font-semibold flex items-center mr-2 md:mb-0 mb-1 w-20' htmlFor="">Title  <sup className='text-red-600'>*</sup></label>
                            <input name='title' value={locationData.title} onChange={handleOnChange} type="text" className='w-full focus:outline focus:outline-blue-400 p-1 rounded border' />
                        </div>
                        <div className="w-full flex flex-col md:flex-row md:justify-between mb-6">
                            <label className='font-semibold flex items-center mr-2 md:mb-0 mb-1 w-20' htmlFor="">Country  <sup className='text-red-600'>*</sup></label>
                            <input type="text"  value={locationData.country}   name="country"  onChange={handleOnChange}  className='w-full focus:outline focus:outline-blue-400 p-1 rounded border' />
                        </div>
                        <UploadImage labelWidth={'w-14'} multiple={false} image={image} setImage={setImage} prset={'category'} />
                        <div className="w-full flex flex-col md:flex-row md:justify-between mt-6">
                            <label className='font-semibold flex items-center mr-2 md:mb-0 mb-1 w-20' htmlFor="">Featured  <sup className='text-red-600'>*</sup></label>
                            <select name='featured'  value={locationData.featured}   onChange={handleOnChange}  className='w-full focus:outline focus:outline-blue-400 p-1 rounded border cursor-pointer' >
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                            </select>
                        </div>
                        <div className="w-full flex flex-col md:flex-row md:justify-between mt-6">
                            <label className='font-semibold flex items-center mr-2 md:mb-0 mb-1 w-20' htmlFor="">Status  <sup className='text-red-600'>*</sup></label>
                            <select name='status'  value={locationData.status}  onChange={handleOnChange}  className='w-full focus:outline focus:outline-blue-400 p-1 rounded border cursor-pointer' >
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </select>
                        </div>
                        <div className="w-full flex flex-row md:justify-end justify-center mt-6">
                            <button className="bg-blue-400 px-2 py-1 text-white md:w-auto w-full justify-center rounded flex items-center hover:bg-blue-500">Edit <MdOutlineEdit className='ml-1 text-xl' /></button>
                        </div>
                    </form>
                </div>
                </>
            }
            </div>
        </>
    )
}

export default AddNewLocation