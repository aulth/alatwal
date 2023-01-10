import React, { useEffect, useContext } from 'react'
import { BiChevronDown } from 'react-icons/bi'
import { FaUserEdit, FaUsers, FaFileExport, FaQuestionCircle, FaListAlt } from 'react-icons/fa'
import { MdDashboard, MdAddLocationAlt, MdOutlinePlaylistAdd, MdList, MdBook, MdAddCircle, MdShoppingCart, MdContacts, MdInfo } from 'react-icons/md'
import { HiMapPin } from 'react-icons/hi2'
import { HiViewGridAdd, HiViewGrid, HiUsers } from 'react-icons/hi'
import { AiFillPlusSquare, AiFillSetting } from 'react-icons/ai'
import { GiJourney } from 'react-icons/gi'
import {FiLogOut} from 'react-icons/fi'
import Link from 'next/link'
import AppContext from '../../AppContext'
import '@animxyz/core'
import { useRouter } from 'next/router'

const AdminSidebar = ({activePage}) => {
    let router = useRouter();
    activePage = activePage?activePage:"Dashboard"
    const sideBarState = useContext(AppContext);
    const handleOnLogout = () => {
        if (typeof window !== 'undefined') {
            localStorage.removeItem("alatwal-admin");
            sideBarState.setIsAdmin(false);
            router.push("/admin/login")
        }
    }
    return (
        <>
            <div style={{height:"calc(100vh - 57px)"}} className={`w-[255px] ${sideBarState.adminSidebar?"flex w-[350px] absolute bg-white left-0 xyz-in":"hidden"} md:flex flex-col items-start h-full p-2 px-5 overflow-y-auto overflow-x-hidden z-50`} xyz="fade left">
                <div className='my-2'>
                    <label htmlFor="" className='uppercase text-gray-600 '> HOME</label>
                    <ul className='text-gray-800 my-2'>
                        <Link href={"/admin"}><button className={`my-1 flex items-center  hover:scale-105 duration-100 ${activePage=="Dashboard"?"font-semibold text-blue-400":""}`}><MdDashboard className='mx-1' /> Dashboard</button></Link>
                    </ul>
                </div>
                <div className='my-2'>
                    <label htmlFor="" className='uppercase text-gray-600'>Categories</label>
                    <ul className='text-gray-800 my-2'>
                        <Link href={"/admin/category"}><button className={`my-1 flex items-center  hover:scale-105 duration-100 ${activePage=="View Category"?"font-semibold text-blue-400":""}`}><HiViewGrid className='mx-1' /> View Categories</button></Link>
                        <Link href={"/admin/category/add"}><button className={`my-1 flex items-center  hover:scale-105 duration-100 ${activePage=="Add Category"?"font-semibold text-blue-400":""}`}><HiViewGridAdd className='mx-1 ' /> Add Categories</button></Link>
                    </ul>
                </div>
                <div className='my-2'>
                    <label htmlFor="" className='uppercase text-gray-600'>Location</label>
                    <ul className='text-gray-800 my-2'>
                        <Link href={"/admin/location"}><button className={`my-1 flex items-center  hover:scale-105 duration-100 ${activePage=="View Location"?"font-semibold text-blue-400":""}`}><HiMapPin className='mx-1' /> View Location</button></Link>
                        <Link href={"/admin/location/add"}><button className={`my-1 flex items-center  hover:scale-105 duration-100 ${activePage=="Add Location"?"font-semibold text-blue-400":""}`}><MdAddLocationAlt className='mx-1' /> Add Location</button></Link>
                    </ul>
                </div>
                <div className='my-2'>
                    <label htmlFor="" className='uppercase text-gray-600'>Users</label>
                    <ul className='text-gray-800 my-2'>
                        <Link href={"/admin/users"}><button className={`my-1 flex items-center  hover:scale-105 duration-100 ${activePage=="View Users"?"font-semibold text-blue-400":""}`}><FaUsers className='mx-1' /> View Users</button></Link>
                    </ul>
                </div>
                <div className='my-2'>
                    <label htmlFor="" className='uppercase text-gray-600'>Tours</label>
                    <ul className='text-gray-800 my-2'>
                        <Link href={"/admin/tours"}><button className={`my-1 flex items-center  hover:scale-105 duration-100 ${activePage=="View Tours"?"font-semibold text-blue-400":""}`}><GiJourney className='mx-1' /> View Tours</button></Link>
                        <Link href={"/admin/tours/add"}><button className={`my-1 flex items-center  hover:scale-105 duration-100 ${activePage=="Add Tour"?"font-semibold text-blue-400":""}`}><AiFillPlusSquare className='mx-1' /> Add Tour</button></Link>
                    </ul>
                </div>
                <div className='my-2'>
                    <label htmlFor="" className='uppercase text-gray-600'>Packages</label>
                    <ul className='text-gray-800 my-2'>
                        <Link href={"/admin/packages"}><button className={`my-1 flex items-center  hover:scale-105 duration-100 ${activePage=="View Packages"?"font-semibold text-blue-400":""}`}><MdList className='mx-1' /> View Packages</button></Link>
                        <Link href={"/admin/packages/add"}><button className={`my-1 flex items-center  hover:scale-105 duration-100 ${activePage=="Add Package"?"font-semibold text-blue-400":""}`}><MdOutlinePlaylistAdd className='mx-1' /> Add Packages</button></Link>
                    </ul>
                </div>
                <div className='my-2'>
                    <label htmlFor="" className='uppercase text-gray-600'>Visa Packages</label>
                    <ul className='text-gray-800 my-2'>
                        <Link href={"/admin/visas"}><button className={`my-1 flex items-center  hover:scale-105 duration-100 ${activePage=="View Visas"?"font-semibold text-blue-400":""}`}><MdBook className='mx-1' /> View Visas</button></Link>
                        <Link href={"/admin/visas/add"}><button className={`my-1 flex items-center  hover:scale-105 duration-100 ${activePage=="Add Visa"?"font-semibold text-blue-400":""}`}><MdAddCircle className='mx-1' /> Add Visa</button></Link>
                    </ul>
                </div>
                <div className='my-2'>
                    <label htmlFor="" className='uppercase text-gray-600'>Bookings</label>
                    <ul className='text-gray-800 my-2'>
                        <Link href={"/admin/bookings"}><button className={`my-1 flex items-center  hover:scale-105 duration-100 ${activePage=="View Bookings"?"font-semibold text-blue-400":""}`}><MdShoppingCart className='mx-1' /> View Bookings</button></Link>
                    </ul>
                </div>
                <div className='my-2'>
                    <label htmlFor="" className='uppercase text-gray-600'>Newsletter Subscriptions</label>
                    <ul className='text-gray-800 my-2'>
                        <Link href={"/admin/subscribers"}><button className={`my-1 flex items-center  hover:scale-105 duration-100 ${activePage=="View Subscribers"?"font-semibold text-blue-400":""}`}><HiUsers className='mx-1' /> View Subscribers</button></Link>
                        <Link href={"/"}><button className={`my-1 flex items-center  hover:scale-105 duration-100 ${activePage=="Export Subscribers"?"font-semibold text-blue-400":""}`}><FaFileExport className='mx-1' /> Export Subscribers</button></Link>
                    </ul>
                </div>
                <div className='my-2'>
                    <label htmlFor="" className='uppercase text-gray-600'>CMS Pages</label>
                    <ul className='text-gray-800 my-2'>
                        <Link href={"/admin/cms/contact"}><button className={`my-1 flex items-center  hover:scale-105 duration-100 ${activePage=="Contact"?"font-semibold text-blue-400":""}`}><MdContacts className='mx-1' /> Contact </button></Link>
                        <Link href={"/admin/cms/service"}><button className={`my-1 flex items-center  hover:scale-105 duration-100 ${activePage=="Service"?"font-semibold text-blue-400":""}`}><FaFileExport className='mx-1' /> Services</button></Link>
                        <Link href={"/admin/cms/faq"}><button className={`my-1 flex items-center  hover:scale-105 duration-100 ${activePage=="FAQ"?"font-semibold text-blue-400":""}`}><FaQuestionCircle className='mx-1' /> FAQ</button></Link>
                        <Link href={"/admin/cms/about"}><button className={`my-1 flex items-center  hover:scale-105 duration-100 ${activePage=="About"?"font-semibold text-blue-400":""}`}><MdInfo className='mx-1' /> About</button></Link>
                    </ul>
                </div>
                
                <div className='my-2'>
                    <label htmlFor="" className='uppercase text-gray-600'>Setting</label>
                    <ul className='text-gray-800 my-2'>
                        <Link href={"/admin/setting"}><button className={`my-1 flex items-center  hover:scale-105 duration-100 ${activePage=="Setting"?"font-semibold text-blue-400":""}`}><AiFillSetting className='mx-1' /> Setting </button></Link>
                        <button onClick={handleOnLogout} className={`my-1 flex items-center  hover:scale-105 duration-100 ${activePage=="Setting"?"font-semibold text-blue-400":""}`}><FiLogOut className='mx-1' /> Logout </button>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default AdminSidebar