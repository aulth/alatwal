import React, { useEffect } from 'react'
import { MdClose, MdCheck, MdOutlineEdit, MdFileDownloadDone } from 'react-icons/md'
import { IoAdd } from 'react-icons/io5'
import { AiOutlineSwap, AiOutlineDelete } from 'react-icons/ai'
import { TfiReload } from 'react-icons/tfi'
import { BiImageAdd } from 'react-icons/bi'
import {RxUpdate} from 'react-icons/rx'
import '@animxyz/core'
const AdminSetting = () => {
    const handleOnChange = (e) => {
        e.preventDefault();
    }
    return (
        <>
            <div className="w-full p-4 overflow-y-auto">
                <div className="w-full flex justify-between">
                    <h6 className=" font-semibold">Settings</h6>
                    <button className="flex items-center text-[#1F41AF]"> <span className='text-gray-700 mr-1'>Admin</span> / Setting</button>
                </div>
                <div className="w-full rounded border border-gray-300  my-6 box-border">
                    <h5 className="text-2xl font-semibold p-4 text-left border-b border-gray-300">Footer Setting</h5>
                    <form className='w-full p-4 ' action="">
                        <div className="w-full flex flex-col md:flex-row md:justify-between mb-6">
                            <label className='font-semibold flex items-center mr-2 md:mb-0 mb-1 w-52' htmlFor="">Footer FB Link</label>
                            <input type="text" name='footerFbLink' onChange={handleOnChange} className='w-full focus:outline focus:outline-blue-400 p-1 rounded border' />
                        </div>
                        <div className="w-full flex flex-col md:flex-row md:justify-between mb-6">
                            <label className='font-semibold flex items-center mr-2 md:mb-0 mb-1 w-52' htmlFor="">Footer Twitter Link</label>
                            <input type="text" name='footerTwitterLink' onChange={handleOnChange} className='w-full focus:outline focus:outline-blue-400 p-1 rounded border' />
                        </div>
                        <div className="w-full flex flex-col md:flex-row md:justify-between mb-6">
                            <label className='font-semibold flex items-center mr-2 md:mb-0 mb-1 w-52' htmlFor="">Footer Youtube Link</label>
                            <input type="text" name='footerTwitterLink' onChange={handleOnChange} className='w-full focus:outline focus:outline-blue-400 p-1 rounded border' />
                        </div>
                        <div className="w-full flex flex-col md:flex-row md:justify-between mb-6">
                            <label className='font-semibold flex items-center mr-2 md:mb-0 mb-1 w-52' htmlFor="">Footer Linkedin Link</label>
                            <input type="text" name='footerTwitterLink' onChange={handleOnChange} className='w-full focus:outline focus:outline-blue-400 p-1 rounded border' />
                        </div>
                        <div className="w-full flex flex-col md:flex-row md:justify-between mb-6">
                            <label className='font-semibold   mr-2 md:mb-0 mb-1 w-52' htmlFor="">Popular Listing 1 <span className='text-sm'>(Title/Link)</span></label>
                            <div className="w-full flex items-center justify-center">
                                <input type="text" name="popularListing1Title" onChange={handleOnChange} placeholder="title" className='w-full focus:outline focus:outline-blue-400 p-1 rounded border mx-1' />
                                <input type="text" name="popularListing1Link" onChange={handleOnChange} placeholder="link" className='w-full focus:outline focus:outline-blue-400 p-1 rounded border mx-1' />
                            </div>
                        </div>
                        <div className="w-full flex flex-col md:flex-row md:justify-between mb-6">
                            <label className='font-semibold   mr-2 md:mb-0 mb-1 w-52' htmlFor="">Popular Listing 2 <span className='text-sm'>(Title/Link)</span></label>
                            <div className="w-full flex items-center justify-center">
                                <input type="text" name="popularListing2Title" onChange={handleOnChange} placeholder="title" className='w-full focus:outline focus:outline-blue-400 p-1 rounded border mx-1' />
                                <input type="text" name="popularListing2Link" onChange={handleOnChange} placeholder="link" className='w-full focus:outline focus:outline-blue-400 p-1 rounded border mx-1' />
                            </div>
                        </div>
                        <div className="w-full flex flex-col md:flex-row md:justify-between mb-6">
                            <label className='font-semibold   mr-2 md:mb-0 mb-1 w-52' htmlFor="">Popular Listing 3 <span className='text-sm'>(Title/Link)</span></label>
                            <div className="w-full flex items-center justify-center">
                                <input type="text" name="popularListing3Title" onChange={handleOnChange} placeholder="title" className='w-full focus:outline focus:outline-blue-400 p-1 rounded border mx-1' />
                                <input type="text" name="popularListing3Link" onChange={handleOnChange} placeholder="link" className='w-full focus:outline focus:outline-blue-400 p-1 rounded border mx-1' />
                            </div>
                        </div>
                        <hr />
                        <div className="w-full flex flex-col md:flex-row md:justify-between my-6">
                            <label className='font-semibold flex items-center mr-2 md:mb-0 mb-1 w-52' htmlFor="">Company Address</label>
                            <input type="text" name='companyAddress' onChange={handleOnChange} className='w-full focus:outline focus:outline-blue-400 p-1 rounded border' />
                        </div>
                        <div className="w-full flex flex-col md:flex-row md:justify-between mb-6">
                            <label className='font-semibold flex items-center mr-2 md:mb-0 mb-1 w-52' htmlFor="">Company Email</label>
                            <input type="text" name='comapanyEmail' onChange={handleOnChange} className='w-full focus:outline focus:outline-blue-400 p-1 rounded border' />
                        </div>
                        <div className="w-full flex flex-col md:flex-row md:justify-between mb-6">
                            <label className='font-semibold flex items-center mr-2 md:mb-0 mb-1 w-52' htmlFor="">Company Contact</label>
                            <input type="text" name='comapnyContact' onChange={handleOnChange} className='w-full focus:outline focus:outline-blue-400 p-1 rounded border' />
                        </div>
                        <div className="w-full flex flex-col md:flex-row md:justify-between mb-6">
                            <label className='font-semibold flex items-center mr-2 md:mb-0 mb-1 w-52' htmlFor="">Company Fax</label>
                            <input type="text" name='comapanyFax' onChange={handleOnChange} className='w-full focus:outline focus:outline-blue-400 p-1 rounded border' />
                        </div>
                        <div className="w-full flex flex-col md:flex-row md:justify-between mb-6">
                            <label className='font-semibold flex items-center mr-2 md:mb-0 mb-1 w-52' htmlFor="">Company VAT (%)</label>
                            <input type="number" name='comapnyEmail' onChange={handleOnChange} className='w-full focus:outline focus:outline-blue-400 p-1 rounded border' />
                        </div>
                        <div className="w-full flex flex-col md:flex-row md:justify-between mb-6">
                            <label className='font-semibold flex items-center mr-2 md:mb-0 mb-1 w-52' htmlFor="">TRN</label>
                            <input type="text" name='trn' onChange={handleOnChange} className='w-full focus:outline focus:outline-blue-400 p-1 rounded border' />
                        </div>
                        <div className="w-full flex flex-col md:flex-row md:justify-between mb-6">
                            <label className='font-semibold flex items-center mr-2 md:mb-0 mb-1 w-52' htmlFor="">Beneficiary</label>
                            <input type="text" name='beneficiary' onChange={handleOnChange} className='w-full focus:outline focus:outline-blue-400 p-1 rounded border' />
                        </div>
                        <div className="w-full flex flex-col md:flex-row md:justify-between mb-6">
                            <label className='font-semibold flex items-center mr-2 md:mb-0 mb-1 w-52' htmlFor="">Bank</label>
                            <input type="text" name='bank' onChange={handleOnChange} className='w-full focus:outline focus:outline-blue-400 p-1 rounded border' />
                        </div>
                        <div className="w-full flex flex-col md:flex-row md:justify-between mb-6">
                            <label className='font-semibold flex items-center mr-2 md:mb-0 mb-1 w-52' htmlFor="">Swift</label>
                            <input type="text" name='swift' onChange={handleOnChange} className='w-full focus:outline focus:outline-blue-400 p-1 rounded border' />
                        </div>
                        <div className="w-full flex flex-col md:flex-row md:justify-between mb-6">
                            <label className='font-semibold flex items-center mr-2 md:mb-0 mb-1 w-52' htmlFor="">IBAN</label>
                            <input type="text" name='iban' onChange={handleOnChange} className='w-full focus:outline focus:outline-blue-400 p-1 rounded border' />
                        </div>
                        <div className="w-full flex flex-col md:flex-row md:justify-between mb-6">
                            <label className='font-semibold flex items-center mr-2 md:mb-0 mb-1 w-52' htmlFor="">Account Number</label>
                            <input type="text" name='accountNumber' onChange={handleOnChange} className='w-full focus:outline focus:outline-blue-400 p-1 rounded border' />
                        </div>
                        <div className="w-full flex flex-row md:justify-end justify-center mt-6">
                            <button className="bg-blue-400 px-2 py-1 text-white md:w-auto w-full justify-center rounded flex items-center hover:bg-blue-500">Update <RxUpdate className='ml-1' /></button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default AdminSetting