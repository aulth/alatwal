import React, { useEffect, useState } from 'react'
import { MdClose, MdCheck, MdOutlineEdit, MdFileDownloadDone } from 'react-icons/md'
import { IoAdd } from 'react-icons/io5'
import { AiOutlineSwap, AiOutlineDelete } from 'react-icons/ai'
import { TfiReload } from 'react-icons/tfi'
import { BiImageAdd } from 'react-icons/bi'
import {RxUpdate} from 'react-icons/rx'
import { useRouter } from 'next/router'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Head from 'next/head'
import '@animxyz/core'
import 'react-quill/dist/quill.snow.css'

import dynamic from 'next/dynamic'
const QuillNoSSRWrapper = dynamic(import('react-quill'), {
    ssr: false,
    loading: () => <p>Loading ...</p>,
})
const AdminABoutCMS = () => {
    const router = useRouter();
    const [contactData, setContactData] = useState({ title: "", overview:"", status:"active", id:'', success:false })
    const handleOnTextChange = (e) => {
        e.preventDefault();
        setContactData({ ...contactData, [e.target.name]: e.target.value });
        console.log(contactData)
    }
    const setOverview = (e) => {
        setContactData({ ...contactData, overview: e });
        console.log(contactData)
    }
    const fetchContact = async ()=>{
        const response = await fetch('/api/cms/fetch/about');
        const responseData = await response.json();
        console.log(responseData)
        if(responseData.success){
            setContactData({title:responseData.cms.title, overview:responseData.cms.overview, status:responseData.cms.status, id:responseData.cms._id})
        }else{
            console.log(responseData.msg)
        }
    }
    const updatePage = async (e)=>{
        e.preventDefault();
        const response = await fetch("/api/cms/update",{
            method:'POST',
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify({title:contactData.title, overview:contactData.overview, status:contactData.status, authtoken:localStorage.getItem("alatwal-admin"), id:contactData.id})
        })
        const responseData = await response.json();
        console.log(responseData)
        if(responseData.success){
            toast.success(responseData.msg);
            router.push("/admin")
        }else{
            toast.error(responseData.msg);
        }
    }
    useEffect(() => {
      fetchContact();
    }, [])
    
    // rich text editor 
    const modules = {
        toolbar: [
            [{ header: '1' }, { header: '2' }, { font: [] }],
            [{ size: [] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [
                { list: 'ordered' },
                { list: 'bullet' },
                { indent: '-1' },
                { indent: '+1' },
            ],
            ['link', 'image', 'video'],
            ['clean'],
        ],
        clipboard: {
            matchVisual: false,
        },
    }
    const formats = [
        'header',
        'font',
        'size',
        'bold',
        'italic',
        'underline',
        'strike',
        'blockquote',
        'list',
        'bullet',
        'indent',
        'link',
        'image',
        'video',
    ]
    return (
        <>
         <Head>
                <title>About Page Edit</title>
                <meta name="title" content="Order Placed successfully"/>
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
                    <h6 className=" font-semibold">Edit About Page</h6>
                    <button className="flex items-center text-[#1F41AF]"> <span className='text-gray-700 mr-1'>CMS</span> / About </button>
                </div>
                <div className="w-full rounded border border-gray-300  my-6 box-border">
                    <h5 className="text-2xl font-semibold p-4 text-left border-b border-gray-300">Edit About Page</h5>
                    {
                        contactData  &&
                        <form onSubmit={updatePage} className='w-full p-4 ' action="">
                        <div className="w-full flex flex-col md:flex-row md:justify-between mb-6">
                            <label className='font-semibold flex items-center mr-2 md:mb-0 mb-1 w-32' htmlFor="">Title  <sup className='text-red-600'>*</sup></label>
                            <input type="text" name="title" value={contactData.title} onChange={handleOnTextChange} placeholder="Page Title" className='w-full focus:outline focus:outline-blue-400 p-1 rounded border' />
                        </div>
                        <div className="w-full flex md:items-start flex-col md:flex-row md:justify-between mb-6">
                            <label className='font-semibold flex items-center mr-2 md:mb-0 mb-1 w-32' htmlFor="">Overview  <sup className='text-red-600'>*</sup></label>
                            <div className="w-full  border p-4 rounded bg-white">
                                <QuillNoSSRWrapper  value={contactData.overview}  onChange={setOverview} placeholder="Page Overview" className='' modules={modules} formats={formats} theme="snow" />
                            </div>
                        </div>
                        <div className="w-full flex flex-col md:flex-row md:justify-between mt-6">
                            <label className='font-semibold flex items-center mr-2 md:mb-0 mb-1 w-32' htmlFor="">Status  <sup className='text-red-600'>*</sup></label>
                            <select name='status'  value={contactData.status}  onChange={handleOnTextChange} className='w-full focus:outline focus:outline-blue-400 p-1 rounded border cursor-pointer' >
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </select>
                        </div>
                        <div className="w-full flex flex-row md:justify-end justify-center my-3">
                            <button className="bg-blue-400 px-2 py-1 text-white md:w-auto w-full justify-center rounded flex items-center hover:bg-blue-500">Update <RxUpdate className='ml-1 ' /></button>
                        </div>
                    </form>
                    }
                </div>
            </div>
        </>
    )
}

export default AdminABoutCMS