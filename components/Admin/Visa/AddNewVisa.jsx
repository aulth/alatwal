import React, { useEffect, useState } from 'react'
import { MdClose, MdCheck, MdOutlineEdit, MdFileDownloadDone } from 'react-icons/md'
import { IoAdd } from 'react-icons/io5'
import { AiOutlineSwap, AiOutlineDelete } from 'react-icons/ai'
import { TfiReload } from 'react-icons/tfi'
import { BiImageAdd } from 'react-icons/bi'
import '@animxyz/core'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-quill/dist/quill.snow.css'
import Spinner from './../../Spinner'
import UploadImage from '../Upload/UploadImage'
import Head from 'next/head'
import dynamic from 'next/dynamic'
const QuillNoSSRWrapper = dynamic(import('react-quill'), {
    ssr: false,
    loading: () => <p>Loading ...</p>,
})
const AddNewVisa = () => {
    const [visaData, setVisaData] = useState({type:'UAE Visa'});
    const [image, setImage] = useState([]);
    const [loading, setLoading] = useState(false);
    const handleOnTextChange = (e) => {
        e.preventDefault();
        setVisaData({ ...visaData, [e.target.name]: e.target.value });
        console.log(visaData)
    }
    const setOverview = (e) => {
        setVisaData({ ...visaData, overview: e });
        console.log(visaData)
    }
    const handleOnAdd = async (e) => {
        e.preventDefault();
        setLoading(true);
        const response = await fetch('/api/visa/add', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({ data: visaData, image: image, authtoken: localStorage.getItem('alatwal-admin') })
        })
        setLoading(false);
        const json = await response.json();
        if (json.success) {
            setVisaData({});
            setImage([]);
            toast.success(json.msg);
        } else {
            toast.error(json.msg);
        }
    }
    useEffect(() => {
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
                <title>Add New Visa</title>
                <meta name="title" content="Add New Visa"/>
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
                    <h6 className=" font-semibold">Add New Visa</h6>
                    <button className="flex items-center text-[#1F41AF]"> <span className='text-gray-700 mr-1'>Visas</span> / Add</button>
                </div>
                <div className="w-full rounded border border-gray-300  my-6 box-border">
                    <h5 className="text-2xl font-semibold p-4 text-left border-b border-gray-300">Add New Visa</h5>
                    <form onSubmit={handleOnAdd} className='w-full p-4 ' action="">
                        <div className="w-full flex flex-col md:flex-row md:justify-between mb-6">
                            <label className='font-semibold flex items-center mr-2 md:mb-0 mb-1 w-36' htmlFor="">Title  <sup className='text-red-600'>*</sup></label>
                            <input type="text" name="title" onChange={handleOnTextChange} placeholder="Visa Title" className='w-full focus:outline focus:outline-blue-400 p-1 rounded border' required />
                        </div>
                        <div className="w-full flex flex-col md:flex-row md:justify-between my-6">
                            <label className='font-semibold flex items-center mr-2 md:mb-0 mb-1 w-36' htmlFor="">Type  <sup className='text-red-600'>*</sup></label>
                            <select name="type" onChange={handleOnTextChange} className='w-full focus:outline focus:outline-blue-400 p-1 rounded border cursor-pointer' required>
                                <option value="">Select Visa Type</option>
                                <option value="UAE Visa">UAE Visa</option>
                                <option value="International Visa">International Visa</option>
                            </select>
                        </div>
                        <div className="w-full flex md:items-start flex-col md:flex-row md:justify-between mb-6">
                            <label className='font-semibold flex items-center mr-2 md:mb-0 mb-1 w-36' htmlFor="">Overview  <sup className='text-red-600'>*</sup></label>
                            <div className="w-full  border p-4 rounded bg-white">
                                <QuillNoSSRWrapper value={visaData.overview ? visaData.overview : ''} onChange={setOverview} placeholder="Visa Overview" className='' modules={modules} formats={formats} theme="snow" />
                            </div>
                        </div>
                        <div className="w-full flex flex-col md:flex-row md:justify-between mb-6">
                            <label className='font-semibold flex items-center mr-2 md:mb-0 mb-1 w-36' htmlFor="">Description  <sup className='text-red-600'>*</sup></label>
                            <textarea value={visaData.description ? visaData.description : ''} name="description" onChange={handleOnTextChange} placeholder="Visa Description" className='w-full focus:outline focus:outline-blue-400 p-1 rounded border' required={true} />
                        </div>
                        <div className="w-full flex flex-col md:flex-row md:justify-between mb-6">
                            <label className='font-semibold flex items-center mr-2 md:mb-0 mb-1 w-36' htmlFor="">Highlights  <sup className='text-red-600'>*</sup></label>
                            <input type="text" value={visaData.highlights ? visaData.highlights : ''} name="highlights" onChange={handleOnTextChange} placeholder="Separated by comma ," className='w-full focus:outline focus:outline-blue-400 p-1 rounded border' required />
                        </div>
                        {
                            visaData.type == 'UAE Visa' ?
                                <div className="w-full flex flex-col md:flex-row md:justify-between mb-6">
                                    <label className='font-semibold flex items-center mr-2 md:mb-0 mb-1 w-[19rem]' htmlFor="">Price 30/60 Days<sup className='text-red-600'>*</sup></label>
                                    <input type="number" value={visaData.price30Days ? visaData.price30Days : ''} name="price30Days" onChange={handleOnTextChange} placeholder="For 30 days" className='w-full md:mx-0  focus:outline focus:outline-blue-400 p-1 rounded border' required />
                                    <input type="number" value={visaData.price60Days ? visaData.price60Days : ''} name="price60Days" onChange={handleOnTextChange} placeholder="For 60 days" className='w-full md:ml-2 focus:outline focus:outline-blue-400 p-1 rounded border' required />
                                </div> :
                                <div className="w-full flex flex-col md:flex-row md:justify-between mb-6">
                                    <label className='font-semibold flex items-center mr-2 md:mb-0 mb-1 w-36' htmlFor="">Price (AED) <sup className='text-red-600'>*</sup></label>
                                    <input type="number" value={visaData.price ? visaData.price : ''} name="price" onChange={handleOnTextChange} placeholder="Price" className='w-full focus:outline focus:outline-blue-400 p-1 rounded border' required />
                                </div>
                        }
                        <div className="w-full flex flex-col md:flex-row md:justify-between mb-6">
                            <label className='font-semibold flex items-center mr-2 md:mb-0 mb-1 w-36' htmlFor="">Working Days</label>
                            <input type="text" value={visaData.workingDays ? visaData.workingDays : ''} name="workingDays" onChange={handleOnTextChange} placeholder="Separated by comma ," className='w-full focus:outline focus:outline-blue-400 p-1 rounded border' required />
                        </div>
                        <div className="w-full flex flex-col md:flex-row md:justify-between mb-6 md:items-start">
                            <label className='font-semibold flex items-center mr-2 md:mb-0 mb-1 w-36' htmlFor="">Booking Policy  <sup className='text-red-600'>*</sup></label>
                            <textarea name="bookingPolicy" value={visaData.bookingPolicy ? visaData.bookingPolicy : ''} onChange={handleOnTextChange} placeholder="Non refundable" className='w-full focus:outline focus:outline-blue-400 p-1 rounded border' required />
                        </div>
                        <div className="w-full flex flex-col md:flex-row md:justify-between mb-6 md:items-start">
                            <label className='font-semibold flex items-center mr-2 md:mb-0 mb-1 w-36' htmlFor="">Important Information  <sup className='text-red-600'>*</sup></label>
                            <textarea name="importantInformation" value={visaData.importantInformation ? visaData.importantInformation : ''} onChange={handleOnTextChange} placeholder="Importan Information" className='w-full focus:outline focus:outline-blue-400 p-1 rounded border' required />
                        </div>
                        <div className="w-full flex flex-col md:flex-row md:justify-between mt-6">
                            <label className='font-semibold flex items-center mr-2 md:mb-0 mb-1 w-36' htmlFor="">Status  <sup className='text-red-600'>*</sup></label>
                            <select name='status' value={visaData.status ? visaData.status : ''} onChange={handleOnTextChange} className='w-full focus:outline focus:outline-blue-400 p-1 rounded border cursor-pointer' >
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </select>
                        </div>
                        <UploadImage labelWidth={'w-36'} multiple={true} image={image} setImage={setImage} prset={'category'} />
                        <div className="w-full flex flex-row md:justify-end justify-center mb-3">
                            {
                                loading ?
                                    <div className='p-4'>
                                        <Spinner />
                                    </div> :
                                    <button type='submit' className="bg-blue-400 px-2 py-1 text-white md:w-auto w-full justify-center rounded flex items-center hover:bg-blue-500">Add <IoAdd className='ml-1 text-xl' /></button>
                            }

                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default AddNewVisa