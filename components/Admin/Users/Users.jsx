import React, { useEffect } from 'react'
import { MdClose, MdCheck, MdOutlineEdit } from 'react-icons/md'
import { AiOutlineSwap, AiOutlineDelete } from 'react-icons/ai'
import { TfiReload } from 'react-icons/tfi'
import '@animxyz/core'
import UserComponent from './UserComponent'
const Users = ({ user, fetchUser }) => {
    let userData = []
    if (user) {
        for (let item of user) {
            userData.push({ name: item.name.toLowerCase().split(" ").join("-"), email: item.email.toLowerCase().split(" ").join("-"), id: item._id });
        }
    }
    useEffect(() => {
        if (typeof window !== 'undefined') {
        }
    }, [])


    const performSearch = (e) => {
        e.preventDefault();
        let query = e.target.value.toLowerCase().split(" ");;
        let result = [];
        if (typeof window !== 'undefined') {
            for (let keyword of query) {
                for (let user of userData) {
                    if (user.name.toLowerCase().match(keyword) || user.email.toLowerCase().match(keyword)) {
                        if (!result.includes(user.id)) {
                            result.push(user.id);
                        }
                    }
                }
            }
            for (let user of userData) {
                document.querySelector(`#user-${user.id}`).classList.add("hidden");
            }
            for (let user of result) {
                document.querySelector(`#user-${user}`).classList.remove("hidden");
            }
        }
    }
    return (
        <>
            <div className="w-full p-4 overflow-y-auto">
                <div className="w-full flex justify-between">
                    <h6 className=" font-semibold">Users</h6>
                    <button className="flex items-center text-[#1F41AF]"> <TfiReload className='mx-2' /> Reload Data</button>
                </div>
                <div className="w-full flex justify-between items-center my-4 rounded border border-gray-300">
                    <input onChange={performSearch} type="text" className='w-full h-full p-2 border-none focus:outline-none' />
                    <button className='p-2 bg-[#1F41AF] rounded-r px-3 text-[white]'>Search</button>
                </div>
                <div className="w-full flex  items-center justify-start my-2 box-border rounded bg-white p-4 ">
                    <table className='w-full'>
                        <thead className='border'>
                            <td className='p-1 uppercase font-semibold'>&nbsp;</td>
                            <td className='p-1 border-l px-2 uppercase font-semibold'>User</td>
                            <td className='p-1 border-l px-2 uppercase font-semibold'>Date of Joining</td>
                            <td className='p-1 border-l px-2 uppercase font-semibold'>Email</td>
                            <td className='p-1 border-l px-2 uppercase font-semibold'>Password</td>
                            <td className='p-1 border-l px-2 uppercase font-semibold'>Action</td>
                        </thead>
                        <tbody>
                            {
                                user && user.length > 0 &&
                                user.map((user, index) => {
                                    return <tr key={index} id={`user-${user._id}`} className='border-b border-l border-r'>
                                        <td className='p-1 text-center'>{index+1}</td>
                                        <UserComponent user={user} fetchUser={fetchUser} />
                                    </tr>
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default Users