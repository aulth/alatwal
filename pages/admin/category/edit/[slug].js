import React, { useEffect, useState } from 'react'
import { BiChevronDown } from 'react-icons/bi'
import { FaUserEdit, FaUsers, FaFileExport, FaQuestionCircle, FaListAlt } from 'react-icons/fa'
import { MdDashboard, MdAddLocationAlt, MdOutlinePlaylistAdd, MdList, MdBook, MdAddCircle, MdShoppingCart, MdContacts, MdInfo } from 'react-icons/md'
import { HiMapPin } from 'react-icons/hi2'
import { HiViewGridAdd, HiViewGrid, HiUsers } from 'react-icons/hi'
import { AiFillPlusSquare } from 'react-icons/ai'
import { GiJourney } from 'react-icons/gi'
import '@animxyz/core'
import Head from 'next/head'
import EditCategory from '../../../../components/Admin/Category/EditCategory'
import AdminSidebar from '../../../../components/Admin/AdminSidebar'
import AdminNavbar from '../../../../components/Admin/AdminNavbar'
const EditPage = ({categoryUrl}) => {
    const [category, setCategory] = useState({title:'', image:[], status:'',});
    
    
    return (
        <>
            <Head>
            </Head>
            <div className="w-full bg-gray-50">
                <AdminNavbar/>
                <div style={{ height: 'calc(100vh - 57px)' }} className="w-full flex justify-center ">
                    <AdminSidebar activePage={"Add Category"}/>
                    <EditCategory categoryUrl={categoryUrl} />
                </div>
            </div>
        </>
    )
}

export default EditPage
export async function getServerSideProps(context) {
    const {slug} = context.params;
    console.log(slug)
    return {
      props: {
        categoryUrl:slug
      }, // will be passed to the page component as props
    }
  }