import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { AiTwotoneStar } from 'react-icons/ai'
import { CiLocationOn } from 'react-icons/ci'
import { AiOutlineCheckCircle } from 'react-icons/ai'
import { IoCallOutline } from 'react-icons/io5'
import { MdNavigateNext } from 'react-icons/md'
import { GrFormDown } from 'react-icons/gr'
import { CiCalendarDate } from 'react-icons/ci'
import { MdVerified } from 'react-icons/md'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Carousel from './Carousel'
import Navbar from './Navbar'
import ApplyVisa from './ApplyVisa'
const VisaPage = ({ data }) => {
    const router = useRouter();
    const { slag } = router.query;
    const [settingData, setSettingData] = useState()
    const [overviewStatus, setOverviewStatus] = useState(true)
    const [descriptionStatus, setDescriptionStatus] = useState(true)
    const [highlightStatus, setHighlightStatus] = useState(true)
    const [bookingPolicyStatus, setBookingPolicyStatus] = useState(true)
    const [importantInformationStatus, setImportantInformationStatus] = useState(true)
    const [applyClicked, setApplyClicked] = useState(false)
    // let price = { adult: data.adultRate, child: data.childRate, infant: data.infantRate };
    const toggleAccordian = id => {
        if (typeof window !== 'undefined') {
            let accordian = document.querySelector(`#${id}`);
            accordian.classList.toggle('h-0')
            if (!accordian.classList.contains('h-0')) {
                accordian.classList.add('border-t');
                accordian.classList.add('mt-1')
            } else {
                accordian.classList.remove('border-t')
                accordian.classList.remove('mt-1')
            }
            switch (id) {
                case 'overview':
                    overviewStatus ? setOverviewStatus(false) : setOverviewStatus(true);
                    break;
                case 'description':
                    descriptionStatus ? setDescriptionStatus(false) : setDescriptionStatus(true);
                    break;
                case 'highlight':
                    highlightStatus ? setHighlightStatus(false) : setHighlightStatus(true);
                    break;
                case 'booking-policy':
                    bookingPolicyStatus ? setBookingPolicyStatus(false) : setBookingPolicyStatus(true);
                    break;
                case 'important-information':
                    importantInformationStatus ? setImportantInformationStatus(false) : setImportantInformationStatus(true);
                    break;
                default:
                    break;
            }
        }
    }

    useEffect(() => {
        if (typeof window !== 'undefined' && !applyClicked) {
            document.querySelector("#overview").innerHTML = data.overview
            document.querySelector("#description").innerHTML = data.description
            document.querySelector("#booking-policy").innerHTML = data.bookingPolicy
            document.querySelector("#important-information").innerHTML = data.importantInformation
            var today = new Date();
            today.setDate(today.getDate() + 1);
            var dd = today.getDate();
            var mm = today.getMonth() + 1;
            var yyyy = today.getFullYear();
            if (dd < 10) {
                dd = '0' + dd
            }
            if (mm < 10) {
                mm = '0' + mm
            }
            today = yyyy + '-' + mm + '-' + dd;
            // document.getElementById("date").setAttribute("min", today);
        }
    }, [])
    const handleOnChange = () => {

    }
    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.scrollTo(0, 0)
        }
    }, [applyClicked])

    return (
        <>
            <Navbar />
            <ToastContainer />
            <div className="w-full flex flex-col bg-gray-50 m-auto lg:rounded-l rounded">
                {
                    !applyClicked &&
                    <div className='w-full p-4'>
                        <div className="w-full flex items-center justify-between mb-4">
                            <h2 className="lg:text-3xl text-2xl font-bold ml-2">{data.title ? data.title : "Title goes here"}</h2>
                            <h3 className="md:text-2xl text-lg font-bold text-blue-400 text-right ml-2">AED {data.type=='UAE Visa'?data.price30Days:data.price}</h3>
                        </div>
                        <div className="w-full flex flex-col lg:flex-row justify-between">
                            <div className='w-full  pl-2'>
                                <p>{data.description ? data.description : "Lorem ipsum Lorem ipsum  ipsum Lorem ipsum  ipsum Lorem ipsum  ipsum Lorem ipsum  ipsum Lorem ipsum  ipsum Lorem ipsum  ipsum Lorem ipsum "}</p>
                                <div className="w-full my-2">
                                    <span className='font-semibold '>Highlights:-</span>
                                    <ul className='flex text-sm w-full flex-wrap justify-start list-inside list-style-image my-1'>
                                        {
                                            data.highlights.split(', ').map((highlight, index) => {
                                                return [<li key={index} className='flex items-start m-1 w-[48%]'><AiOutlineCheckCircle className='mr-1 mt-1' />{highlight}</li>]
                                            })
                                        }
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className='w-full border rounded bg-white border-gray-200 my-2 p-2'>
                            <button onClick={() => { toggleAccordian('overview') }} className="w-full relative  rounded-t flex items-center justify-between font-semibold">
                                Overview {overviewStatus ? <GrFormDown className='absolute right-0 mr-1' /> : <MdNavigateNext className='absolute opacity-30 right-0 mr-1' />}
                            </button>
                            <div id='overview' className="  border-gray-200 border-t overflow-hidden relative transition-all duration-100">
                            </div>
                        </div>
                        <div className='w-full border rounded bg-white border-gray-200 my-2 p-2'>
                            <button onClick={() => { toggleAccordian('description') }} className="w-full relative  rounded-t flex items-center justify-between font-semibold">
                                Description {descriptionStatus ? <GrFormDown className='absolute right-0 mr-1' /> : <MdNavigateNext className='absolute opacity-30 right-0 mr-1' />}
                            </button>
                            <div id='description' className=" border-gray-200 h-0 overflow-hidden relative transition-all duration-100">
                            </div>
                        </div>
                        <div className='w-full border rounded bg-white border-gray-200 my-2 p-2'>
                            <button onClick={() => { toggleAccordian('highlight') }} className="w-full relative  rounded-t flex items-center justify-between font-semibold">
                                Highlights {highlightStatus ? <GrFormDown className='absolute right-0 mr-1' /> : <MdNavigateNext className='absolute opacity-30 right-0 mr-1' />}
                            </button>
                            <div id='highlight' className=" border-gray-200 h-0 overflow-hidden relative transition-all duration-100">
                                <ol className='list-decimal'>
                                    {
                                        data.highlights.split(', ').map((highlight, index) => {
                                            return [<li key={index} className='flex items-start m-1 w-[48%]'><span className='mr-1'>{index + 1}</span> {highlight}</li>]
                                        })
                                    }
                                </ol>
                            </div>
                        </div>
                        <div className='w-full border rounded bg-white border-gray-200 my-2 p-2'>
                            <button onClick={() => { toggleAccordian('booking-policy') }} className="w-full relative  rounded-t flex items-center justify-between font-semibold">
                                Booking Policy {bookingPolicyStatus ? <GrFormDown className='absolute right-0 mr-1' /> : <MdNavigateNext className='absolute opacity-30 right-0 mr-1' />}
                            </button>
                            <div id='booking-policy' className=" border-gray-200 h-0 overflow-hidden relative transition-all duration-100">
                            </div>
                        </div>
                        <div className='w-full border rounded bg-white border-gray-200 my-2 p-2'>
                            <button onClick={() => { toggleAccordian('important-information') }} className="w-full relative  rounded-t flex items-center justify-between font-semibold">
                                Important Information {importantInformationStatus ? <GrFormDown className='absolute right-0 mr-1' /> : <MdNavigateNext className='absolute opacity-30 right-0 mr-1' />}
                            </button>
                            <div id='important-information' className=" border-gray-200 h-0 overflow-hidden relative transition-all duration-100">
                            </div>
                        </div>
                        <div className="w-full border-t border-b bg-white border-gray-200 p-2 my-2 mt-4 flex justify-between text-sm md:text-base">
                            <span>Tours and Travels ID : #{data._id ? data._id : "id_goes_here"}</span>
                            <span>Posted : {new Date(data.createdAt).getDate() + '/' + new Date(data.createdAt).getMonth() + 1 + "/" + new Date(data.createdAt).getFullYear()}</span>
                        </div>
                        <div className="w-full  py-2 my-2 flex justify-between ">
                            <span></span>
                            <button onClick={() => { setApplyClicked(true) }} className="bg-blue-400 rounded px-2 py-1 text-white hover:bg-blue-500">Apply for Visa</button>
                        </div>
                    </div>
                }
                {
                    applyClicked &&
                    <div className="w-full flex justify-center py-4">
                        <ApplyVisa data={data} setApplyClicked={setApplyClicked} />
                    </div>
                }
            </div>
        </>
    )
}

export default VisaPage