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
const AddNewTour = () => {
    const [tourData, setTourData] = useState({ title: "", overview: "", highlights: "", availability: "", description: "", category: "", duration: "", adultRate: "", childRate: "", infantRate: "", startingTime: "", tourLanguage: "", transferOption: "", importantInformation: "", bookingPolicy: "", covid19: "", tourVideo: "", tourAddress: "", googleMapLocation: "", featuredTour: "", paymentMethod: "", image: [] });
    const handleOnTextChange = (e) => {
        e.preventDefault();
        setTourData({ ...tourData, [e.target.name]: e.target.value });
        console.log(tourData)
    }
    const setOverview = (e) => {
        setTourData({ ...tourData, overview: e });
        console.log(tourData)
    }
    const setHighlights = (e) => {
        setTourData({ ...tourData, highlights: e });
        console.log(tourData)
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
                    <h6 className=" font-semibold">Add New Tour</h6>
                    <button className="flex items-center text-[#1F41AF]"> <span className='text-gray-700 mr-1'>Tours</span> / Add</button>
                </div>
                <div className="w-full rounded border border-gray-300  my-6 box-border">
                    <h5 className="text-2xl font-semibold p-4 text-left border-b border-gray-300">Add New Tour</h5>
                    <form className='w-full p-4 ' action="">
                        <div className="w-full flex flex-col md:flex-row md:justify-between mb-6">
                            <label className='font-semibold flex items-center mr-2 md:mb-0 mb-1 w-52' htmlFor="">Title  <sup className='text-red-600'>*</sup></label>
                            <input type="text" name="title" onChange={handleOnTextChange} placeholder="Tour Title Here" className='w-full focus:outline focus:outline-blue-400 p-1 rounded border' />
                        </div>
                        <div className="w-full flex md:items-start flex-col md:flex-row md:justify-between mb-6">
                            <label className='font-semibold flex items-center mr-2 md:mb-0 mb-1 w-52' htmlFor="">Overview  <sup className='text-red-600'>*</sup></label>
                            <div className="w-full  border p-4 rounded bg-white">
                                <QuillNoSSRWrapper onChange={setOverview} placeholder="Tour Overview" className='' modules={modules} formats={formats} theme="snow" />
                            </div>
                        </div>
                        {/* <div className="w-full flex md:items-start flex-col md:flex-row md:justify-between mb-6">
                            <label className='font-semibold flex items-center mr-2 md:mb-0 mb-1 w-52' htmlFor="">Highlights  <sup className='text-red-600'>*</sup></label>
                            <div className="w-full  border p-4 rounded bg-white">
                            <QuillNoSSRWrapper className='' onChange={setHighlights} placeholder="Tour Highlights" modules={modules} formats={formats} theme="snow" />
                            </div>
                        </div> */}
                        <div className="w-full flex flex-col md:flex-row md:justify-between mb-6">
                            <label className='font-semibold flex items-center mr-2 md:mb-0 mb-1 w-52' htmlFor="">Highlights  <sup className='text-red-600'>*</sup></label>
                            <input type="text" name="highlights" onChange={handleOnTextChange} placeholder="Separated by comma ," className='w-full focus:outline focus:outline-blue-400 p-1 rounded border' />
                        </div>
                        <div className="w-full flex flex-col md:flex-row md:justify-between my-6">
                            <label className='font-semibold flex items-center mr-2 md:mb-0 mb-1 w-52' htmlFor="">Availability  <sup className='text-red-600'>*</sup></label>
                            <select name="availability" onChange={handleOnTextChange} className='w-full focus:outline focus:outline-blue-400 p-1 rounded border cursor-pointer' >
                                <option value="daily">Daily</option>
                                <option value="weekly">Weekly</option>
                            </select>
                        </div>
                        <div className="w-full flex flex-col md:items-start md:flex-row md:justify-between mb-6">
                            <label className='font-semibold flex items-center mr-2 md:mb-0 mb-1 w-52' htmlFor="">Description  <sup className='text-red-600'>*</sup></label>
                            <textarea name="description" onChange={handleOnTextChange} placeholder="Description here" id="" className='w-full focus:outline focus:outline-blue-400 p-1 rounded border' >
                            </textarea>
                        </div>
                        <div className="w-full flex flex-col md:flex-row md:justify-between my-6">
                            <label className='font-semibold flex items-center mr-2 md:mb-0 mb-1 w-52' htmlFor="">Category  <sup className='text-red-600'>*</sup></label>
                            <select name="category" onChange={handleOnTextChange} className='w-full focus:outline focus:outline-blue-400 p-1 rounded border cursor-pointer' >
                                <option value="burj-khalifa">Burj Khalifa</option>
                                <option value="dhow-cruise">Dhow Cruise</option>
                                <option value="wild-wide-water-park">Wild Wide Water Park</option>
                            </select>
                        </div>
                        <div className="w-full flex flex-col md:flex-row md:justify-between mb-6">
                            <label className='font-semibold flex items-center mr-2 md:mb-0 mb-1 w-52' htmlFor="">Duration  <sup className='text-red-600'>*</sup></label>
                            <input type="text" name="duration" onChange={handleOnTextChange} placeholder="Tour duration 0 hour" className='w-full focus:outline focus:outline-blue-400 p-1 rounded border' />
                        </div>
                        <div className="w-full flex flex-col md:flex-row md:justify-between mb-6">
                            <label className='font-semibold flex items-center mr-2 md:mb-0 mb-1 w-52' htmlFor="">Adult Rate  <sup className='text-red-600'>*</sup></label>
                            <input type="number" name="adultRate" onChange={handleOnTextChange} placeholder="200" className='w-full focus:outline focus:outline-blue-400 p-1 rounded border' />
                        </div>
                        <div className="w-full flex flex-col md:flex-row md:justify-between mb-6">
                            <label className='font-semibold flex items-center mr-2 md:mb-0 mb-1 w-52' htmlFor="">Child Rate  <sup className='text-red-600'>*</sup></label>
                            <input type="number" name="childRate" onChange={handleOnTextChange} placeholder="100" className='w-full focus:outline focus:outline-blue-400 p-1 rounded border' />
                        </div>
                        <div className="w-full flex flex-col md:flex-row md:justify-between mb-6">
                            <label className='font-semibold flex items-center mr-2 md:mb-0 mb-1 w-52' htmlFor="">Infant Rate  <sup className='text-red-600'>*</sup></label>
                            <input type="number" name="infantRate" onChange={handleOnTextChange} placeholder="50" className='w-full focus:outline focus:outline-blue-400 p-1 rounded border' />
                        </div>
                        <div className="w-full flex flex-col md:flex-row md:justify-between my-6">
                            <label className='font-semibold flex items-center mr-2 md:mb-0 mb-1 w-52' htmlFor="">Starting Time  <sup className='text-red-600'>*</sup></label>
                            <select name="startingTime" onChange={handleOnTextChange} className='w-full focus:outline focus:outline-blue-400 p-1 rounded border cursor-pointer' >
                                <option value="7:00 AM">7:00 AM</option>
                                <option value="8:00 AM">8:00 AM</option>
                                <option value="9:00 AM">9:00 AM</option>
                                <option value="10:00 AM">10:00 AM</option>
                                <option value="11:00 AM">11:00 AM</option>
                                <option value="12:00 PM">12:00 PM</option>
                                <option value="1:00 PM">1:00 PM</option>
                                <option value="2:00 PM">2:00 PM</option>
                                <option value="3:00 PM">3:00 PM</option>
                                <option value="4:00 PM">4:00 PM</option>
                                <option value="5:00 PM">5:00 PM</option>
                                <option value="6:00 PM">6:00 PM</option>
                            </select>
                        </div>
                        <div className="w-full flex flex-col md:flex-row md:justify-between mb-6">
                            <label className='font-semibold flex items-center mr-2 md:mb-0 mb-1 w-52' htmlFor="">Tour Language  <sup className='text-red-600'>*</sup></label>
                            <input type="text" name="tourLanguage" onChange={handleOnTextChange} placeholder="English" className='w-full focus:outline focus:outline-blue-400 p-1 rounded border' />
                        </div>
                        <div className="w-full flex flex-col md:flex-row md:justify-between my-6">
                            <label className='font-semibold flex items-center mr-2 md:mb-0 mb-1 w-52' htmlFor="">Transfer Option  <sup className='text-red-600'>*</sup></label>
                            <div className="w-full bg-white md:h-8 h-auto p-2 rounded flex md:flex-row flex-col justify-between   border">
                                <div className='flex items-center'>
                                    <input onChange={handleOnTextChange} name='transferOption' type="radio" /> <label htmlFor="withoutTransfer " className='mx-1'>Without Transfer</label>
                                </div>
                                <div className='flex items-center'>
                                    <input onChange={handleOnTextChange} name='transferOption' type="radio" /> <label htmlFor="withoutTransfer " className='mx-1'>Shared Transfer</label>
                                </div>
                                <div className='flex items-center'>
                                    <input onChange={handleOnTextChange} name='transferOption' type="radio" /> <label htmlFor="withoutTransfer " className='mx-1'>Private Transfer</label>
                                </div>
                            </div>
                        </div>
                        <div className="w-full flex flex-col md:items-start md:flex-row md:justify-between mb-6">
                            <label className='font-semibold flex items-center mr-2 md:mb-0 mb-1 w-52' htmlFor="">Important Information  <sup className='text-red-600'>*</sup></label>
                            <textarea name="importantInformation" onChange={handleOnTextChange} placeholder="Important Information" id="" className='w-full focus:outline focus:outline-blue-400 p-1 rounded border' >
                            </textarea>
                        </div>
                        <div className="w-full flex flex-col md:items-start md:flex-row md:justify-between mb-6">
                            <label className='font-semibold flex items-center mr-2 md:mb-0 mb-1 w-52' htmlFor="">Booking Policy  <sup className='text-red-600'>*</sup></label>
                            <textarea name="bookingPolicy" onChange={handleOnTextChange} placeholder="Write your booking policy here" id="" className='w-full focus:outline focus:outline-blue-400 p-1 rounded border' >
                            </textarea>
                        </div>
                        <div className="w-full flex flex-col md:items-start md:flex-row md:justify-between mb-6">
                            <label className='font-semibold flex items-center mr-2 md:mb-0 mb-1 w-52' htmlFor="">Covid19 Precautions  <sup className='text-red-600'>*</sup></label>
                            <textarea name="covid19" onChange={handleOnTextChange} placeholder="Covid-19 Precautions" id="" className='w-full focus:outline focus:outline-blue-400 p-1 rounded border' >
                            </textarea>
                        </div>
                        <div className="w-full flex flex-col md:items-start md:flex-row md:justify-between mb-6">
                            <label className='font-semibold flex items-center mr-2 md:mb-0 mb-1 w-52' htmlFor="">Tour Video  <sup className='text-red-600'>*</sup></label>
                            <textarea placeholder='Youtube url' name="tourVideo" onChange={handleOnTextChange} id="" className='w-full focus:outline focus:outline-blue-400 p-1 rounded border' >
                            </textarea>
                        </div>
                        <div className="w-full flex flex-col md:items-start md:flex-row md:justify-between mb-6">
                            <label className='font-semibold flex items-center mr-2 md:mb-0 mb-1 w-52' htmlFor="">Tour Address  <sup className='text-red-600'>*</sup></label>
                            <textarea name="tourAddress" onChange={handleOnTextChange} placeholder="Address" id="" className='w-full focus:outline focus:outline-blue-400 p-1 rounded border' >
                            </textarea>
                        </div>
                        <div className="w-full flex flex-col md:items-start md:flex-row md:justify-between mb-6">
                            <label className='font-semibold flex items-center mr-2 md:mb-0 mb-1 w-52' htmlFor="">Google Map Location  <sup className='text-red-600'>*</sup></label>
                            <textarea name="googleMapLocation" onChange={handleOnTextChange} placeholder="Google map url" id="" className='w-full focus:outline focus:outline-blue-400 p-1 rounded border' >
                            </textarea>
                        </div>
                        <div className="w-full flex flex-col md:flex-row md:justify-between my-6">
                            <label className='font-semibold flex items-center mr-2 md:mb-0 mb-1 w-52' htmlFor="">Featured Tour  <sup className='text-red-600'>*</sup></label>
                            <select name="featuredTour" onChange={handleOnTextChange} className='w-full focus:outline focus:outline-blue-400 p-1 rounded border cursor-pointer' >
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                            </select>
                        </div>
                        <div className="w-full flex flex-col md:flex-row md:justify-between my-6">
                            <label className='font-semibold flex items-center mr-2 md:mb-0 mb-1 w-52' htmlFor="">Payment Method  <sup className='text-red-600'>*</sup></label>
                            <select name="paymentMethod" onChange={handleOnTextChange} className='w-full focus:outline focus:outline-blue-400 p-1 rounded border cursor-pointer' >
                                <option value="merchant">Merchant</option>
                                <option value="non-merchant">Non Merchant</option>
                            </select>
                        </div>
                        <div className="w-full flex flex-col md:flex-row md:justify-between my-6">
                            <label className='font-semibold flex items-center mr-2 md:mb-0 mb-1 w-52' htmlFor="">Image  <sup className='text-red-600'>*</sup></label>
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

export default AddNewTour