import React, { useEffect } from 'react'
import { BiChevronDown } from 'react-icons/bi'
import { FaUserEdit, FaUsers, FaFileExport, FaQuestionCircle, FaListAlt } from 'react-icons/fa'
import { MdDashboard, MdAddLocationAlt, MdOutlinePlaylistAdd, MdList, MdBook, MdAddCircle, MdShoppingCart, MdContacts, MdInfo } from 'react-icons/md'
import { HiMapPin } from 'react-icons/hi2'
import { HiViewGridAdd, HiViewGrid, HiUsers } from 'react-icons/hi'
import { AiFillPlusSquare } from 'react-icons/ai'
import { GiJourney } from 'react-icons/gi'
import Link from 'next/link'
const AdminSidebar = () => {
  return (
    <>
    
    <div className='w-[255px] hidden md:flex flex-col items-start h-full p-2 px-5 overflow-y-auto overflow-x-hidden'>
                        <div className='my-2'>
                            <label htmlFor="" className='uppercase text-gray-600 '> HOME</label>
                            <ul className='text-gray-800 my-2'>
                                <button className='my-1 flex items-center  hover:scale-105 duration-100'><MdDashboard className='mx-1' /> Dashboard</button>
                            </ul>
                        </div>
                        <div className='my-2'>
                            <label htmlFor="" className='uppercase text-gray-600'>Categories</label>
                            <ul className='text-gray-800 my-2'>
                                <Link href={"/admin/category"}><button className='my-1 flex items-center hover:scale-105 duration-100 '><HiViewGrid className='mx-1' /> View Categories</button></Link>
                                <Link href={"/admin/category/add"}><button className='my-1 flex items-center  hover:scale-105 duration-100 '><HiViewGridAdd className='mx-1 ' /> Add Categories</button></Link>
                            </ul>
                        </div>
                        <div className='my-2'>
                            <label htmlFor="" className='uppercase text-gray-600'>Location</label>
                            <ul className='text-gray-800 my-2'>
                            <Link href={"/admin/location"}><button className='my-1 flex items-center   hover:scale-105 duration-100'><HiMapPin className='mx-1' /> View Location</button></Link>
                            <Link href={"/admin/location/add"}><button className='my-1 flex items-center  hover:scale-105 duration-100 '><MdAddLocationAlt className='mx-1' /> Add Location</button></Link>
                            </ul>
                        </div>
                        <div className='my-2'>
                            <label htmlFor="" className='uppercase text-gray-600'>Users</label>
                            <ul className='text-gray-800 my-2'>
                            <Link href={"/admin/users"}><button className='my-1 flex items-center  hover:scale-105 duration-100 '><FaUsers className='mx-1' /> View Users</button></Link>
                            </ul>
                        </div>
                        <div className='my-2'>
                            <label htmlFor="" className='uppercase text-gray-600'>Tours</label>
                            <ul className='text-gray-800 my-2'>
                            <Link href={"/admin/tours"}><button className='my-1 flex items-center   hover:scale-105 duration-100'><GiJourney className='mx-1' /> View Tours</button></Link>
                            <Link href={"/admin/tours/add"}><button className='my-1 flex items-center  hover:scale-105 duration-100 '><AiFillPlusSquare className='mx-1' /> Add Tours</button></Link>
                            </ul>
                        </div>
                        <div className='my-2'>
                            <label htmlFor="" className='uppercase text-gray-600'>Packages</label>
                            <ul className='text-gray-800 my-2'>
                            <Link href={"/admin/packages"}><button className='my-1 flex items-center  hover:scale-105 duration-100'><MdList className='mx-1' /> View Packages</button></Link>
                            <Link href={"/admin/packages/add"}><button className='my-1 flex items-center  hover:scale-105 duration-100'><MdOutlinePlaylistAdd className='mx-1' /> Add Packages</button></Link>
                            </ul>
                        </div>
                        <div className='my-2'>
                            <label htmlFor="" className='uppercase text-gray-600'>Visa Packages</label>
                            <ul className='text-gray-800 my-2'>
                            <Link href={"/"}><button className='my-1 flex items-center  hover:scale-105 duration-100'><MdBook className='mx-1' /> View Visas</button></Link>
                            <Link href={"/"}><button className='my-1 flex items-center  hover:scale-105 duration-100'><MdAddCircle className='mx-1' /> Add Visa</button></Link>
                            </ul>
                        </div>
                        <div className='my-2'>
                            <label htmlFor="" className='uppercase text-gray-600'>Bookings</label>
                            <ul className='text-gray-800 my-2'>
                            <Link href={"/"}><button className='my-1 flex items-center  hover:scale-105 duration-100'><MdShoppingCart className='mx-1' /> View Visas</button></Link>
                            </ul>
                        </div>
                        <div className='my-2'>
                            <label htmlFor="" className='uppercase text-gray-600'>Newsletter Subscriptions</label>
                            <ul className='text-gray-800 my-2'>
                            <Link href={"/"}><button className='my-1 flex items-center  hover:scale-105 duration-100'><HiUsers className='mx-1' /> View Subscribers</button></Link>
                            <Link href={"/"}><button className='my-1 flex items-center  hover:scale-105 duration-100'><FaFileExport className='mx-1' /> Export Subscribers</button></Link>
                            </ul>
                        </div>
                        <div className='my-2'>
                            <label htmlFor="" className='uppercase text-gray-600'>CMS Pages</label>
                            <ul className='text-gray-800 my-2'>
                            <Link href={"/"}><button className='my-1 flex items-center  hover:scale-105 duration-100'><MdContacts className='mx-1' /> Contact </button></Link>
                            <Link href={"/"}><button className='my-1 flex items-center  hover:scale-105 duration-100'><FaFileExport className='mx-1' /> Services</button></Link>
                            <Link href={"/"}><button className='my-1 flex items-center  hover:scale-105 duration-100'><FaQuestionCircle className='mx-1' /> FAQ</button></Link>
                            <Link href={"/"}><button className='my-1 flex items-center  hover:scale-105 duration-100'><MdInfo className='mx-1' /> About</button></Link>
                            </ul>
                        </div>
                    </div>
    </>
  )
}

export default AdminSidebar