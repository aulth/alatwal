import React, { useEffect, useState } from 'react'
import { IoAdd } from 'react-icons/io5'
import '@animxyz/core'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-quill/dist/quill.snow.css'
import AddBasicTour from './Basic/AddBasicTour'
import AddPlatinumTour from './Platinum/AddPlatinumTour'
import AddExplorerTour from './Explorer/AddExplorerTour'
const AddNewTour = () => {
    const [basic, setBasic] = useState(false)
    const [platinum, setPlatinum] = useState(false)
    const [explorer, setExplorer] = useState(false)
    const selectTourType = (type)=>{
        setBasic(false)
        setPlatinum(false)
        setExplorer(false)
        if(type=='basic'){
            setBasic(true)
        }else if(type =='platinum'){
            setPlatinum(true)
        }else{
            setExplorer(true)
        }
        if(typeof window!=='undefined'){
            for(let button of ['basic', 'platinum', 'explorer']){
                document.querySelector(`#${button}-btn`).classList.remove("bg-blue-400")
                document.querySelector(`#${button}-btn`).classList.remove("text-white")
            }
            document.getElementById(`${type}-btn`).classList.add("bg-blue-400")
            document.getElementById(`${type}-btn`).classList.add("text-white")
        }
    }
    return (
        <>
        <ToastContainer/>
            <div className="w-full p-4 overflow-y-auto">
                <div className="w-full flex justify-between">
                    <h6 className=" font-semibold">Add New Tour</h6>
                    <button className="flex items-center text-[#1F41AF]"> <span className='text-gray-700 mr-1'>Tours / Add </span>  {basic?' / Basic':platinum?' / Platinum':explorer?' / Explorer':''}</button>
                </div>
                <div className="w-full rounded border border-gray-300  my-6 box-border">
                    <h5 className="text-2xl font-semibold p-4 text-left border-b border-gray-300">Add New Tour</h5>
                    <div className="w-full flex justify-start items-center p-2">
                        <button onClick={()=>{selectTourType('basic')}} id='basic-btn' className="px-2 py-1 rounded border border-gray-400 m-2">Basic</button>
                        <button onClick={()=>{selectTourType('platinum')}} id='platinum-btn' className="px-2 py-1 rounded border border-gray-400 m-2">Platinum</button>
                        <button onClick={()=>{selectTourType('explorer')}} id='explorer-btn' className="px-2 py-1 rounded border border-gray-400 m-2">Explorer</button>
                    </div>
                    <hr />
                    {
                        basic && 
                        <AddBasicTour/>
                    }
                    {
                        platinum && 
                        <AddPlatinumTour/>
                    }
                    {
                        explorer && 
                        <AddExplorerTour/>
                    }
                </div>
            </div>
        </>
    )
}

export default AddNewTour