import React, { useEffect, useState } from 'react'
import { MdClose, MdCheck, MdOutlineEdit, MdFileDownloadDone } from 'react-icons/md'
import { IoAdd } from 'react-icons/io5'
import { AiOutlineSwap, AiOutlineDelete } from 'react-icons/ai'
import { TfiReload } from 'react-icons/tfi'
import { BiImageAdd } from 'react-icons/bi'
import '@animxyz/core'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-quill/dist/quill.snow.css'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import UploadImage from '../../Upload/UploadImage'
const QuillNoSSRWrapper = dynamic(import('react-quill'), {
    ssr: false,
    loading: () => <p>Loading ...</p>,
})
const AddNewTour = () => {
    const [tourData, setTourData] = useState({ title: "", overview: "", highlights: "", availability: "daily", status:'active', description: "", category: "", location:'', duration: "", adultRate: "", childRate: "", infantRate: "",  tourLanguage: "", importantInformation: "", bookingPolicy: "",  tourVideo: "", tourAddress: "", googleMapLocation: "", featuredTour: true, paymentMethod: "merchant", basic:true });
    const [category, setCategory] = useState([])
    const [location, setLocation] = useState([])
    const router = useRouter();
    const [image, setImage] = useState([]);
    const handleOnTextChange = (e) => {
        e.preventDefault();
        setTourData({ ...tourData, [e.target.name]: e.target.value });
        console.log(tourData);
    }
    const setOverview = (e) => {
        setTourData({ ...tourData, overview: e });
        console.log(tourData)
    }
    const handleOnAdd = async (e)=>{
        e.preventDefault();
        if(typeof window!=='undefined'){
            if(!tourData.title || !image || !tourData.featuredTour || !tourData.availability || !tourData.bookingPolicy || !tourData.category || !tourData.childRate   || !tourData.description || !tourData.duration || !tourData.googleMapLocation || !tourData.highlights || !tourData.importantInformation){
                toast.info("All fields required");
                return;
            }
            const add = await fetch('/api/tour/add', {
                method:"POST",
                headers:{
                    'content-type':'application/json'
                },
                body:JSON.stringify({tourData:tourData, image:image ,authtoken:localStorage.getItem('alatwal-admin')})
            })
            const addData = await add.json();
            if(!addData.success){
                toast.error(addData.msg);
                return;
            }
            toast.success("Added Succesfully");
            router.push("/admin/tours");
        }
    }

    const fetchCategory = async ()=>{
        const response = await fetch("/api/category/fetch", {
            method:'GET'
        });
        const responseData = await response.json();
        if(responseData.success){
            setCategory(responseData.category);
            setTourData({...tourData, category:responseData.category[0]._id})
        }
    }
    const fetchLocation = async ()=>{
        const response = await fetch("/api/location/fetch", {
            method:'GET'
        });
        const responseData = await response.json();
        if(responseData.success){
            setLocation(responseData.location);
            setTourData({...tourData, location:responseData.location[0].title})
        }
    }
    useEffect(() => {
      fetchCategory()
      fetchLocation()
    }, [])
    
    // rich text editor 
    const modules = {
        toolbar: [
            [{ header: '1' }, { header: '2' }, { font: [] }],
            [{ size: [] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [
                { list: 'ordered' },
                { list: 'bullet' },
                { indent: '-1' },
                { indent: '+1' },
            ],
            ['link', 'image', 'video'],
            ['clean'],
        ],
        clipboard: {
            matchVisual: false,
        },
    }
    const formats = [
        'header',
        'font',
        'size',
        'bold',
        'italic',
        'underline',
        'strike',
        'blockquote',
        'list',
        'bullet',
        'indent',
        'link',
        'image',
        'video',
    ]
    return (
        <>
        <ToastContainer/>
                    {
                        category && location && location.length>0 && category.length>0 && 
                        <form onSubmit={handleOnAdd} className='w-full p-4 ' action="">
                        <div className="w-full flex flex-col md:flex-row md:justify-between mb-6">
                            <label className='font-semibold flex items-center mr-2 md:mb-0 mb-1 w-52' htmlFor="">Title  <sup className='text-red-600'>*</sup></label>
                            <input type="text" name="title" onChange={handleOnTextChange} placeholder="Tour Title Here" className='w-full focus:outline focus:outline-blue-400 p-1 rounded border' />
                        </div>
                        <div className="w-full flex md:items-start flex-col md:flex-row md:justify-between mb-6">
                            <label className='font-semibold flex items-center mr-2 md:mb-0 mb-1 w-52' htmlFor="">Overview  <sup className='text-red-600'>*</sup></label>
                            <div className="w-full  border p-4 rounded bg-white">
                                <QuillNoSSRWrapper onChange={setOverview} placeholder="Tour Overview" className='' modules={modules} formats={formats} theme="snow" />
                            </div>
                        </div>
                        <div className="w-full flex flex-col md:flex-row md:justify-between mb-6">
                            <label className='font-semibold flex items-center mr-2 md:mb-0 mb-1 w-52' htmlFor="">Highlights  <sup className='text-red-600'>*</sup></label>
                            <input type="text" name="highlights" onChange={handleOnTextChange} placeholder="Separated by comma ," className='w-full focus:outline focus:outline-blue-400 p-1 rounded border' />
                        </div>
                        <div className="w-full flex flex-col md:flex-row md:justify-between my-6">
                            <label className='font-semibold flex items-center mr-2 md:mb-0 mb-1 w-52' htmlFor="">Availability  <sup className='text-red-600'>*</sup></label>
                            <select name="availability" onChange={handleOnTextChange} className='w-full focus:outline focus:outline-blue-400 p-1 rounded border cursor-pointer' >
                                <option value="daily">Daily</option>
                                <option value="weekly">Weekly</option>
                            </select>
                        </div>
                        <div className="w-full flex flex-col md:items-start md:flex-row md:justify-between mb-6">
                            <label className='font-semibold flex items-center mr-2 md:mb-0 mb-1 w-52' htmlFor="">Description  <sup className='text-red-600'>*</sup></label>
                            <textarea name="description" onChange={handleOnTextChange} placeholder="Description here" id="" className='w-full focus:outline focus:outline-blue-400 p-1 rounded border' >
                            </textarea>
                        </div>
                        <div className="w-full flex flex-col md:flex-row md:justify-between my-6">
                            <label className='font-semibold flex items-center mr-2 md:mb-0 mb-1 w-52' htmlFor="">Category  <sup className='text-red-600'>*</sup></label>
                            <select name="category" onChange={handleOnTextChange} className='w-full focus:outline focus:outline-blue-400 p-1 rounded border cursor-pointer' >
                                {
                                    category && category.length>0 && 
                                    category.map((category, index)=>{
                                        return <option key={index} value={category._id}>{category.title}</option>
                                    })
                                }
                            </select>
                        </div>
                        <div className="w-full flex flex-col md:flex-row md:justify-between my-6">
                            <label className='font-semibold flex items-center mr-2 md:mb-0 mb-1 w-52' htmlFor="">Location  <sup className='text-red-600'>*</sup></label>
                            <select name="location" onChange={handleOnTextChange} className='w-full focus:outline focus:outline-blue-400 p-1 rounded border cursor-pointer' >
                                <option value="">Select Location</option>
                                {
                                    location && location.length>0 && 
                                    location.map((location, index)=>{
                                        return <option key={index} value={location.title}>{location.title}</option>
                                    })
                                }
                            </select>
                        </div>
                        <div className="w-full flex flex-col md:flex-row md:justify-between mb-6">
                            <label className='font-semibold flex items-center mr-2 md:mb-0 mb-1 w-52' htmlFor="">Duration  <sup className='text-red-600'>*</sup></label>
                            <input type="text" name="duration" onChange={handleOnTextChange} placeholder="Tour duration 0 hour" className='w-full focus:outline focus:outline-blue-400 p-1 rounded border' />
                        </div>
                        <div className="w-full flex flex-col md:flex-row md:justify-between mb-6">
                            <label className='font-semibold flex items-center mr-2 md:mb-0 mb-1 w-52' htmlFor="">Adult Rate  <sup className='text-red-600'>*</sup></label>
                            <input type="number" name="adultRate" onChange={handleOnTextChange} placeholder="200" className='w-full focus:outline focus:outline-blue-400 p-1 rounded border' />
                        </div>
                        <div className="w-full flex flex-col md:flex-row md:justify-between mb-6">
                            <label className='font-semibold flex items-center mr-2 md:mb-0 mb-1 w-52' htmlFor="">Child Rate  <sup className='text-red-600'>*</sup></label>
                            <input type="number" name="childRate" onChange={handleOnTextChange} placeholder="100" className='w-full focus:outline focus:outline-blue-400 p-1 rounded border' />
                        </div>
                        <div className="w-full flex flex-col md:flex-row md:justify-between mb-6">
                            <label className='font-semibold flex items-center mr-2 md:mb-0 mb-1 w-52' htmlFor="">Infant Rate  <sup className='text-red-600'>*</sup></label>
                            <input type="number" name="infantRate" onChange={handleOnTextChange} placeholder="50" className='w-full focus:outline focus:outline-blue-400 p-1 rounded border' />
                        </div>
                        <div className="w-full flex flex-col md:flex-row md:justify-between mb-6">
                            <label className='font-semibold flex items-center mr-2 md:mb-0 mb-1 w-52' htmlFor="">Tour Language  <sup className='text-red-600'>*</sup></label>
                            <input type="text" name="tourLanguage" onChange={handleOnTextChange} placeholder="English" className='w-full focus:outline focus:outline-blue-400 p-1 rounded border' />
                        </div>
                        <div className="w-full flex flex-col md:items-start md:flex-row md:justify-between mb-6">
                            <label className='font-semibold flex items-center mr-2 md:mb-0 mb-1 w-52' htmlFor="">Important Information  <sup className='text-red-600'>*</sup></label>
                            <textarea name="importantInformation" onChange={handleOnTextChange} placeholder="Important Information" id="" className='w-full focus:outline focus:outline-blue-400 p-1 rounded border' >
                            </textarea>
                        </div>
                        <div className="w-full flex flex-col md:items-start md:flex-row md:justify-between mb-6">
                            <label className='font-semibold flex items-center mr-2 md:mb-0 mb-1 w-52' htmlFor="">Booking Policy  <sup className='text-red-600'>*</sup></label>
                            <textarea name="bookingPolicy" onChange={handleOnTextChange} placeholder="Write your booking policy here" id="" className='w-full focus:outline focus:outline-blue-400 p-1 rounded border' >
                            </textarea>
                        </div>
                        <div className="w-full flex flex-col md:items-start md:flex-row md:justify-between mb-6">
                            <label className='font-semibold flex items-center mr-2 md:mb-0 mb-1 w-52' htmlFor="">Tour Video  <sup className='text-red-600'>*</sup></label>
                            <textarea placeholder='Youtube url' name="tourVideo" onChange={handleOnTextChange} id="" className='w-full focus:outline focus:outline-blue-400 p-1 rounded border' >
                            </textarea>
                        </div>
                        <div className="w-full flex flex-col md:items-start md:flex-row md:justify-between mb-6">
                            <label className='font-semibold flex items-center mr-2 md:mb-0 mb-1 w-52' htmlFor="">Tour Address  <sup className='text-red-600'>*</sup></label>
                            <textarea name="tourAddress" onChange={handleOnTextChange} placeholder="Address" id="" className='w-full focus:outline focus:outline-blue-400 p-1 rounded border' >
                            </textarea>
                        </div>
                        <div className="w-full flex flex-col md:items-start md:flex-row md:justify-between mb-6">
                            <label className='font-semibold flex items-center mr-2 md:mb-0 mb-1 w-52' htmlFor="">Google Map Location  <sup className='text-red-600'>*</sup></label>
                            <textarea name="googleMapLocation" onChange={handleOnTextChange} placeholder="Google map url" id="" className='w-full focus:outline focus:outline-blue-400 p-1 rounded border' >
                            </textarea>
                        </div>
                        <div className="w-full flex flex-col md:flex-row md:justify-between my-6">
                            <label className='font-semibold flex items-center mr-2 md:mb-0 mb-1 w-52' htmlFor="">Featured Tour  <sup className='text-red-600'>*</sup></label>
                            <select name="featuredTour" onChange={handleOnTextChange} className='w-full focus:outline focus:outline-blue-400 p-1 rounded border cursor-pointer' >
                                <option value={true}>Yes</option>
                                <option value={false}>No</option>
                            </select>
                        </div>
                        <div className="w-full flex flex-col md:flex-row md:justify-between my-6">
                            <label className='font-semibold flex items-center mr-2 md:mb-0 mb-1 w-52' htmlFor="">Payment Method  <sup className='text-red-600'>*</sup></label>
                            <select name="paymentMethod" onChange={handleOnTextChange} className='w-full focus:outline focus:outline-blue-400 p-1 rounded border cursor-pointer' >
                                <option value="merchant">Merchant</option>
                                <option value="non-merchant">Non Merchant</option>
                            </select>
                        </div>
                        <div className="w-full flex flex-col md:flex-row md:justify-between my-6">
                            <label className='font-semibold flex items-center mr-2 md:mb-0 mb-1 w-52' htmlFor="">Status  <sup className='text-red-600'>*</sup></label>
                            <select name="status" onChange={handleOnTextChange} className='w-full focus:outline focus:outline-blue-400 p-1 rounded border cursor-pointer' >
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </select>
                        </div>
                        <UploadImage labelWidth={'w-52'} multiple={true} image={image} setImage={setImage} prset={'category'} />
                        <div className="w-full flex flex-row md:justify-end justify-center mb-3">
                            <button type='submit' className="bg-blue-400 px-2 py-1 text-white md:w-auto w-full justify-center rounded flex items-center hover:bg-blue-500">Add <IoAdd className='ml-1 text-xl' /></button>
                        </div>
                    </form>
                        
                    }
        </>
    )
}

export default AddNewTour