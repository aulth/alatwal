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
const DesertSafari = ({ data }) => {
    const router = useRouter();
    const { slag } = router.query;
    const [settingData, setSettingData] = useState()
    const [overviewStatus, setOverviewStatus] = useState(false)
    const [descriptionStatus, setDescriptionStatus] = useState(false)
    const [highlightStatus, setHighlightStatus] = useState(false)
    const [bookingPolicyStatus, setBookingPolicyStatus] = useState(false)
    const [importantInformationStatus, setImportantInformationStatus] = useState(false)
    const [covidPrecautionStatus, setCovidPrecautionStatus] = useState(false)
    const [tourData, setTourData] = useState({ id: data._id, title: data.title, adultRate: data.adultRate, adult:0, child:0, infant:0, childRate: data.childRate, infantRate: data.infantRate, adultRatePrime: data.adultRatePrime, childRatePrime: data.childRatePrime, infantRatePrime: data.infantRatePrime, adultRateNonPrime: data.adultRateNonPrime, childRateNonPrime: data.childRateNonPrime, infantRateNonPrime: data.infantRateNonPrime, adultRateTicketOnly: data.adultRateTicketOnly, adultRateSharingTransport: data.adultRateSharingTransport, adultRatePrivateTransport: data.adultRatePrivateTransport, childRateTicketOnly: data.childRateTicketOnly, childRateSharingTransport: data.childRateSharingTransport, childRatePrivateTransport: data.childRatePrivateTransport, infantRateTicketOnly: data.infantRateTicketOnly, infantRateSharingTransport: data.infantRateSharingTransport, infantRatePrivateTransport: data.infantRatePrivateTransport, date: null, time: null, price: null, tax: null, totalPrice: null, lastDateToCancel: null, basic: data.basic, platinum: data.platinum, explorer: data.explorer, pickup:data.pickup, transport:data.transport, fastTrackAddOn:data.fastTrackAddOn, isFastTrackAddOn:false, typeOfTicket:'onlyTicket', ticket:'' })
    const [isPrime, setIsPrime] = useState(false)
    const [typeOfTicket, setTypeOfTicket] = useState('');
    let time = ['7:00 AM']
    // let price = { adult: data.adultRate, child: data.childRate, infant: data.infantRate };
    const [price, setPrice] = useState({ adult: 0, child: 0, infant: 0 })
    const [vat, setVat] = useState()
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
                case 'covid-precaution':
                    covidPrecautionStatus ? setCovidPrecautionStatus(false) : setCovidPrecautionStatus(true);
                default:
                    break;
            }
        }
    }
    const handleOnChange = e => {
        e.preventDefault();
        console.log(e.target.value)
        setTourData({ ...tourData, [e.target.name]: e.target.value });
        if (e.target.name == 'date') {
            let date = new Date(e.target.value); // get the date from the input element
            date.setMonth(date.getMonth() - 2);
            setTourData({ ...tourData, lastDateToCancel: date.toISOString().substring(0, 10), date: e.target.value })
        }
        if (e.target.name == 'time') {
            togglePrime(e.target.value);
            console.log(isPrime)
        }
        if (e.target.name == 'type') {
            toggleTypeOfTicket(e.target.value);
            console.log(typeOfTicket)
        }
        console.log(tourData);
    }
    const selectTime = btnId => {
        time.forEach((time, index) => {
            let button = document.querySelector(`#time-${index}`);
            button.classList.remove('bg-gray-300')
        })
        let button = document.querySelector(`#${btnId}`);
        button.classList.toggle("bg-gray-300");
    }
    // const setTime = time => {
    //     setTourData({ ...tourData, time: time });
    //     console.log(tourData)
    // }
    const showPriceBreakdown = () => {
        if (typeof window !== 'undefined') {
            if (tourData.adult <= 0 && tourData.child <= 0 && tourData.infant <= 0) {
                toast.info("Please select the booking")
                return;
            }
            if (!tourData.date) {
                toast.info("Please choose the tour date");
                return;
            }
            document.querySelector('#price-breakdown').classList.remove('hidden');
            setTourData({ ...tourData, price: (price.adult * tourData.adult) + (price.child * tourData.child) + (price.infant * tourData.infant), vat:((price.adult * tourData.adult) + (price.child * tourData.child) + (price.infant * tourData.infant))*(vat/100), totalPrice:(price.adult * tourData.adult) + (price.child * tourData.child) + (price.infant * tourData.infant)+((price.adult * tourData.adult) + (price.child * tourData.child) + (price.infant * tourData.infant))*(vat/100) })
        }
    }
    const addToCart = () => {
        // if (!tourData.time) {
        //     toast.info("Please choose the time");
        //     return;
        // }
        if (typeof window !== 'undefined') {
            let cart = localStorage.getItem('tour-cart') ? JSON.parse(localStorage.getItem('tour-cart')) : [];
            localStorage.setItem('tour-cart', JSON.stringify(cart.concat(tourData)));
            console.log(localStorage.getItem('tour-cart'));
            toast.success("Tour added")
            setTimeout(() => {
                router.push("/checkout")
            }, 500);
        }
    }
    useEffect(() => {
        if (typeof window !== 'undefined') {
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
            document.getElementById("date").setAttribute("min", today);
        }
    }, [])
    const togglePrime = (time) => {
        switch (time) {
            case '7:00 AM':
                setIsPrime(false)
                break;
            case '7:30 AM':
                setIsPrime(false)
                break;
            case '8:00 AM':
                setIsPrime(false)
                break;
            case '8:30 AM':
                setIsPrime(false)
                break;
            case '9:00 AM':
                setIsPrime(false)
                break;
            case '9:30 AM':
                setIsPrime(false)
                break;
            case '10:00 AM':
                setIsPrime(false)
                break;
            case '10:30 AM':
                setIsPrime(false)
                break;
            case '11:00 AM':
                setIsPrime(false)
                break;
            case '11:30 AM':
                setIsPrime(false)
                break;
            case '12:00 PM':
                setIsPrime(false)
                break;
            case '12:30 PM':
                setIsPrime(false)
                break;
            case '1:00 PM':
                setIsPrime(false)
                break;
            case '1:30 PM':
                setIsPrime(false)
                break;
            case '2:00 PM':
                setIsPrime(false)
                break;
            case '2:30 PM':
                setIsPrime(true)
                break;
            case '3:00 PM':
                setIsPrime(true)
                break;
            case '3:30 PM':
                setIsPrime(true)
                break;
            case '4:00 PM':
                setIsPrime(true)
                break;
            case '4:30 PM':
                setIsPrime(true)
                break;
            case '5:00 PM':
                setIsPrime(true)
                break;
            case '5:30 PM':
                setIsPrime(true)
                break;
            case '6:00 PM':
                setIsPrime(true)
                break;
            case '6:30 PM':
                setIsPrime(true)
                break;
            case '7:00 PM':
                setIsPrime(false)
                break;
            case '7:30 PM':
                setIsPrime(false)
                break;
            case '8:00 PM':
                setIsPrime(false)
                break;
            case '8:30 PM':
                setIsPrime(false)
                break;
            case '9:00 PM':
                setIsPrime(false)
                break;
            default:
                break;
        }
    }
    const toggleTypeOfTicket = (type) => {
        switch (type) {
            case 'onlyTicket':
                setTypeOfTicket('onlyTicket');
                setTourData({...tourData, typeOfTicket:'onlyTicket'})
                break;
            case 'sharingTransfer':
                setTypeOfTicket('sharingTransfer');
                setTourData({...tourData, typeOfTicket:'sharingTransfer'})
                break;
            case 'privateTransfer':
                setTypeOfTicket('privateTransfer');
                setTourData({...tourData, typeOfTicket:'privateTransfer'})
                break;
            default:
                break;
        }
    }
    const toggleFastTrackAddOn = ()=>{
        if(typeof window!=='undefined'){
            if(tourData.isFastTrackAddOn){
                setTourData({...tourData, isFastTrackAddOn:false})
                document.querySelector("#fastTrackBtn").classList.remove('bg-blue-400');
                document.querySelector("#fastTrackBtn").classList.remove('text-white');
            }else{
                setTourData({...tourData, isFastTrackAddOn:true})
                document.querySelector("#fastTrackBtn").classList.add('bg-blue-400');
                document.querySelector("#fastTrackBtn").classList.add('text-white');
            }
            console.log(tourData)
        }
        
    }
    const fetchSetting = async ()=>{
        let response = await fetch('/api/setting/fetch');
        let responseData = await response.json();
        if(responseData.success){
            setSettingData(responseData.setting[0])
            setVat(responseData.setting[0].companyVAT)
        }
    }
    useEffect(() => {
        if (isPrime) {
            setPrice({ adult: tourData.adultRatePrime, child: tourData.childRatePrime, infant: tourData.infantRatePrime })
        } else {
            setPrice({ adult: tourData.adultRateNonPrime, child: tourData.childRateNonPrime, infant: tourData.infantRateNonPrime })
        }
    }, [isPrime])
    useEffect(() => {
        if (typeOfTicket == 'onlyTicket') {
            setPrice({ adult: tourData.adultRateTicketOnly, child: tourData.childRateTicketOnly, infant: tourData.infantRateTicketOnly })
        } else if (typeOfTicket == 'sharingTransfer') {
            setPrice({ adult: tourData.adultRateSharingTransport, child: tourData.childRateSharingTransport, infant: tourData.infantRateSharingTransport })
        } else {
            setPrice({ adult: tourData.adultRatePrivateTransport, child: tourData.childRatePrivateTransport, infant: tourData.infantRatePrivateTransport })
        }
    }, [typeOfTicket])
    useEffect(() => {
        if (data.basic) {
            setPrice({ adult: data.adultRate, child: data.childRate, infant: data.infantRate })
        } else if (data.platinum) {
            setPrice({ adult: tourData.adultRateNonPrime, child: tourData.childRateNonPrime, infant: tourData.infantRateNonPrime })
        } else {
            setPrice({ adult: tourData.adultRateTicketOnly, child: tourData.childRateTicketOnly, infant: tourData.infantRateTicketOnly })
        }
    }, [])
    useEffect(() => {
      fetchSetting();
    }, [])

    return (
        <>
            <Navbar />
            <ToastContainer />
            <div className="w-full flex lg:flex-row  flex-col bg-gray-50 m-auto lg:rounded-l rounded">
                <div className='lg:w-[70%] w-full p-4'>
                    <div className="w-full flex items-center justify-start mb-4">
                        <h2 className="lg:text-3xl text-2xl font-bold">{data.title ? data.title : "Title goes here"}</h2>
                    </div>
                    <div className="w-full flex flex-col lg:flex-row justify-between">
                        <div className="overflow-hidden w-full lg:w-1/2">
                            <Carousel images={data.image} />
                        </div>
                        <div className='w-full lg:w-1/2 pl-2'>
                            <button className='text-sm flex items-center mt-2 xl:mt-0'><CiLocationOn className='bg-gray-100 rounded-full p-1 text-xl mr-2' /> {data.location ? data.location : 'Location'}</button>
                            <h3 className="text-xl font-bold  my-2">AED {price.adult}<span className='text-sm '>/person</span></h3>
                            <p>{data.description ? data.description.slice(0, 250) + '..' : "Lorem ipsum Lorem ipsum  ipsum Lorem ipsum  ipsum Lorem ipsum  ipsum Lorem ipsum  ipsum Lorem ipsum  ipsum Lorem ipsum  ipsum Lorem ipsum "}</p>
                            <div className="w-full my-2">
                                <span className='font-semibold '>Highlights:-</span>
                                <ul className='flex text-sm w-full flex-wrap justify-start list-inside list-style-image my-1'>
                                    {
                                        data.highlights.split(', ').map((highlight, index) => {
                                            return [<li key={index} className='flex items-start m-1 w-[48%]'><AiOutlineCheckCircle className='mr-1 mt-1' />{highlight.slice(0, 40) + '..'}</li>]
                                        })
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                    {/* Accordian starts here  */}
                    <div className='w-full border rounded bg-white border-gray-200 my-2 p-2'>
                        <button onClick={() => { toggleAccordian('overview') }} className="w-full relative  rounded-t flex items-center justify-between font-semibold">
                            Overview {overviewStatus ? <GrFormDown className='absolute right-0 mr-1' /> : <MdNavigateNext className='absolute opacity-30 right-0 mr-1' />}
                        </button>
                        <div id='overview' className="  border-gray-200 h-0 overflow-hidden relative transition-all duration-100">
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
                                    return [<li key={index} className='flex items-start m-1 w-[48%]'><span className='mr-1'>{index+1}</span> {highlight}</li>]
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
                    </div>
                    {/* Rating and Review section  */}
                    {/* <div className='w-full border rounded bg-white border-gray-200 my-2 p-2'>
                        <button className="w-full relative  rounded-t flex items-center justify-between font-semibold">
                            Rating and Reviews
                        </button>
                        <div className=" border-gray-200 border-t mt-1 overflow-hidden relative transition-all duration-100">
                            {
                                data.reviews.map((review, index) => {
                                    return [<div key={index} className="w-full flex mb-4 items-start mt-2">
                                        <div className="w-24 h-24 overflow-hidden relative rounded-full mt-1">
                                            <img src={review.profile?review.profile:"https://i.pravatar.cc/100?img=2"} className='w-full rounded-full' alt="" />
                                        </div>
                                        <div className="flex-grow pl-3">
                                            <h6 className="font-bold text-sm uppercase text-gray-600 flex items-center cursor-default">{review.name?review.name:"name_here"}<MdVerified className='text-green-500 mx-1' /></h6>
                                            <span className='flex items-center text-[12px] cursor-default'><CiCalendarDate className=' text-sm mr-1' /> <span>{review.date?review.date:"date_here"}</span> <CiLocationOn className='mx-1 ml-2 text-sm' /> {review.location?review.location:"location_here"}</span>
                                            <p>{review.review?review.review:"Lorem ipsum lorem ipsum  lorem ipsum  lorem ipsum  lorem ipsum  lorem ipsum  lorem ipsum "}</p>
                                        </div>
                                    </div>]
                                })
                            }
                        </div>
                    </div> */}
                </div>
                <div className="bg-white lg:rounded-tl-[40px] lg:w-[30%] w-full p-6">
                    <h2 className="text-lg font-semibold">Select your booking</h2>
                    <div className="w-full  border border-gray-100 rounded-lg p-1 my-2 ">
                        <select name="adult" id="" onChange={handleOnChange} className='w-full p-1 focus:outline-none cursor-pointer'>
                            <option value="0">Adult x 0</option>
                            <option value="1">Adult x 1</option>
                            <option value="2">Adult x 2</option>
                            <option value="3">Adult x 3</option>
                            <option value="4">Adult x 4</option>
                            <option value="5">Adult x 5</option>
                            <option value="6">Adult x 6</option>
                            <option value="7">Adult x 7</option>
                            <option value="8">Adult x 8</option>
                            <option value="9">Adult x 9</option>
                            <option value="10">Adult x 10</option>
                        </select>
                    </div>
                    <div className="w-full  border border-gray-100 rounded-lg p-1 my-2 relative">
                    <div className=" bg-white absolute -mt-3 px-1 text-[0.75rem] text-gray-400">{data.basic?'0 - 3':data.platinum?'4 - 12':data.explorer?'3 - 10':''} Yrs</div>
                        <select name="child" onChange={handleOnChange} id="" className='w-full p-1 focus:outline-none cursor-pointer'>
                            <option value="0">Child x 0</option>
                            <option value="1">Child x 1</option>
                            <option value="2">Child x 2</option>
                            <option value="3">Child x 3</option>
                            <option value="4">Child x 4</option>
                            <option value="5">Child x 5</option>
                            <option value="6">Child x 6</option>
                            <option value="7">Child x 7</option>
                            <option value="8">Child x 8</option>
                            <option value="9">Child x 9</option>
                            <option value="10">Child x 10</option>
                        </select>
                    </div>
                    <div className="w-full  border border-gray-100 rounded-lg p-1 my-2 relative">
                    <div className=" bg-white absolute -mt-3 px-1 text-[0.75rem] text-gray-400">{data.basic?'0 - 0':data.platinum?'0 - 4':data.explorer?'0 - 3':''} Yrs</div>
                        <select name="infant" onChange={handleOnChange} id="" className='w-full p-1 focus:outline-none cursor-pointer'>
                            <option value="0">Infant x 0</option>
                            <option value="1">Infant x 1</option>
                            <option value="2">Infant x 2</option>
                            <option value="3">Infant x 3</option>
                            <option value="4">Infant x 4</option>
                            <option value="5">Infant x 5</option>
                            <option value="6">Infant x 6</option>
                            <option value="7">Infant x 7</option>
                            <option value="8">Infant x 8</option>
                            <option value="9">Infant x 9</option>
                            <option value="10">Infant x 10</option>
                        </select>
                    </div>
                    {
                        data.platinum &&
                        <div className="w-full  border border-gray-100 rounded-lg p-1 my-2">
                            <select name="time" onChange={handleOnChange} id="" className='w-full p-1 focus:outline-none cursor-pointer'>
                                <option value="">Select Time</option>
                                <option value="7:00 AM">7:00 AM</option>
                                <option value="7:30 AM">7:30 AM</option>
                                <option value="8:00 AM">8:00 AM</option>
                                <option value="8:30 AM">8:30 AM</option>
                                <option value="9:00 AM">9:00 AM</option>
                                <option value="9:30 AM">9:30 AM</option>
                                <option value="10:00 AM">10:00 AM</option>
                                <option value="10:30 AM">10:30 AM</option>
                                <option value="11:00 AM">11:00 AM</option>
                                <option value="11:30 AM">11:30 AM</option>
                                <option value="12:00 PM">12:00 PM</option>
                                <option value="12:30 PM">12:30 PM</option>
                                <option value="1:00 PM">1:00 PM</option>
                                <option value="1:30 PM">1:30 PM</option>
                                <option value="2:00 PM">2:00 PM</option>
                                <option value="2:30 PM">2:30 PM</option>
                                <option value="3:00 PM">3:00 PM</option>
                                <option value="3:30 PM">3:30 PM</option>
                                <option value="4:00 PM">4:00 PM</option>
                                <option value="4:30 PM">4:30 PM</option>
                                <option value="5:00 PM">5:00 PM</option>
                                <option value="5:30 PM">5:30 PM</option>
                                <option value="6:00 PM">6:00 PM</option>
                                <option value="6:30 PM">6:30 PM</option>
                                <option value="7:00 PM">7:00 PM</option>
                                <option value="7:30 PM">7:30 PM</option>
                                <option value="8:00 PM">8:00 PM</option>
                                <option value="8:30 PM">8:30 PM</option>
                                <option value="9:00 PM">9:00 PM</option>
                            </select>
                        </div>
                    }
                    {
                        data.explorer &&
                        <>
                        <div className="w-full  border border-gray-100 rounded-lg p-1 my-2">
                            <select value={tourData.typeOfTicket} name="type" onChange={handleOnChange} id="" className='w-full p-1 focus:outline-none cursor-pointer'>
                                <option value="">Select Type of Ticket</option>
                                <option value="onlyTicket">Only Entry Ticket</option>
                                <option value="sharingTransfer">Sharing Transfer</option>
                                <option value="privateTransfer">Private Transfer (Max 6 Pax)</option>
                            </select>
                        </div>
                            <button onClick={toggleFastTrackAddOn} id='fastTrackBtn' className='w-full flex items-center  border border-gray-100 rounded-lg p-2 my-2 '>Fast Track Add On</button>
                        </>
                    }
                    <div className="w-full  border border-gray-100 rounded-lg p-1 my-2">
                        <input type="date" name="date" pattern="\d{4}-\d{2}-\d{2}" placeholder="yyyy-mm-dd" onChange={handleOnChange} id="date" className='w-full p-1 focus:outline-none cursor-pointer' />
                    </div>
                    <button onClick={showPriceBreakdown} className="w-full  border border-gray-100 rounded-lg p-1 my-2 bg-blue-500 hover:bg-blue-600 text-white">
                        Book Now
                    </button>
                    <div id='price-breakdown' className="w-full hidden  border border-gray-100 rounded-lg p-2 my-2 mb-4">
                        <p className='font-semibold border-b border-gray-100'>Price Breakdown</p>
                        {
                            tourData.adult >= 1 && <div className="w-full flex justify-between border-b border-gray-100 py-2 text-sm">
                                <span>Adult x {tourData.adult} </span>
                                <span className='uppercase font-semibold'>Aed {price.adult * tourData.adult}</span>
                            </div>
                        }
                        {
                            tourData.child >= 1 && <div className="w-full flex justify-between border-b border-gray-100 py-2 text-sm">
                                <span>Child x {tourData.child} </span>
                                <span className='uppercase font-semibold'>Aed {price.child * tourData.child}</span>
                            </div>
                        }
                        {
                            tourData.infant >= 1 && <div className="w-full flex justify-between border-b border-gray-100 py-2 text-sm">
                                <span>Infant x {tourData.infant} </span>
                                <span className='uppercase font-semibold'>Aed {price.infant * tourData.infant}</span>
                            </div>
                        }
                        {
                            tourData.isFastTrackAddOn >= 1 && <div className="w-full flex justify-between border-b border-gray-100 py-2 text-sm">
                                <span>Fast Track Add On </span>
                                <span className='uppercase font-semibold'>Aed {tourData.fastTrackAddOn * (Number(tourData.child) + Number(tourData.adult) + Number(tourData.infant))}</span>
                            </div>
                        }
                        {
                            tourData.explorer && tourData.typeOfTicket=='privateTransfer'  && <div className="w-full flex justify-between border-b border-gray-100 py-2 text-sm">
                                <span>Transportation </span>
                                <span className='uppercase font-semibold'>Aed {tourData.transport}</span>
                            </div>
                        }
                        {/* <div className="w-full flex flex-col justify-between border-b border-gray-100 py-2 text-sm">
                            <p className="text-center">Select Starting Time</p>
                            <div className="w-full flex flex-wrap justify-center my-1">
                                {
                                    time.map((time, index) => {
                                        return <button id={'time-' + index} onClick={() => { selectTime('time-' + index); setTime(time) }} key={index} className='rounded px-2 py-1 border border-gray-100 mx-1 my-1'>{time}</button>
                                    })
                                }
                            </div>

                        </div> */}
                        <div className="w-full flex justify-between border-b border-gray-100 py-2 text-sm">
                            <span></span>
                            <button onClick={addToCart} className='uppercase font-semibold bg-blue-500 text-white border-gray-100 border rounded px-2 py-1 hover:bg-blue-600'>Add to cart</button>
                        </div>
                    </div>
                    <div className="w-full  border border-gray-100 rounded-lg p-1 my-2">
                        <h2 className="text-lg font-semibold border-b border-gray-100">Need help for any details?</h2>
                        <a href="+tel:+971-45752644" className='flex items-center'><IoCallOutline className='text-xl mt-1' />+971-45752644</a>
                        <a href="+tel:+971-583938039" className='flex items-center'><IoCallOutline className='text-xl mt-1' />+971-583938039</a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DesertSafari