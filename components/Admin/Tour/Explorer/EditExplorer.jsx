import React, { useEffect, useState } from 'react'
import { MdClose, MdCheck, MdOutlineEdit, MdFileDownloadDone } from 'react-icons/md'
import { IoAdd } from 'react-icons/io5'
import { AiOutlineSwap, AiOutlineDelete } from 'react-icons/ai'
import { TfiReload } from 'react-icons/tfi'
import { BiImageAdd } from 'react-icons/bi'
import '@animxyz/core'
import {BiSave} from 'react-icons/bi'
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
const EditTour = ({ tourUrl }) => {
    const [tourData, setTourData] = useState({ title: "", overview: "", highlights: "", pickup:'', availability: "daily", status: 'active', description: "", category: "", location: '', duration: "", adultRateTicketOnly:'', adultRateSharingTransport:'', adultRatePrivateTransport:'', childRateTicketOnly:'', childRateSharingTransport:'', childRatePrivateTransport:'', infantRateTicketOnly:'', infantRateSharingTransport:'', infantRatePrivateTransport:'' , tourLanguage: "", importantInformation: "", bookingPolicy: "", tourVideo: "", tourAddress: "", googleMapLocation: "", featuredTour: true, paymentMethod: "merchant", explorer: true, id: '', success: false, transport:0, fastTrackAddOn:0 });
    const [category, setCategory] = useState([])
    const [location, setLocation] = useState([])
    const [tourDataLoaded, setTourDataLoaded] = useState(false)
    const router = useRouter();
    const [image, setImage] = useState([]);
    const handleOnTextChange = (e) => {
        e.preventDefault();
        setTourData({ ...tourData, [e.target.name]: e.target.value });
        console.log(tourData)
    }
    const setOverview = (e) => {
        setTourData({ ...tourData, overview: e });
    }
    const fetchTour = async () => {
        if (typeof window !== 'undefined') {
            const response = await fetch('/api/tour/fetchone', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({ url: tourUrl })
            })
            const responseData = await response.json();
            if (responseData.success) {
                setTourData({ title: responseData.tour.title, overview: responseData.tour.overview, highlights: responseData.tour.highlights, availability: responseData.tour.availability, status: responseData.tour.status, description: responseData.tour.description, category: responseData.tour.category, location: responseData.tour.location, duration: responseData.tour.duration, adultRateTicketOnly:responseData.tour.adultRateTicketOnly, adultRateSharingTransport:responseData.tour.adultRateSharingTransport, adultRatePrivateTransport:responseData.tour.adultRatePrivateTransport, childRateTicketOnly:responseData.tour.childRateTicketOnly, childRateSharingTransport:responseData.tour.childRateSharingTransport, childRatePrivateTransport:responseData.tour.childRatePrivateTransport, infantRateTicketOnly:responseData.tour.infantRateTicketOnly, infantRateSharingTransport:responseData.tour.infantRateSharingTransport, infantRatePrivateTransport:responseData.tour.infantRatePrivateTransport, pickup:responseData.tour.pickup, tourLanguage: responseData.tour.tourLanguage, importantInformation: responseData.tour.importantInformation, bookingPolicy: responseData.tour.bookingPolicy, tourVideo: responseData.tour.tourVideo, tourAddress: responseData.tour.tourAddress, googleMapLocation: responseData.tour.googleMapLocation, featuredTour: responseData.tour.featuredTour, paymentMethod: responseData.tour.paymentMethod, id: responseData.tour._id, success: true, transport:responseData.tour.transport, fastTrackAddOn:responseData.tour.fastTrackAddOn });
                setImage(responseData.tour.image)
                setTourDataLoaded(true)
            }
        }
    }

    const handleOnEdit = async (e) => {
        e.preventDefault();
        console.log(tourData)
        if (typeof window !== 'undefined') {
            if (!tourData.title || !image.length > 0 || !tourData.featuredTour || !tourData.availability || !tourData.bookingPolicy || !tourData.category || !tourData.adultRateTicketOnly || !tourData.adultRateSharingTransport || !tourData.adultRatePrivateTransport || !tourData.childRateTicketOnly || !tourData.childRateSharingTransport || !tourData.childRatePrivateTransport || !tourData.infantRateTicketOnly || !tourData.infantRateSharingTransport || !tourData.infantRatePrivateTransport || !tourData.pickup ||  !tourData.description || !tourData.duration || !tourData.googleMapLocation || !tourData.highlights || !tourData.importantInformation) {
                toast.info("All fields required");
                return;
            }
            const add = await fetch("/api/tour/update", {
                method: "POST",
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({ title: tourData.title, overview: tourData.overview, highlights: tourData.highlights, availability: tourData.availability, status: tourData.status, description: tourData.description, category: tourData.category, duration: tourData.duration,  adultRateTicketOnly:tourData.adultRateTicketOnly, adultRateSharingTransport:tourData.adultRateSharingTransport, adultRatePrivateTransport:tourData.adultRatePrivateTransport, childRateTicketOnly:tourData.childRateTicketOnly, childRateSharingTransport:tourData.childRateSharingTransport, childRatePrivateTransport:tourData.childRatePrivateTransport, infantRateTicketOnly:tourData.infantRateTicketOnly, infantRateSharingTransport:tourData.infantRateSharingTransport, infantRatePrivateTransport:tourData.infantRatePrivateTransport, pickup:tourData.pickup, tourLanguage: tourData.tourLanguage, importantInformation: tourData.importantInformation, bookingPolicy: tourData.bookingPolicy, tourVideo: tourData.tourVideo, tourAddress: tourData.tourAddress, googleMapLocation: tourData.googleMapLocation, featuredTour: tourData.featuredTour, paymentMethod: tourData.paymentMethod, authtoken: localStorage.getItem('alatwal-admin'), id: tourData.id, image: image, location: tourData.location, explorer:true, transport:tourData.transport, fastTrackAddOn:tourData.fastTrackAddOn })
            })
            const addData = await add.json();
            if (!addData.success) {
                toast.error(addData.msg);
                return;
            }
            toast.success("Edited Succesfully");
            router.push("/admin/tours");
        }
    }
    const fetchCategory = async () => {
        const response = await fetch("/api/category/fetch", {
            method: 'GET'
        });
        const responseData = await response.json();
        if (responseData.success) {
            setCategory(responseData.category);
        }
    }
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
        fetchTour()
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
            <ToastContainer />
            <div className="w-full p-4 overflow-y-auto">
                <div className="w-full flex justify-between">
                    <h6 className=" font-semibold">Edit Tour</h6>
                    <button className="flex items-center text-[#1F41AF]"> <span className='text-gray-700 mr-1'>Tours</span> / Edit</button>
                </div>
                <div className="w-full rounded border border-gray-300  my-6 box-border">
                    <h5 className="text-2xl font-semibold p-4 text-left border-b border-gray-300">Edit Tour</h5>
                    {
                        category.length > 0 && location.length > 0 && tourData.success &&
                        <form onSubmit={handleOnEdit} className='w-full p-4 ' >
                            <div className="w-full flex flex-col md:flex-row md:justify-between mb-6">
                                <label className='font-semibold flex items-center mr-2 md:mb-0 mb-1 w-52' htmlFor="">Title<sup className='text-red-600'>*</sup></label>
                                <input type="text" value={tourData.title} name="title" onChange={handleOnTextChange} placeholder="Tour Title Here" className='w-full focus:outline focus:outline-blue-400 p-1 rounded border' />
                            </div>
                            <div className="w-full flex md:items-start flex-col md:flex-row md:justify-between mb-6">
                                <label className='font-semibold flex items-center mr-2 md:mb-0 mb-1 w-52' htmlFor="">Overview  <sup className='text-red-600'>*</sup></label>
                                <div className="w-full  border p-4 rounded bg-white">
                                    <QuillNoSSRWrapper value={tourData.overview} onChange={setOverview} placeholder="Tour Overview" className='' modules={modules} formats={formats} theme="snow" />
                                </div>
                            </div>
                            <div className="w-full flex flex-col md:flex-row md:justify-between mb-6">
                                <label className='font-semibold flex items-center mr-2 md:mb-0 mb-1 w-52' htmlFor="">Highlights  <sup className='text-red-600'>*</sup></label>
                                <input type="text" value={tourData.highlights} name="highlights" onChange={handleOnTextChange} placeholder="Separated by comma ," className='w-full focus:outline focus:outline-blue-400 p-1 rounded border' />
                            </div>
                            <div className="w-full flex flex-col md:flex-row md:justify-between mb-6">
                                <label className='font-semibold flex items-center mr-2 md:mb-0 mb-1 w-52' htmlFor="">Pickup Loation  <sup className='text-red-600'>*</sup></label>
                                <input type="text"  value={tourData.pickup}  name="pickup" onChange={handleOnTextChange} placeholder="Separated by comma ," className='w-full focus:outline focus:outline-blue-400 p-1 rounded border' />
                            </div>
                            <div className="w-full flex flex-col md:flex-row md:justify-between my-6">
                                <label className='font-semibold flex items-center mr-2 md:mb-0 mb-1 w-52' htmlFor="">Availability  <sup className='text-red-600'>*</sup></label>
                                <select value={tourData.availability} name="availability" onChange={handleOnTextChange} className='w-full focus:outline focus:outline-blue-400 p-1 rounded border cursor-pointer' >
                                    <option value="daily">Daily</option>
                                    <option value="weekly">Weekly</option>
                                </select>
                            </div>
                            <div className="w-full flex flex-col md:items-start md:flex-row md:justify-between mb-6">
                                <label className='font-semibold flex items-center mr-2 md:mb-0 mb-1 w-52' htmlFor="">Description  <sup className='text-red-600'>*</sup></label>
                                <textarea value={tourData.description} name="description" onChange={handleOnTextChange} placeholder="Description here" id="" className='w-full focus:outline focus:outline-blue-400 p-1 rounded border' >
                                </textarea>
                            </div>
                            <div className="w-full flex flex-col md:flex-row md:justify-between my-6">
                                <label className='font-semibold flex items-center mr-2 md:mb-0 mb-1 w-52' htmlFor="">Category  <sup className='text-red-600'>*</sup></label>
                                <select name="category" value={tourData.category} onChange={handleOnTextChange} className='w-full focus:outline focus:outline-blue-400 p-1 rounded border cursor-pointer' >
                                    <option value="">Select Category</option>
                                    {
                                        category && category.length > 0 &&
                                        category.map((category, index) => {
                                            return <option key={index} value={category._id}>{category.title}</option>
                                        })
                                    }
                                </select>
                            </div>
                            <div className="w-full flex flex-col md:flex-row md:justify-between my-6">
                                <label className='font-semibold flex items-center mr-2 md:mb-0 mb-1 w-52' htmlFor="">Location  <sup className='text-red-600'>*</sup></label>
                                <select name="location" value={tourData.location} onChange={handleOnTextChange} className='w-full focus:outline focus:outline-blue-400 p-1 rounded border cursor-pointer' >
                                    <option value="">Select Location</option>
                                    {
                                        location && location.length > 0 &&
                                        location.map((location, index) => {
                                            return <option key={index} value={location.title}>{location.title}</option>
                                        })
                                    }
                                </select>
                            </div>
                            <div className="w-full flex flex-col md:flex-row md:justify-between mb-6">
                                <label className='font-semibold flex items-center mr-2 md:mb-0 mb-1 w-52' htmlFor="">Duration  <sup className='text-red-600'>*</sup></label>
                                <input type="text" value={tourData.duration} name="duration" onChange={handleOnTextChange} placeholder="Tour duration 0 hour" className='w-full focus:outline focus:outline-blue-400 p-1 rounded border' />
                            </div>
                            <div className="w-full flex flex-col md:flex-row md:justify-between mb-6">
                                <label className='font-semibold flex items-center mr-2 md:mb-0 mb-1 w-52' htmlFor="">Adult Rate (Ticket/ Sharing TP / Pvt TP )  <sup className='text-red-600'>*</sup></label>
                                <div className="w-full flex items-center justify-center">
                                    <input  value={tourData.adultRateTicketOnly}  type="number" name="adultRateTicketOnly" onChange={handleOnTextChange} placeholder="200" className='w-full focus:outline focus:outline-blue-400 p-1 rounded border mx-1' />
                                    <input  value={tourData.adultRateSharingTransport}  type="number" name="adultRateSharingTransport" onChange={handleOnTextChange} placeholder="210" className='w-full focus:outline focus:outline-blue-400 p-1 rounded border mx-1' />
                                    <input  value={tourData.adultRatePrivateTransport}  type="number" name="adultRatePrivateTransport" onChange={handleOnTextChange} placeholder="220" className='w-full focus:outline focus:outline-blue-400 p-1 rounded border mx-1' />
                                </div>
                            </div>
                            <div className="w-full flex flex-col md:flex-row md:justify-between mb-6">
                                <label className='font-semibold flex items-center mr-2 md:mb-0 mb-1 w-52' htmlFor="">Child Rate   (Ticket/ Sharing TP / Pvt TP ) <sup className='text-red-600'>*</sup></label>
                                <div className="w-full flex items-center justify-center">
                                    <input type="number" value={tourData.childRateTicketOnly}  name="childRateTicketOnly" onChange={handleOnTextChange} placeholder="200" className='w-full focus:outline focus:outline-blue-400 p-1 rounded border mx-1' />
                                    <input type="number" value={tourData.childRateSharingTransport}  name="childRateSharingTransport" onChange={handleOnTextChange} placeholder="210" className='w-full focus:outline focus:outline-blue-400 p-1 rounded border mx-1' />
                                    <input type="number"  value={tourData.childRatePrivateTransport}   name="childRatePrivateTransport" onChange={handleOnTextChange} placeholder="220" className='w-full focus:outline focus:outline-blue-400 p-1 rounded border mx-1' />
                                </div>
                            </div>
                            <div className="w-full flex flex-col md:flex-row md:justify-between mb-6">
                                <label className='font-semibold flex items-center mr-2 md:mb-0 mb-1 w-52' htmlFor="">Infant Rate  (Ticket/ Sharing TP / Pvt TP )  <sup className='text-red-600'>*</sup></label>
                                <div className="w-full flex items-center justify-center">
                                    <input type="number" value={tourData.infantRateTicketOnly}  name="infantRateTicketOnly" onChange={handleOnTextChange} placeholder="200" className='w-full focus:outline focus:outline-blue-400 p-1 rounded border mx-1' />
                                    <input type="number" value={tourData.infantRateSharingTransport}  name="infantRateSharingTransport" onChange={handleOnTextChange} placeholder="210" className='w-full focus:outline focus:outline-blue-400 p-1 rounded border mx-1' />
                                    <input type="number" value={tourData.infantRatePrivateTransport}  name="infantRatePrivateTransport" onChange={handleOnTextChange} placeholder="220" className='w-full focus:outline focus:outline-blue-400 p-1 rounded border mx-1' />
                                </div>
                            </div>
                            <div className="w-full flex flex-col md:flex-row md:justify-between mb-6">
                                <label className='font-semibold flex items-center mr-2 md:mb-0 mb-1 w-52' htmlFor="">Transport Rate  <sup className='text-red-600'>*</sup></label>
                                <input type="Number" value={tourData.transport} name="transport" onChange={handleOnTextChange} placeholder="90 Rate" className='w-full focus:outline focus:outline-blue-400 p-1 rounded border' />
                            </div>
                            <div className="w-full flex flex-col md:flex-row md:justify-between mb-6">
                                <label className='font-semibold flex items-center mr-2 md:mb-0 mb-1 w-52' htmlFor="">Fast Track Add On  <sup className='text-red-600'>*</sup></label>
                                <input type="Number" value={tourData.fastTrackAddOn} name="fastTrackAddOn" onChange={handleOnTextChange} placeholder="100" className='w-full focus:outline focus:outline-blue-400 p-1 rounded border' />
                            </div>
                            <div className="w-full flex flex-col md:flex-row md:justify-between mb-6">
                                <label className='font-semibold flex items-center mr-2 md:mb-0 mb-1 w-52' htmlFor="">Tour Language  <sup className='text-red-600'>*</sup></label>
                                <input type="text" name="tourLanguage" value={tourData.tourLanguage} onChange={handleOnTextChange} placeholder="English" className='w-full focus:outline focus:outline-blue-400 p-1 rounded border' />
                            </div>

                            <div className="w-full flex flex-col md:items-start md:flex-row md:justify-between mb-6">
                                <label className='font-semibold flex items-center mr-2 md:mb-0 mb-1 w-52' htmlFor="">Important Information  <sup className='text-red-600'>*</sup></label>
                                <textarea name="importantInformation" value={tourData.importantInformation} onChange={handleOnTextChange} placeholder="Important Information" id="" className='w-full focus:outline focus:outline-blue-400 p-1 rounded border' >
                                </textarea>
                            </div>
                            <div className="w-full flex flex-col md:items-start md:flex-row md:justify-between mb-6">
                                <label className='font-semibold flex items-center mr-2 md:mb-0 mb-1 w-52' htmlFor="">Booking Policy  <sup className='text-red-600'>*</sup></label>
                                <textarea name="bookingPolicy" value={tourData.bookingPolicy} onChange={handleOnTextChange} placeholder="Write your booking policy here" id="" className='w-full focus:outline focus:outline-blue-400 p-1 rounded border' >
                                </textarea>
                            </div>
                            <div className="w-full flex flex-col md:items-start md:flex-row md:justify-between mb-6">
                                <label className='font-semibold flex items-center mr-2 md:mb-0 mb-1 w-52' htmlFor="">Tour Video  <sup className='text-red-600'>*</sup></label>
                                <textarea placeholder='Youtube url' value={tourData.tourVideo} name="tourVideo" onChange={handleOnTextChange} id="" className='w-full focus:outline focus:outline-blue-400 p-1 rounded border' >
                                </textarea>
                            </div>
                            <div className="w-full flex flex-col md:items-start md:flex-row md:justify-between mb-6">
                                <label className='font-semibold flex items-center mr-2 md:mb-0 mb-1 w-52' htmlFor="">Tour Address  <sup className='text-red-600'>*</sup></label>
                                <textarea name="tourAddress" value={tourData.tourAddress} onChange={handleOnTextChange} placeholder="Address" id="" className='w-full focus:outline focus:outline-blue-400 p-1 rounded border' >
                                </textarea>
                            </div>
                            <div className="w-full flex flex-col md:items-start md:flex-row md:justify-between mb-6">
                                <label className='font-semibold flex items-center mr-2 md:mb-0 mb-1 w-52' htmlFor="">Google Map Location  <sup className='text-red-600'>*</sup></label>
                                <textarea name="googleMapLocation" value={tourData.googleMapLocation} onChange={handleOnTextChange} placeholder="Google map url" id="" className='w-full focus:outline focus:outline-blue-400 p-1 rounded border' >
                                </textarea>
                            </div>
                            <div className="w-full flex flex-col md:flex-row md:justify-between my-6">
                                <label className='font-semibold flex items-center mr-2 md:mb-0 mb-1 w-52' htmlFor="">Featured Tour  <sup className='text-red-600'>*</sup></label>
                                <select name="featuredTour" value={tourData.featuredTour} onChange={handleOnTextChange} className='w-full focus:outline focus:outline-blue-400 p-1 rounded border cursor-pointer' >
                                    <option value={true}>Yes</option>
                                    <option value={false}>No</option>
                                </select>
                            </div>
                            <div className="w-full flex flex-col md:flex-row md:justify-between my-6">
                                <label className='font-semibold flex items-center mr-2 md:mb-0 mb-1 w-52' htmlFor="">Payment Method  <sup className='text-red-600'>*</sup></label>
                                <select name="paymentMethod" value={tourData.paymentMethod} onChange={handleOnTextChange} className='w-full focus:outline focus:outline-blue-400 p-1 rounded border cursor-pointer' >
                                    <option value="merchant">Merchant</option>
                                    <option value="non-merchant">Non Merchant</option>
                                </select>
                            </div>
                            <div className="w-full flex flex-col md:flex-row md:justify-between my-6">
                                <label className='font-semibold flex items-center mr-2 md:mb-0 mb-1 w-52' htmlFor="">Status  <sup className='text-red-600'>*</sup></label>
                                <select name="status" value={tourData.status} onChange={handleOnTextChange} className='w-full focus:outline focus:outline-blue-400 p-1 rounded border cursor-pointer' >
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                </select>
                            </div>
                            <UploadImage labelWidth={'w-52'} multiple={true} image={image} setImage={setImage} prset={'category'} />
                            <div className="w-full flex flex-row md:justify-end justify-center mb-3">
                                <button type='submit' className="bg-blue-400 px-2 py-1 text-white md:w-auto w-full justify-center rounded flex items-center hover:bg-blue-500">Save Changes <BiSave className='ml-1 text-xl' /></button>
                            </div>
                        </form>

                    }
                </div>
            </div>
        </>
    )
}

export default EditTour