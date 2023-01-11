import React, { useEffect, useState } from 'react'
import { BiChevronDown } from 'react-icons/bi'
import { FaUserEdit, FaUsers, FaFileExport, FaQuestionCircle, FaListAlt } from 'react-icons/fa'
import { MdDashboard, MdAddLocationAlt, MdOutlinePlaylistAdd, MdList, MdBook, MdAddCircle, MdShoppingCart, MdContacts, MdInfo } from 'react-icons/md'
import { HiMapPin } from 'react-icons/hi2'
import { HiViewGridAdd, HiViewGrid, HiUsers } from 'react-icons/hi'
import { AiFillPlusSquare } from 'react-icons/ai'
import {TfiReload} from 'react-icons/tfi'
import { GiJourney } from 'react-icons/gi'
import '@animxyz/core'
import Head from 'next/head'
import Location from '../../../components/Admin/Location/Location'
import AdminNavbar from '../../../components/Admin/AdminNavbar'
import AdminSidebar from '../../../components/Admin/AdminSidebar'
const LocationPage = () => {
    const [location, setLocation] = useState([])
    const fetchLocation = async () => {
        const response = await fetch("/api/location/fetch", {
            method: 'GET'
        });
        const responseData = await response.json();
        if (responseData.success) {
            setLocation(responseData.location);
        }
    }
    useEffect(() => {
        fetchLocation();
    }, [])
    return (
        <>
            <Head>
            </Head>
            <div className="w-full bg-gray-50">
                <AdminNavbar />
                <div style={{ height: 'calc(100vh - 57px)' }} className="w-full flex justify-center ">
                    <AdminSidebar activePage={"View Location"} />
                    {
                        (location && location.length > 0) ? <Location location={location} fetchLocation={fetchLocation} /> :
                            <>
                                <div className="w-full p-4 overflow-y-auto">
                                    <div className="w-full flex justify-between">
                                        <h6 className=" font-semibold">Location</h6>
                                        <button className="flex items-center text-[#1F41AF]"> <TfiReload className='mx-2' /> Reload Data</button>
                                    </div>
                                    <div className="w-full flex justify-between items-center my-4 rounded border border-gray-300">
                                        <input   type="text" className='w-full h-full p-2 border-none focus:outline-none' />
                                        <button className='p-2 bg-[#1F41AF] rounded-r px-3 text-[white]'>Search</button>
                                    </div>
                                    
                                </div>
                            </>
                    }
                </div>
            </div>
        </>
    )
}

export default LocationPage