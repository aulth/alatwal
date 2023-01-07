import React, { useEffect, useState } from 'react'
import { MdClose, MdCheck, MdOutlineEdit, MdFileDownloadDone } from 'react-icons/md'
import { IoAdd } from 'react-icons/io5'
import { AiOutlineSwap, AiOutlineDelete } from 'react-icons/ai'
import { TfiReload } from 'react-icons/tfi'
import { BiImageAdd } from 'react-icons/bi'
import '@animxyz/core'
import 'react-quill/dist/quill.snow.css'

import dynamic from 'next/dynamic'
const QuillNoSSRWrapper = dynamic(import('react-quill'), {
    ssr: false,
    loading: () => <p>Loading ...</p>,
})
const AddNewVisa = () => {
    const [visaData, setVisaData] = useState({ title: "", type: "",  price: "",  workingDays: "",overview:"", status:"", images:[] })
    const handleOnTextChange = (e) => {
        e.preventDefault();
        setVisaData({ ...visaData, [e.target.name]: e.target.value });
        console.log(visaData)
    }
    const setOverview = (e) => {
        setVisaData({ ...visaData, overview: e });
        console.log(visaData)
    }

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
            <div className="w-full p-4 overflow-y-auto">
                <div className="w-full flex justify-between">
                    <h6 className=" font-semibold">Add New Visa</h6>
                    <button className="flex items-center text-[#1F41AF]"> <span className='text-gray-700 mr-1'>Visas</span> / Add</button>
                </div>
                <div className="w-full rounded border border-gray-300  my-6 box-border">
                    <h5 className="text-2xl font-semibold p-4 text-left border-b border-gray-300">Add New Visa</h5>
                    <form className='w-full p-4 ' action="">
                        <div className="w-full flex flex-col md:flex-row md:justify-between mb-6">
                            <label className='font-semibold flex items-center mr-2 md:mb-0 mb-1 w-32' htmlFor="">Title  <sup className='text-red-600'>*</sup></label>
                            <input type="text" name="title" onChange={handleOnTextChange} placeholder="Visa Title" className='w-full focus:outline focus:outline-blue-400 p-1 rounded border' />
                        </div>
                        <div className="w-full flex flex-col md:flex-row md:justify-between my-6">
                            <label className='font-semibold flex items-center mr-2 md:mb-0 mb-1 w-32' htmlFor="">Type  <sup className='text-red-600'>*</sup></label>
                            <select name="type" onChange={handleOnTextChange} className='w-full focus:outline focus:outline-blue-400 p-1 rounded border cursor-pointer' >
                                <option value="UAE Visa">UAE Visa</option>
                                <option value="International Visa">International Visa</option>
                            </select>
                        </div>
                        <div className="w-full flex md:items-start flex-col md:flex-row md:justify-between mb-6">
                            <label className='font-semibold flex items-center mr-2 md:mb-0 mb-1 w-32' htmlFor="">Overview  <sup className='text-red-600'>*</sup></label>
                            <div className="w-full  border p-4 rounded bg-white">
                                <QuillNoSSRWrapper onChange={setOverview} placeholder="Visa Overview" className='' modules={modules} formats={formats} theme="snow" />
                            </div>
                        </div>
                        <div className="w-full flex flex-col md:flex-row md:justify-between mb-6">
                            <label className='font-semibold flex items-center mr-2 md:mb-0 mb-1 w-32' htmlFor="">Working Days  <sup className='text-red-600'>*</sup></label>
                            <input type="text" name="workingDays" onChange={handleOnTextChange} placeholder="5 to 7 Days" className='w-full focus:outline focus:outline-blue-400 p-1 rounded border' />
                        </div>
                        <div className="w-full flex flex-col md:flex-row md:justify-between mb-6">
                            <label className='font-semibold flex items-center mr-2 md:mb-0 mb-1 w-32' htmlFor="">Price  <sup className='text-red-600'>*</sup></label>
                            <input type="number" name="price" onChange={handleOnTextChange} placeholder="100" className='w-full focus:outline focus:outline-blue-400 p-1 rounded border' />
                        </div>
                        <div className="w-full flex flex-col md:flex-row md:justify-between mt-6">
                            <label className='font-semibold flex items-center mr-2 md:mb-0 mb-1 w-32' htmlFor="">Status  <sup className='text-red-600'>*</sup></label>
                            <select name='status' onChange={handleOnTextChange} className='w-full focus:outline focus:outline-blue-400 p-1 rounded border cursor-pointer' >
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </select>
                        </div>
                        <div className="w-full flex flex-col md:flex-row md:justify-between my-6">
                            <label className='font-semibold flex items-center mr-2 md:mb-0 mb-1 w-32' htmlFor="">Image  <sup className='text-red-600'>*</sup></label>
                            <div className="w-full bg-white h-8 rounded flex justify-end hover:bg-gray-50 border hover:border-blue-400 cursor-pointer">
                                <button className='px-2 py-1 text-sm  flex  items-center rounded-r text-white bg-blue-400 hover:bg-blue-500'>
                                    Upload Image <BiImageAdd className='text-lg ml-1' />
                                </button>
                            </div>
                            {/* <input type="file" className='w-full focus:outline focus:outline-blue-400 p-1 rounded border-black' /> */}
                        </div>
                        <div className="w-full flex flex-row md:justify-end justify-center mb-3">
                            <button className="bg-blue-400 px-2 py-1 text-white md:w-auto w-full justify-center rounded flex items-center hover:bg-blue-500">Add <IoAdd className='ml-1 text-xl' /></button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default AddNewVisa