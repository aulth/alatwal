import React, { useEffect, useState } from 'react'
import { FaUserEdit, FaUsers, FaFileExport, FaQuestionCircle, FaListAlt } from 'react-icons/fa'
import { MdDashboard, MdAddLocationAlt, MdOutlinePlaylistAdd, MdList, MdBook, MdAddCircle, MdShoppingCart, MdContacts, MdInfo } from 'react-icons/md'
import { SlLocationPin } from 'react-icons/sl'
import { HiMapPin, HiChevronDown } from 'react-icons/hi2'
import { HiViewGridAdd, HiViewGrid, HiUsers } from 'react-icons/hi'
import { AiFillPlusSquare, AiFillCaretDown } from 'react-icons/ai'
import { GiJourney, GiTakeMyMoney } from 'react-icons/gi'
import { TfiReload } from 'react-icons/tfi'
import { BiTrip } from 'react-icons/bi'
import '@animxyz/core'
import Chart from "chart.js";
import Head from 'next/head'
const Dashboard = () => {
    const [location, setLocation] = useState()
    const [booking, setBooking] = useState()
    const [users, setUsers] = useState()
    const [revenue, setRevenue] = useState(0)
    const [bookingThisMonth, setBookingThisMonth] = useState()
    const [bookingPreviousMonth, setBookingPreviousMonth] = useState()
    let amount =0;
    const fetchLocation = async () => {
        const response = await fetch("/api/location/fetch", {
            method: 'GET'
        });
        const responseData = await response.json();
        if (responseData.success) {
            setLocation(responseData.location)
        }
    }
    const fetchBooking = async ()=>{
        const response = await fetch("/api/booking/fetch", {
            method:'GET'
        });
        const responseData = await response.json();
        if(responseData.success){
            setBooking(responseData.booking);
        }
        for(let booking of responseData.booking){
            amount += booking.price + (booking.explorer?booking.transport:0) + (booking.isFastTrackAddOn?booking.fastTrackAddOn:0);
        }
        setRevenue(amount)
        let thisMonthBooking = responseData.booking.filter((booking)=>{
            let [year, month] = booking.createdAt.split('-');
            let currentMonth = new Date().getMonth()+1;
            let currentYear = new Date().getFullYear();
            if(year==currentYear){
                console.log(year)
            }
            if(year==currentYear && month==currentMonth){
                return true
            }
        })
        let previousMonthBooking = responseData.booking.filter((booking)=>{
            let [year, month] = booking.createdAt.split('-');
            let currentMonth = new Date().getMonth()+1;
            let currentYear = new Date().getFullYear();
            if(year==currentYear){
                console.log(year)
            }
            if(year==currentYear && month==currentMonth-1){
                return true
            }
        })
        setBookingThisMonth(thisMonthBooking)
        setBookingPreviousMonth(previousMonthBooking)
    }
    const fetchUser = async ()=>{
        const response = await fetch("/api/user/fetch", {
            method:'POST',
            headers:{
                "content-type":'application/json'
            },
            body:JSON.stringify({authtoken:localStorage.getItem('alatwal-admin')})
        });
        const responseData = await response.json();
        console.log(responseData)
        if(responseData.success){
            setUsers(responseData.user);
        }
    }
    const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    useEffect(() => {
        if (typeof window !== 'undefined') {
            var config = {
                type: "line",
                data: {
                    labels: [
                        "01",
                        "02",
                        "03",
                        "04",
                        "05",
                        "06",
                        "07",
                        "08",
                        "09",
                        "10",
                        "11",
                        "12",
                        "13",
                        "14",
                        "15",
                        "16",
                        "17",
                        "18",
                        "19",
                        "20",
                        "21",
                        "22",
                        "23",
                        "24",
                        "25",
                        "26",
                        "27",
                        "28",
                        "28",
                        "29",
                        "30"
                    ],
                    datasets: [
                        {
                            label: month[new Date().getMonth()],
                            backgroundColor: "#4B66BF",
                            borderColor: "#4B66BF",
                            data: [0, 2, 4, 6, 8, 10, 12, 32, 12, 22, 3, 24, 22, 26, 22, 21, 12, 13, 14, 15, 17, 18, 15, 10, 1, 3, 23, 25, 11, 13, 8],
                            fill: false,
                        },
                        {
                            label: month[(new Date().getFullYear() - 1) == 0 ? new Date().getFullYear() - 1 : "11"],
                            fill: false,
                            backgroundColor: "#94A3B8",
                            borderColor: "#94A3B8",
                            data: [10, 14, 5, 6, 8, 10, 12, 13, 19, 14, 30, 15, 10, 13, 18, 20, 8, 5, 2, 20, 29, 23, 10, 5, 10, 30, 18, 20, 10, 5, 14],
                        },
                    ],
                },
                options: {
                    maintainAspectRatio: false,
                    responsive: true,
                    title: {
                        display: false,
                        text: "Booking Charts",
                        fontColor: "white",
                    },
                    legend: {
                        labels: {
                            fontColor: "black",
                        },
                        align: "end",
                        position: "bottom",
                    },
                    tooltips: {
                        mode: "index",
                        intersect: false,
                    },
                    hover: {
                        mode: "nearest",
                        intersect: true,
                    },
                    scales: {
                        xAxes: [
                            {
                                ticks: {
                                    fontColor: "black",
                                },
                                display: true,
                                scaleLabel: {
                                    display: false,
                                    labelString: "Month",
                                    fontColor: "white",
                                },
                                gridLines: {
                                    display: false,
                                    borderDash: [2],
                                    borderDashOffset: [2],
                                    color: "rgba(33, 37, 41, 0.3)",
                                    zeroLineColor: "rgba(0, 0, 0, 0)",
                                    zeroLineBorderDash: [2],
                                    zeroLineBorderDashOffset: [2],
                                },
                            },
                        ],
                        yAxes: [
                            {
                                ticks: {
                                    fontColor: "black",
                                },
                                display: true,
                                scaleLabel: {
                                    display: false,
                                    labelString: "Value",
                                    fontColor: "white",
                                },
                                gridLines: {
                                    borderDash: [3],
                                    borderDashOffset: [3],
                                    drawBorder: false,
                                    color: "rgba(255, 255, 255, 0.15)",
                                    zeroLineColor: "rgba(33, 37, 41, 0)",
                                    zeroLineBorderDash: [2],
                                    zeroLineBorderDashOffset: [2],
                                },
                            },
                        ],
                    },
                },
            };
            var ctx = document.getElementById("line-chart").getContext("2d");
            window.myLine = new Chart(ctx, config);
        }
    }, [])
    useEffect(() => {
      fetchLocation()
      fetchBooking()
      fetchUser()
    }, [])
    return (
        <>
            <div className="w-full p-4 overflow-y-auto">
                <div className="w-full flex justify-between">
                    <h6 className=" font-semibold">Dashboard</h6>
                    <button className="flex items-center text-[#1F41AF]"> <TfiReload className='mx-2' /> Reload Data</button>
                </div>
                {
                    users && location && booking  && users.length>0 &&
                    <div className="w-full flex flex-wrap items-center justify-between my-2 box-border">
                    {/* Card  */}
                    <div className='lg:w-[23%] md:w--[48%] w-full m-1  flex justify-center items-center relative hover:drop-shadow-xl h-48 hover:scale-105 cursor-pointer duration-150'>
                        <div className=" absolute top-0 w-[92%] h-44 border border-gray-300 rounded-lg z-0 bg-gray-50  drop-shadow-xl"></div>
                        <div className=" absolute top-0 w-full h-40 border border-gray-300 rounded-lg z-10 bg-white drop-shadow-xl p-4 flex flex-col justify-between">
                            <div className="w-full flex justify-between items-center">
                                <SlLocationPin className='text-3xl text-blue-500' />
                                <button className="px-[6px] py-[3px] rounded-lg bg-[rgb(132,204,22)] text-white flex items-center font-semibold text-[12px]">
                                    33% <HiChevronDown className=' text-white ml-1 rotate-180' />
                                </button>
                            </div>
                            <div className="w-full">
                                <span className='text-4xl font-bold font-[helvetica] block'>{location.length}</span>
                                <span className='block font-semibold text-gray-500'>Available Destinations</span>
                            </div>
                        </div>
                    </div>
                    {/* Card  */}
                    <div className='lg:w-[23%] md:w--[48%] w-full m-1  flex justify-center items-center relative hover:drop-shadow-xl h-48 hover:scale-105 cursor-pointer duration-150'>
                        <div className=" absolute top-0 w-[92%] h-44 border border-gray-300 rounded-lg z-0 bg-gray-50  drop-shadow-xl"></div>
                        <div className=" absolute top-0 w-full h-40 border border-gray-300 rounded-lg z-10 bg-white drop-shadow-xl p-4 flex flex-col justify-between">
                            <div className="w-full flex justify-between items-center">
                                <BiTrip className='text-3xl text-red-500' />
                                <button className="px-[6px] py-[3px] rounded-lg bg-[rgb(132,204,22)] text-white flex items-center font-semibold text-[12px]">
                                    33% <HiChevronDown className=' text-white ml-1 rotate-180' />
                                </button>
                            </div>
                            <div className="w-full">
                                <span className='text-4xl font-bold font-[helvetica] block'>{booking.length}</span>
                                <span className='block font-semibold text-gray-500'>Trips Completed</span>
                            </div>
                        </div>
                    </div>
                    {/* Card  */}
                    <div className='lg:w-[23%] md:w--[48%] w-full m-1  flex justify-center items-center relative hover:drop-shadow-xl h-48 hover:scale-105 cursor-pointer duration-150'>
                        <div className=" absolute top-0 w-[92%] h-44 border border-gray-300 rounded-lg z-0 bg-gray-50  drop-shadow-xl"></div>
                        <div className=" absolute top-0 w-full h-40 border border-gray-300 rounded-lg z-10 bg-white drop-shadow-xl p-4 flex flex-col justify-between">
                            <div className="w-full flex justify-between items-center">
                                <GiTakeMyMoney className='text-3xl text-yellow-500' />
                                <button className="px-[6px] py-[3px] rounded-lg bg-[rgb(132,204,22)] text-white flex items-center font-semibold text-[12px]">
                                    33% <HiChevronDown className=' text-white ml-1 rotate-180' />
                                </button>
                            </div>
                            <div className="w-full">
                                <span className='text-4xl font-bold font-[helvetica] block'>{revenue} AED</span>
                                <span className='block font-semibold text-gray-500'>Revenue</span>
                            </div>
                        </div>
                    </div>
                    {/* Card  */}
                    <div className='lg:w-[23%] md:w--[48%] w-full m-1  flex justify-center items-center relative hover:drop-shadow-xl h-48 hover:scale-105 cursor-pointer duration-150'>
                        <div className=" absolute top-0 w-[92%] h-44 border border-gray-300 rounded-lg z-0 bg-gray-50  drop-shadow-xl"></div>
                        <div className=" absolute top-0 w-full h-40 border border-gray-300 rounded-lg z-10 bg-white drop-shadow-xl p-4 flex flex-col justify-between">
                            <div className="w-full flex justify-between items-center">
                                <HiUsers className='text-3xl text-green-500' />
                                <button className="px-[6px] py-[3px] rounded-lg bg-[rgb(132,204,22)] text-white flex items-center font-semibold text-[12px]">
                                    33% <HiChevronDown className=' text-white ml-1 rotate-180' />
                                </button>
                            </div>
                            <div className="w-full">
                                <span className='text-4xl font-bold font-[helvetica] block'>{users.length}</span>
                                <span className='block font-semibold text-gray-500'>Registered Users</span>
                            </div>
                        </div>
                    </div>
                </div>
                }
                    <div className="w-full rounded border border-gray-300">
                    <h6 className="text-xl font-semibold py-2 px-2 border-b border-gray-300">Bookings Overview</h6>
                    <div className="w-full flex flex-col-reverse md:flex-row md:jusitfy-around p-4">
                        <div className='md:w-1/2 w-full h-full flex-col justify-around'>
                            <div>
                                <h5 className="text-4xl font-semibold">{bookingThisMonth && bookingThisMonth.length}</h5>
                                <span className='my-2'>Bookings This Month</span>
                            </div>
                            <div className='mt-10'>
                                <ul className='w-full'>
                                    <li className='flex items-center my-4 '><AiFillCaretDown className='w-7  h-7 p-2 text-gray-500 bg-green-300 rounded aspect-square mr-2' /><span className='text-green-300 mr-1 flex items-center'>56 % More Bookings </span> In Comparision To Last Month</li>
                                    <li className='flex items-center my-4 '><AiFillCaretDown className='w-7  h-7 p-2 text-gray-500 bg-red-300 rounded aspect-square mr-2' /><span className='text-red-300 mr-1 flex items-center'>90 % Revenue Per Bookings </span> In Comparision To Last Month</li>
                                </ul>
                                <button className="w-full text-center px-2 py-1 rounded bg-blue-500 text-white">View Details</button>
                            </div>
                        </div>
                        <div className='md:w-1/2 w-full p-4 flex md:flex-col md:justify-around h-full'>
                            <canvas id="line-chart"></canvas>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard