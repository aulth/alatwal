import React, { useEffect ,useContext, useState} from 'react'
import AppContext from '../AppContext'
import { BiChevronDown } from 'react-icons/bi'
import { FaUserEdit, FaUsers, FaFileExport, FaQuestionCircle, FaListAlt } from 'react-icons/fa'
import { MdDashboard, MdAddLocationAlt, MdOutlinePlaylistAdd, MdList, MdBook, MdAddCircle, MdShoppingCart, MdContacts, MdInfo } from 'react-icons/md'
import { HiMapPin } from 'react-icons/hi2'
import { HiViewGridAdd, HiViewGrid, HiUsers } from 'react-icons/hi'
import { AiFillPlusSquare } from 'react-icons/ai'
import { GiJourney } from 'react-icons/gi'
import Link from 'next/link'
import { useRouter } from 'next/router'
const AdminNavbar = () => {
    const router = useRouter();
    const sideBarState = useContext(AppContext)
    const [screenSizeBig, setScreenSizeBig] = useState(true)
    const toggleAdminSidebar = ()=>{
        if(sideBarState.adminSidebar){
            sideBarState.setAdminSidebar(false);
        }else{
            sideBarState.setAdminSidebar(true);
        }
    }
    useEffect(() => {
      sideBarState.setAdminSidebar(false);
    }, [screenSizeBig])

    useEffect(() => {
        if(window.innerWidth>=500){
            setScreenSizeBig(true);
        }
        window.addEventListener("resize", ()=>{
        if(window.innerWidth>=500){
            setScreenSizeBig(true)
            sideBarState.setAdminSidebar(false)
        }else{
            setScreenSizeBig(false)
        }
      })
    }, [])
    
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
            <nav onMouseLeave={() => hideList("admin-menu")} className="relative px-4 py-2 flex justify-between items-center bg-white border-b border-gray-200">
                <Link  className="text-3xl font-bold leading-none" href={"/"}>
                    <img src="/logo.png" className='w-16' />
                </Link>
                <div className="lg:hidden md:hidden">
                    <button onClick={toggleAdminSidebar} className="navbar-burger flex items-center text-blue-600 p-3">
                        <svg className="block h-4 w-4 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <title>Mobile menu</title>
                            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                        </svg>
                    </button>
                </div>
                <div className="hidden md:flex lg:ml-auto lg:mr-3 text-gray-900 lg:flex items-center">
                    <div onMouseEnter={() => { showList('admin-menu') }} className="flex items-center relative">
                        <img src="https://i.pravatar.cc/100?img=2" className='w-8 h-8 rounded-full aspect-square' alt="" />
                        <button className='flex items-center mx-1 font-semibold'>Mohd Usman <BiChevronDown className='text-xl' /></button>
                        <div id='admin-menu' className="w-full hidden  absolute bg-white rounded-b border border-gray-300 text-gray-400 text-sm top-0 mt-[45px] transition-all xyz-in p-2 z-50" xyz="fade">
                            <ul>
                                <li className='flex items-center py-2 cursor-pointer hover:text-gray-500'><FaUserEdit className='text-base mx-1 ' />Edit My Profile</li>
                                <li className='flex items-center  border-b border-gray-200 py-2 cursor-pointer hover:text-gray-500'><FaUserEdit className='text-base mx-1  ' />Tasks</li>
                                <li className='flex items-center py-2 cursor-pointer hover:text-gray-500'><FaUserEdit className='text-base mx-1 ' />Log out</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default AdminNavbar