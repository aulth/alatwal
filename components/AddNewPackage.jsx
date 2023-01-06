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
const AddNewPackage = () => {
    const [packageData, setPackageData] = useState({ tour: "", language: "", description: "", price: "", discount: "", startingTime: "", withoutTransferAdultRate: "", withoutTransferChildRate: "", sharingTransferAdultRate: "", sharingTransferChildRate: "", privateTransferAdultRate: "", privateTransferChildRate: "", returnSharingBasisTransferAdultRate: "", returnSharingBasisTransferChildRate: "", returnPrivateBasisTransferAdultRate: "", returnPrivateBaisTransferAdultRate: "" })
    const handleOnTextChange = (e) => {
        e.preventDefault();
        setPackageData({ ...packageData, [e.target.name]: e.target.value });
        console.log(packageData)
    }
    const setDescription = (e) => {
        setPackageData({ ...packageData, description: e });
        console.log(packageData)
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
                    <h6 className=" font-semibold">Add New Package</h6>
                    <button className="flex items-center text-[#1F41AF]"> <span className='text-gray-700 mr-1'>Packages</span> / Add</button>
                </div>
                <div className="w-full rounded border border-gray-300  my-6 box-border">
                    <h5 className="text-2xl font-semibold p-4 text-left border-b border-gray-300">Add New Package</h5>
                    <form className='w-full p-4 ' action="">
                        <div className="w-full flex flex-col md:flex-row md:justify-between my-6">
                            <label className='font-semibold flex items-center mr-2 md:mb-0 mb-1 w-52' htmlFor="">Tour  <sup className='text-red-600'>*</sup></label>
                            <select name="tour" onChange={handleOnTextChange} className='w-full focus:outline focus:outline-blue-400 p-1 rounded border cursor-pointer' >
                                <option value="burj khalifa tour 1">Burj Khalifa Tour 1</option>
                                <option value="dhow cruise tour 1">Dhow Cruise Tour 1</option>
                            </select>
                        </div>
                        <div className="w-full flex flex-col md:flex-row md:justify-between mb-6">
                            <label className='font-semibold flex items-center mr-2 md:mb-0 mb-1 w-52' htmlFor="">Package Title  <sup className='text-red-600'>*</sup></label>
                            <input type="text" name="packageTitle" onChange={handleOnTextChange} placeholder="Tour Title Here" className='w-full focus:outline focus:outline-blue-400 p-1 rounded border' />
                        </div>
                        <div className="w-full flex flex-col md:flex-row md:justify-between mb-6">
                            <label className='font-semibold flex items-center mr-2 md:mb-0 mb-1 w-52' htmlFor="">Language  <sup className='text-red-600'>*</sup></label>
                            <input type="text" name="language" onChange={handleOnTextChange} placeholder="English" className='w-full focus:outline focus:outline-blue-400 p-1 rounded border' />
                        </div>
                        <div className="w-full flex md:items-start flex-col md:flex-row md:justify-between mb-6">
                            <label className='font-semibold flex items-center mr-2 md:mb-0 mb-1 w-52' htmlFor="">Description  <sup className='text-red-600'>*</sup></label>
                            <div className="w-full  border p-4 rounded bg-white">
                                <QuillNoSSRWrapper onChange={setDescription} placeholder="Description" className='' modules={modules} formats={formats} theme="snow" />
                            </div>
                        </div>
                        <div className="w-full flex flex-col md:flex-row md:justify-between mb-6">
                            <label className='font-semibold flex items-center mr-2 md:mb-0 mb-1 w-52' htmlFor="">Price  <sup className='text-red-600'>*</sup></label>
                            <input type="number" name="price" onChange={handleOnTextChange} placeholder="100" className='w-full focus:outline focus:outline-blue-400 p-1 rounded border' />
                        </div>
                        <div className="w-full flex flex-col md:flex-row md:justify-between mb-6">
                            <label className='font-semibold flex items-center mr-2 md:mb-0 mb-1 w-52' htmlFor="">Discount (%)  <sup className='text-red-600'>*</sup></label>
                            <input type="number" name="discount" onChange={handleOnTextChange} placeholder="0" className='w-full focus:outline focus:outline-blue-400 p-1 rounded border' />
                        </div>
                        <div className="w-full flex flex-col md:flex-row md:justify-between my-6">
                            <label className='font-semibold flex items-center mr-2 md:mb-0 mb-1 w-52' htmlFor="">Starting Time  <sup className='text-red-600'>*</sup></label>
                            <div className="w-full bg-white  h-auto p-2 rounded flex  flex-wrap  justify-between   border">
                                <div className='flex items-center'>
                                    <input onChange={handleOnTextChange} name='startingTime' value={"7:00 AM"} type="radio" /> <label htmlFor="7:00 AM " className='mx-1'>7:00 AM</label>
                                </div>
                                <div className='flex items-center'>
                                    <input onChange={handleOnTextChange} name='startingTime' value={"8:00 AM"} type="radio" /> <label htmlFor="8:00 AM " className='mx-1'>8:00 AM</label>
                                </div>
                                <div className='flex items-center'>
                                    <input onChange={handleOnTextChange} name='startingTime' value={"9:00 AM"} type="radio" /> <label htmlFor="9:00 AM " className='mx-1'>9:00 AM</label>
                                </div>
                                <div className='flex items-center'>
                                    <input onChange={handleOnTextChange} name='startingTime' value={"10:00 AM"} type="radio" /> <label htmlFor="10:00 AM " className='mx-1'>10:00 AM</label>
                                </div>
                            </div>
                        </div>
                        <hr />
                        <h5 className="text-left font-semibold text-xl my-4">Transfer Option</h5>
                        <div className="w-full flex flex-col md:flex-row md:justify-between mb-6">
                            <label className='font-semibold  mr-2 md:mb-0 mb-1 w-52' htmlFor="">Without Transfers <br /> <span className='text-sm'>(Adult Rate/Child Rate)</span>  <sup className='text-red-600'>*</sup></label>
                            <div className="w-full flex items-center justify-center">
                                <input type="number" name="withoutTransferAdultRate" onChange={handleOnTextChange} placeholder="200" className='w-full focus:outline focus:outline-blue-400 p-1 rounded border mx-1' />
                                <input type="number" name="withoutTransferChildRate" onChange={handleOnTextChange} placeholder="0" className='w-full focus:outline focus:outline-blue-400 p-1 rounded border mx-1' />
                            </div>
                        </div>
                        <div className="w-full flex flex-col md:flex-row md:justify-between mb-6">
                            <label className='font-semibold   mr-2 md:mb-0 mb-1 w-52' htmlFor="">Sharing Transfers <span className='text-sm'>(Adult Rate/Child Rate)</span>  <sup className='text-red-600'>*</sup></label>
                            <div className="w-full flex items-center justify-center">
                                <input type="number" name="sharingTransferAdultRate" onChange={handleOnTextChange} placeholder="200" className='w-full focus:outline focus:outline-blue-400 p-1 rounded border mx-1' />
                                <input type="number" name="sharingTransferChildRate" onChange={handleOnTextChange} placeholder="0" className='w-full focus:outline focus:outline-blue-400 p-1 rounded border mx-1' />
                            </div>
                        </div>
                        <div className="w-full flex flex-col md:flex-row md:justify-between mb-6">
                            <label className='font-semibold   mr-2 md:mb-0 mb-1 w-52' htmlFor="">Private Transfers <span className='text-sm'>(Adult Rate/Child Rate)</span>  <sup className='text-red-600'>*</sup></label>
                            <div className="w-full flex items-center justify-center">
                                <input type="number" name="privateTransferAdultRate" onChange={handleOnTextChange} placeholder="200" className='w-full focus:outline focus:outline-blue-400 p-1 rounded border mx-1' />
                                <input type="number" name="privateTransferChildRate" onChange={handleOnTextChange} placeholder="0" className='w-full focus:outline focus:outline-blue-400 p-1 rounded border mx-1' />
                            </div>
                        </div>
                        <div className="w-full flex flex-col md:flex-row md:justify-between mb-6">
                            <label className='font-semibold  mr-2 md:mb-0 mb-1 w-52' htmlFor="">Return Sharing Basis Transfers <span className='text-sm'>(Adult Rate/Child Rate)</span>  <sup className='text-red-600'>*</sup></label>
                            <div className="w-full flex items-center justify-center">
                                <input type="number" name="returnSharingBasisTransferAdultRate" onChange={handleOnTextChange} placeholder="200" className='w-full focus:outline focus:outline-blue-400 p-1 rounded border mx-1' />
                                <input type="number" name="returnSharingBasisTransferChildRate" onChange={handleOnTextChange} placeholder="0" className='w-full focus:outline focus:outline-blue-400 p-1 rounded border mx-1' />
                            </div>
                        </div>
                        <div className="w-full flex flex-col md:flex-row md:justify-between mb-6">
                            <label className='font-semibold  mr-2 md:mb-0 mb-1 w-52' htmlFor="">Return Private Basis Transfers <span className='text-sm'>(Adult Rate/Child Rate)</span>  <sup className='text-red-600'>*</sup></label>
                            <div className="w-full flex items-center justify-center">
                                <input type="number" name="returnPrivateBasisTransferAdultRate" onChange={handleOnTextChange} placeholder="200" className='w-full focus:outline focus:outline-blue-400 p-1 rounded border mx-1' />
                                <input type="number" name="returnPrivateBasisTransferChildRate" onChange={handleOnTextChange} placeholder="0" className='w-full focus:outline focus:outline-blue-400 p-1 rounded border mx-1' />
                            </div>
                        </div>
                        <div className="w-full flex flex-col md:items-start md:flex-row md:justify-between mb-6">
                            <label className='font-semibold flex items-center mr-2 md:mb-0 mb-1 w-52' htmlFor="">Transfer Option Remark  <sup className='text-red-600'>*</sup></label>
                            <textarea name="transferOptionRemark" onChange={handleOnTextChange} placeholder="Remark here" id="" className='w-full focus:outline focus:outline-blue-400 p-1 rounded border' >
                            </textarea>
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

export default AddNewPackage