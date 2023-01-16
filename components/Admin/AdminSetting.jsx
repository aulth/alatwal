import React, { useEffect, useState } from 'react'
import { MdClose, MdCheck, MdOutlineEdit, MdFileDownloadDone } from 'react-icons/md'
import { IoAdd } from 'react-icons/io5'
import { AiOutlineSwap, AiOutlineDelete } from 'react-icons/ai'
import { TfiReload } from 'react-icons/tfi'
import { BiImageAdd } from 'react-icons/bi'
import {RxUpdate} from 'react-icons/rx'
import '@animxyz/core'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const AdminSetting = () => {
    const [settingData, setSettingData] = useState()
    const handleOnChange = (e) => {
        e.preventDefault();
        setSettingData({...settingData, [e.target.name]:e.target.value})
        console.log(settingData)
    }
    const handleOnEditSetting = async (e)=>{
        e.preventDefault();
        let response = await fetch('/api/setting/update', {
            method:'POST',
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify({settingData:settingData, authtoken:localStorage.getItem('alatwal-admin')})
        })
        let responseData = await response.json();
        if(responseData.success){
            toast.success(responseData.msg)
        }else{
            toast.error(responseData.msg)
        }
    }
    const fetchSetting = async ()=>{
        let response = await fetch('/api/setting/fetch');
        let responseData = await response.json();
        console.log(responseData)
        if(responseData.success){
            setSettingData(responseData.setting[0])
        }
    }
    useEffect(() => {
        fetchSetting();
    }, [])
    
    return (
        <>
        <ToastContainer/>
            <div className="w-full p-4 overflow-y-auto">
                <div className="w-full flex justify-between">
                    <h6 className=" font-semibold">Settings</h6>
                    <button className="flex items-center text-[#1F41AF]"> <span className='text-gray-700 mr-1'>Admin</span> / Setting</button>
                </div>
                <div className="w-full rounded border border-gray-300  my-6 box-border">
                    <h5 className="text-2xl font-semibold p-4 text-left border-b border-gray-300">Footer Setting</h5>
                    {
                        settingData && 
                        <form onSubmit={handleOnEditSetting} className='w-full p-4 ' action="">
                        <div className="w-full flex flex-col md:flex-row md:justify-between mb-6">
                            <label className='font-semibold flex items-center mr-2 md:mb-0 mb-1 w-52' htmlFor="">Footer FB Link</label>
                            <input type="text" value={settingData.footerFbLink} name='footerFbLink' onChange={handleOnChange} className='w-full focus:outline focus:outline-blue-400 p-1 rounded border' />
                        </div>
                        <div className="w-full flex flex-col md:flex-row md:justify-between mb-6">
                            <label className='font-semibold flex items-center mr-2 md:mb-0 mb-1 w-52' htmlFor="">Footer Instagram Link</label>
                            <input type="text"  value={settingData.footerInstagramLink}  name='footerInstagramLink' onChange={handleOnChange} className='w-full focus:outline focus:outline-blue-400 p-1 rounded border' />
                        </div>
                        <div className="w-full flex flex-col md:flex-row md:justify-between mb-6">
                            <label className='font-semibold flex items-center mr-2 md:mb-0 mb-1 w-52' htmlFor="">Footer Whatsapp Number</label>
                            <input type="text"  value={settingData.footerWhatsappNumber}  name='footerWhatsappNumber' onChange={handleOnChange} className='w-full focus:outline focus:outline-blue-400 p-1 rounded border' />
                        </div>
                        <div className="w-full flex flex-col md:flex-row md:justify-between mb-6">
                            <label className='font-semibold flex items-center mr-2 md:mb-0 mb-1 w-52' htmlFor="">Footer TripAdvisor Link</label>
                            <input type="text"  value={settingData.footerTripadvisor}  name='footerTripadvisor' onChange={handleOnChange} className='w-full focus:outline focus:outline-blue-400 p-1 rounded border' />
                        </div>
                        <div className="w-full flex flex-col md:flex-row md:justify-between mb-6">
                            <label className='font-semibold   mr-2 md:mb-0 mb-1 w-52' htmlFor="">Service 1 <span className='text-sm'>(Title/Link)</span></label>
                            <div className="w-full flex items-center justify-center">
                                <input type="text"  value={settingData.service1Title}  name="service1Title" onChange={handleOnChange} placeholder="title" className='w-full focus:outline focus:outline-blue-400 p-1 rounded border mx-1' />
                                <input type="text"   value={settingData.service1Link}  name="service1Link" onChange={handleOnChange} placeholder="link" className='w-full focus:outline focus:outline-blue-400 p-1 rounded border mx-1' />
                            </div>
                        </div>
                        <div className="w-full flex flex-col md:flex-row md:justify-between mb-6">
                            <label className='font-semibold   mr-2 md:mb-0 mb-1 w-52' htmlFor="">Service 2 <span className='text-sm'>(Title/Link)</span></label>
                            <div className="w-full flex items-center justify-center">
                                <input type="text" value={settingData.service2Title}  name="service2Title" onChange={handleOnChange} placeholder="title" className='w-full focus:outline focus:outline-blue-400 p-1 rounded border mx-1' />
                                <input type="text" value={settingData.service2Link}  name="service2Link" onChange={handleOnChange} placeholder="link" className='w-full focus:outline focus:outline-blue-400 p-1 rounded border mx-1' />
                            </div>
                        </div>
                        <div className="w-full flex flex-col md:flex-row md:justify-between mb-6">
                            <label className='font-semibold   mr-2 md:mb-0 mb-1 w-52' htmlFor="">Service 3 <span className='text-sm'>(Title/Link)</span></label>
                            <div className="w-full flex items-center justify-center">
                                <input type="text" value={settingData.service3Title}  name="service3Title" onChange={handleOnChange} placeholder="title" className='w-full focus:outline focus:outline-blue-400 p-1 rounded border mx-1' />
                                <input type="text" value={settingData.service3Link}  name="service3Link" onChange={handleOnChange} placeholder="link" className='w-full focus:outline focus:outline-blue-400 p-1 rounded border mx-1' />
                            </div>
                        </div>
                        <div className="w-full flex flex-col md:flex-row md:justify-between mb-6">
                            <label className='font-semibold flex items-center mr-2 md:mb-0 mb-1 w-52' htmlFor="">Quick Contact 1</label>
                            <input type="text" value={settingData.quickContact1}  name='quickContact1' onChange={handleOnChange} className='w-full focus:outline focus:outline-blue-400 p-1 rounded border' />
                        </div>
                        <div className="w-full flex flex-col md:flex-row md:justify-between mb-6">
                            <label className='font-semibold flex items-center mr-2 md:mb-0 mb-1 w-52' htmlFor="">Quick Contact 2</label>
                            <input type="text" value={settingData.quickContact2}  name='quickContact2' onChange={handleOnChange} className='w-full focus:outline focus:outline-blue-400 p-1 rounded border' />
                        </div>
                        <hr />
                        <div className="w-full flex flex-col md:flex-row md:justify-between my-6">
                            <label className='font-semibold flex items-center mr-2 md:mb-0 mb-1 w-52' htmlFor="">Company Address</label>
                            <input type="text" value={settingData.companyAddress}  name='companyAddress' onChange={handleOnChange} className='w-full focus:outline focus:outline-blue-400 p-1 rounded border' />
                        </div>
                        <div className="w-full flex flex-col md:flex-row md:justify-between mb-6">
                            <label className='font-semibold flex items-center mr-2 md:mb-0 mb-1 w-52' htmlFor="">Company Email</label>
                            <input type="text" value={settingData.companyEmail}  name='companyEmail' onChange={handleOnChange} className='w-full focus:outline focus:outline-blue-400 p-1 rounded border' />
                        </div>
                        <div className="w-full flex flex-col md:flex-row md:justify-between mb-6">
                            <label className='font-semibold flex items-center mr-2 md:mb-0 mb-1 w-52' htmlFor="">Company Contact</label>
                            <input type="text" value={settingData.companyContact}  name='companyContact' onChange={handleOnChange} className='w-full focus:outline focus:outline-blue-400 p-1 rounded border' />
                        </div>
                        <div className="w-full flex flex-col md:flex-row md:justify-between mb-6">
                            <label className='font-semibold flex items-center mr-2 md:mb-0 mb-1 w-52' htmlFor="">Company Fax</label>
                            <input type="text" value={settingData.companyFax}  name='companyFax' onChange={handleOnChange} className='w-full focus:outline focus:outline-blue-400 p-1 rounded border' />
                        </div>
                        <div className="w-full flex flex-col md:flex-row md:justify-between mb-6">
                            <label className='font-semibold flex items-center mr-2 md:mb-0 mb-1 w-52' htmlFor="">Company VAT (%)</label>
                            <input type="number" value={settingData.companyVAT}  name='companyVAT' onChange={handleOnChange} className='w-full focus:outline focus:outline-blue-400 p-1 rounded border' />
                        </div>
                        <div className="w-full flex flex-col md:flex-row md:justify-between mb-6">
                            <label className='font-semibold flex items-center mr-2 md:mb-0 mb-1 w-52' htmlFor="">TRN</label>
                            <input type="text" value={settingData.trn}  name='trn' onChange={handleOnChange} className='w-full focus:outline focus:outline-blue-400 p-1 rounded border' />
                        </div>
                        <div className="w-full flex flex-col md:flex-row md:justify-between mb-6">
                            <label className='font-semibold flex items-center mr-2 md:mb-0 mb-1 w-52' htmlFor="">Beneficiary</label>
                            <input type="text"  value={settingData.beneficiary} name='beneficiary' onChange={handleOnChange} className='w-full focus:outline focus:outline-blue-400 p-1 rounded border' />
                        </div>
                        <div className="w-full flex flex-col md:flex-row md:justify-between mb-6">
                            <label className='font-semibold flex items-center mr-2 md:mb-0 mb-1 w-52' htmlFor="">Bank</label>
                            <input type="text" value={settingData.bank}  name='bank' onChange={handleOnChange} className='w-full focus:outline focus:outline-blue-400 p-1 rounded border' />
                        </div>
                        <div className="w-full flex flex-col md:flex-row md:justify-between mb-6">
                            <label className='font-semibold flex items-center mr-2 md:mb-0 mb-1 w-52' htmlFor="">Swift</label>
                            <input type="text" value={settingData.bankswift}  name='bankswift' onChange={handleOnChange} className='w-full focus:outline focus:outline-blue-400 p-1 rounded border' />
                        </div>
                        <div className="w-full flex flex-col md:flex-row md:justify-between mb-6">
                            <label className='font-semibold flex items-center mr-2 md:mb-0 mb-1 w-52' htmlFor="">IBAN</label>
                            <input type="text" value={settingData.iban}  name='iban' onChange={handleOnChange} className='w-full focus:outline focus:outline-blue-400 p-1 rounded border' />
                        </div>
                        <div className="w-full flex flex-col md:flex-row md:justify-between mb-6">
                            <label className='font-semibold flex items-center mr-2 md:mb-0 mb-1 w-52' htmlFor="">Account Number</label>
                            <input type="text" value={settingData.accountNumber}  name='accountNumber' onChange={handleOnChange} className='w-full focus:outline focus:outline-blue-400 p-1 rounded border' />
                        </div>
                        <div className="w-full flex flex-row md:justify-end justify-center mt-6">
                            <button className="bg-blue-400 px-2 py-1 text-white md:w-auto w-full justify-center rounded flex items-center hover:bg-blue-500">Update <RxUpdate className='ml-1' /></button>
                        </div>
                    </form>
                    }
                </div>
            </div>
        </>
    )
}

export default AdminSetting