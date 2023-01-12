import React, { useEffect, useState } from 'react'
import { MdClose, MdCheck, MdOutlineEdit, MdVerified, MdVerifiedUser } from 'react-icons/md'
import { AiOutlineSwap, AiOutlineDelete } from 'react-icons/ai'
import { TfiReload } from 'react-icons/tfi'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {BiSave} from 'react-icons/bi'
import { GoUnverified } from 'react-icons/go'
import '@animxyz/core'
const UserComponent = ({ user, fetchUser }) => {
    const [userData, setUserData] = useState(user);
    const [editWindow, setEditWindow] = useState(false)
    const handleOnEditClick = ()=>{
        if(editWindow){
            setEditWindow(false)
        }else{
            setEditWindow(true)
        }
    }
    const handleOnChange = (e) => {
        e.preventDefault();
        setUserData({ ...userData, [e.target.name]: e.target.value });
        console.log(userData)
    }
    const handleOnEdit = async(e)=>{
        e.preventDefault();
        const response = await fetch("/api/user/update",{
            method:'POST',
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify({userData, authtoken:localStorage.getItem("alatwal-admin")})
        })
        const responseData = await response.json();
        console.log(responseData);
        if(responseData.success){
            fetchUser();
            toast.success(responseData.msg);
            setEditWindow(false)
        }else{
            toast.error(responseData.msg)
        }

    }
    const handleOnDelete = async (id)=>{
        const response = await fetch("/api/user/delete", {
            method:'POST',
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify({id:id, authtoken:localStorage.getItem('alatwal-admin')})
        })
        const responseData = await response.json();
        console.log(responseData)
        if(responseData.success){
            toast.success(responseData.msg)
            fetchUser();
        }else{
            toast.error(responseData.msg)
        }
    }
    return (
        <>
        <ToastContainer/>
            {
                user &&
                <>
                    {
                        editWindow ? <td className='p-1 border-l px-2 flex items-center'><input type="text" value={userData.name} name='name' className='w-full border-none focus:outline-none ' onChange={handleOnChange} /></td> :
                            <td className='p-1 border-l px-2 flex items-center'><span className='mr-1 '>{user.name}</span>{user.admin ? <MdVerifiedUser className='text-yellow-500' /> : user.verified ? <MdVerified className='text-green-500' /> : <GoUnverified className='text-gray-500' />}</td>
                    }
                    <td className='p-1 border-l px-2'>{new Date(user.createdAt).getDate() + '/' + new Date(user.createdAt).getMonth() + 1 + "/" + new Date(user.createdAt).getFullYear()}</td>
                    {
                        editWindow ? <td className='p-1 border-l px-2'><input type="text" name='email'  value={userData.email} className='w-full border-none focus:outline-none ' onChange={handleOnChange} /></td> :
                            <td className='p-1 border-l px-2'>{user.email}</td>
                    }
                    {
                        editWindow ? <td className='p-1 border-l px-2'><input type="text" name='password'  value={userData.password} className='w-full border-none focus:outline-none  ' onChange={handleOnChange} /></td> :
                            <td className='p-1 border-l px-2'>{user.password}</td>
                    }
                    {
                        editWindow ?<td className='p-1 border-l px-2'><button onClick={handleOnEdit} className='px-2 py-1 border rounded hover:bg-gray-100'><BiSave /></button></td>:
                            <td className='p-1 border-l px-2'>
                                <div className="flex items-center">
                                    <button onClick={handleOnEditClick} className='px-2 py-1 border rounded-l hover:bg-gray-100'>
                                        <MdOutlineEdit />
                                    </button>
                                    <button onClick={()=>{handleOnDelete(user._id)}} className='px-2 py-1 border-r border-t border-b rounded-r hover:bg-gray-100'>
                                        <AiOutlineDelete />
                                    </button>
                                </div>
                            </td>
                    }



                </>
            }
        </>
    )
}

export default UserComponent