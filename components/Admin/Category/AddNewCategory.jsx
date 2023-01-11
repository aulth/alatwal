import React, { useEffect, useState } from 'react'
import { MdClose, MdCheck, MdOutlineEdit, MdFileDownloadDone } from 'react-icons/md'
import { IoAdd } from 'react-icons/io5'
import { AiOutlineSwap, AiOutlineDelete } from 'react-icons/ai'
import { TfiReload } from 'react-icons/tfi'
import { BiImageAdd } from 'react-icons/bi'
import '@animxyz/core'
import Chart from "chart.js";
import Head from 'next/head'
import { useRouter } from 'next/router'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import UploadImage from '../Upload/UploadImage'
const AddNewCategory = () => {
    const router = useRouter();
    const [categoryData, setCategoryData] = useState({ title: '', status: 'active', type:'tour', description:'' });
    const [image, setImage] = useState([]);
    const handleOnChange = (e) => {
        e.preventDefault();
        setCategoryData({ ...categoryData, [e.target.name]: e.target.value });
    }
    const handleOnAddCategory = async (e) => {
        e.preventDefault();
        if (typeof window !== 'undefined') {
            if (!categoryData.title || !image || !categoryData.status || !categoryData.description) {
                toast.info("All fields required");
                return;
            }
            const addCategory = await fetch('/api/category/add', {
                method: "POST",
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({ title: categoryData.title, image: image, status: categoryData.status, type:categoryData.type, description:categoryData.description, authtoken: localStorage.getItem('alatwal-admin') })
            })
            const addCategoryData = await addCategory.json();
            if (!addCategoryData.success) {
                toast.error(addCategoryData.msg);
                return;
            }
            toast.success("Category Added Succesfully");
            router.push("/admin/category");
        }
    }
    return (
        <>
            <ToastContainer />
            <div className="w-full p-4 overflow-y-auto">
                <div className="w-full flex justify-between">
                    <h6 className=" font-semibold">Add New Category</h6>
                    <button className="flex items-center text-[#1F41AF]"> <span className='text-gray-700 mr-1'>Categories</span> / Add</button>
                </div>
                <div className="w-full rounded border border-gray-300  my-6 box-border">
                    <h5 className="text-2xl font-semibold p-4 text-left border-b border-gray-300">Add New Category</h5>
                    <form onSubmit={handleOnAddCategory} className='w-full p-4 ' action="">
                        <div className="w-full flex flex-col md:flex-row md:justify-between mb-6">
                            <label className='font-semibold flex items-center mr-2 md:mb-0 mb-1 w-14' htmlFor="">Title  <sup className='text-red-600'>*</sup></label>
                            <input type="text" onChange={handleOnChange} name='title' className='w-full focus:outline focus:outline-blue-400 p-1 rounded border' />
                        </div>
                        <div className="w-full flex flex-col md:flex-row md:justify-between mb-6">
                            <label className='font-semibold flex items-center mr-2 md:mb-0 mb-1 w-14' htmlFor="">Description  <sup className='text-red-600'>*</sup></label>
                            <textarea onChange={handleOnChange} name='description' className='w-full focus:outline focus:outline-blue-400 p-1 rounded border' />
                        </div>
                        <UploadImage labelWidth={'w-14'} multiple={false} image={image} setImage={setImage} prset={'category'} />
                        <div className="w-full flex flex-col md:flex-row md:justify-between mt-6">
                            <label className='font-semibold flex items-center mr-2 md:mb-0 mb-1 w-14' htmlFor="">Status  <sup className='text-red-600'>*</sup></label>
                            <select name="status"  onChange={handleOnChange}  className='w-full focus:outline focus:outline-blue-400 p-1 rounded border' >
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </select>
                        </div>
                        <div className="w-full flex flex-col md:flex-row md:justify-between mt-6">
                            <label className='font-semibold flex items-center mr-2 md:mb-0 mb-1 w-14' htmlFor="">Type  <sup className='text-red-600'>*</sup></label>
                            <select name="type"  onChange={handleOnChange}  className='w-full focus:outline focus:outline-blue-400 p-1 rounded border' >
                                <option value="tour">Tour</option>
                                <option value="visa">Visa</option>
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

export default AddNewCategory