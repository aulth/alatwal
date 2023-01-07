import React, { useEffect } from 'react'
import { BiChevronDown } from 'react-icons/bi'
import { FaUserEdit, FaUsers, FaFileExport, FaQuestionCircle, FaListAlt } from 'react-icons/fa'
import { MdDashboard, MdAddLocationAlt, MdOutlinePlaylistAdd, MdList, MdBook, MdAddCircle, MdShoppingCart, MdContacts, MdInfo } from 'react-icons/md'
import { HiMapPin } from 'react-icons/hi2'
import { HiViewGridAdd, HiViewGrid, HiUsers } from 'react-icons/hi'
import { AiFillPlusSquare } from 'react-icons/ai'
import { GiJourney } from 'react-icons/gi'
import '@animxyz/core'
import Head from 'next/head'
import AdminNavbar from '../../../../components/AdminNavbar'
import AdminSidebar from '../../../../components/AdminSidebar'
import AdminContactCMS from '../../../../components/AdminContactCMS'
import AdminAboutCMS from '../../../../components/AdminAboutCMS'
const AboutCMSPage = () => {
    const showList = (id) => {
        if (typeof window !== 'undefined') {
            let list = document.querySelector(`#${id}`);
            list.classList.remove("hidden");
        }
    }
    const hideList = (id) => {
        if (typeof window !== 'undefined') {
            let list = document.querySelector(`#${id}`);
            list.classList.add("hidden");
        }
    }
    return (
        <>
            <Head>
            </Head>
            <div className="w-full bg-gray-50">
                <AdminNavbar/>
                <div style={{ height: 'calc(100vh - 57px)' }} className="w-full flex justify-center ">
                   <AdminSidebar activePage={"About"}/>
                   <AdminAboutCMS />
                </div>
            </div>
        </>
    )
}

export default AboutCMSPage