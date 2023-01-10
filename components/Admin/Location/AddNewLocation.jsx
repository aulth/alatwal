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
const AddNewLocation = () => {
    const router = useRouter();
    const [locationData, setLocationData] = useState({title:'', country:'', featured:'yes',  status:'active'});
    const [image, setImage] = useState([]);
    const handleOnChange = (e)=>{
        e.preventDefault();
        setLocationData({...locationData, [e.target.name]:e.target.value});
        console.log(locationData);
    }
    const handleOnAdd = async (e)=>{
        e.preventDefault();
        if(typeof window!=='undefined'){
            if(!locationData.title || !image || !locationData.status || !locationData.featured || !locationData.country){
                toast.info("All fields required");
                return;
            }
            const add = await fetch('/api/location/add', {
                method:"POST",
                headers:{
                    'content-type':'application/json'
                },
                body:JSON.stringify({title:locationData.title, image:image, status:locationData.status, country:locationData.country, featured:locationData.featured ,authtoken:localStorage.getItem('alatwal-admin')})
            })
            const addData = await add.json();
            if(!addData.success){
                toast.error(addData.msg);
                return;
            }
            toast.success("Added Succesfully");
            router.push("/admin/location");
        }
    }
    return (
        <>
            <ToastContainer />
            <div className="w-full p-4 overflow-y-auto">
                <div className="w-full flex justify-between">
                    <h6 className=" font-semibold">Add New Location</h6>
                    <button className="flex items-center text-[#1F41AF]"> <span className='text-gray-700 mr-1'>Location</span> / Add</button>
                </div>
                <div className="w-full rounded border border-gray-300  my-6 box-border">
                    <h5 className="text-2xl font-semibold p-4 text-left border-b border-gray-300">Add New Location</h5>
                    <form onSubmit={handleOnAdd} className='w-full p-4 ' action="">
                        <div className="w-full flex flex-col md:flex-row md:justify-between mb-6">
                            <label className='font-semibold flex items-center mr-2 md:mb-0 mb-1 w-20' htmlFor="">Title  <sup className='text-red-600'>*</sup></label>
                            <input name='title' onChange={handleOnChange} type="text" className='w-full focus:outline focus:outline-blue-400 p-1 rounded border' />
                        </div>
                        <div className="w-full flex flex-col md:flex-row md:justify-between mb-6">
                            <label className='font-semibold flex items-center mr-2 md:mb-0 mb-1 w-20' htmlFor="">Country  <sup className='text-red-600'>*</sup></label>
                            <input type="text"  name="country"  onChange={handleOnChange}  className='w-full focus:outline focus:outline-blue-400 p-1 rounded border' />
                        </div>
                        <UploadImage labelWidth={'w-14'} multiple={false} image={image} setImage={setImage} prset={'category'} />
                        <div className="w-full flex flex-col md:flex-row md:justify-between mt-6">
                            <label className='font-semibold flex items-center mr-2 md:mb-0 mb-1 w-20' htmlFor="">Featured  <sup className='text-red-600'>*</sup></label>
                            <select name='featured'  onChange={handleOnChange}  className='w-full focus:outline focus:outline-blue-400 p-1 rounded border cursor-pointer' >
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                            </select>
                        </div>
                        <div className="w-full flex flex-col md:flex-row md:justify-between mt-6">
                            <label className='font-semibold flex items-center mr-2 md:mb-0 mb-1 w-20' htmlFor="">Status  <sup className='text-red-600'>*</sup></label>
                            <select name='status'  onChange={handleOnChange}  className='w-full focus:outline focus:outline-blue-400 p-1 rounded border cursor-pointer' >
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </select>
                        </div>
                        <div className="w-full flex flex-row md:justify-end justify-center mt-6">
                            <button className="bg-blue-400 px-2 py-1 text-white md:w-auto w-full justify-center rounded flex items-center hover:bg-blue-500">Add <IoAdd className='ml-1 text-xl' /></button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default AddNewLocation