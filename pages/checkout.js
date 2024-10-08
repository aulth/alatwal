import React, { useState, useEffect } from 'react'
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../components/Navbar'
import CartItem from '../components/CartItem'
import Spinner from '../components/Spinner'
import Head from 'next/head';
import { useRouter } from 'next/router';
const Checkout = () => {
    const router = useRouter();
    const [settingData, setSettingData] = useState()
    const [paymentMethod, setPaymentMethod] = useState('')
    const [cartData, setCartData] = useState();
    const [finalPayment, setFinalPayment] = useState({ totalAmount: 0, totalVat: 0, finalPayment: 0 })
    const [bookingInfo, setBookingInfo] = useState({ firstName: '', lastName: '', email: '', contact: '', country: '', specialRequest: '', pickupLocation: '', paymentMethod: '', item: cartData })
    const [locationData, setLocationData] = useState([])
    const [stripePayClicked, setStripePayClicked] = useState(false)
    const [deleteState, setDeleteState] = useState('')
    const [isExplorer, setIsExplorer] = useState(false)
    let totalAmount = 0, totalVat = 0
    let location = [];
    const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
    const stripePromise = loadStripe(publishableKey);
    const selectPaymentMethod = (method) => {
        if (typeof window !== 'undefined') {
            let stripe = document.querySelector(`#stripe`);
            let bank = document.querySelector(`#bank`);
            if (method == 'bank') {
                bank.classList.remove('bg-gray-50');
                bank.classList.add('bg-gray-200');
                stripe.classList.remove('bg-gray-200');
                stripe.classList.add('bg-gray-50');
            } else {
                bank.classList.remove('bg-gray-200');
                bank.classList.add('bg-gray-50');
                stripe.classList.remove('bg-gray-50');
                stripe.classList.add('bg-gray-200');
            }

        }
        setPaymentMethod(method);
        setBookingInfo({ ...bookingInfo, paymentMethod: method })
    }
    useEffect(() => {
        if (typeof window !== 'undefined') {
            if (localStorage.getItem('tour-cart')) {
                let cart = JSON.parse(localStorage.getItem('tour-cart'))
                for (let item of cart) {
                    totalAmount += item.price;
                    totalVat += item.vat;
                    if (item.isFastTrackAddOn) {
                        totalAmount += item.fastTrackAddOn*(Number(item.child) + Number(item.adult) + Number(item.infant))
                    }
                    if (item.explorer && item.typeOfTicket=='privateTransfer') {
                        totalAmount += item.transport
                    }
                }
                // setFinalPayment({ totalAmount: totalAmount, totalVat: totalVat, finalPayment: totalAmount + totalVat });
                setFinalPayment({ totalAmount: totalAmount, totalVat: totalVat, finalPayment: totalAmount });
                setCartData(JSON.parse(localStorage.getItem('tour-cart')));
                setBookingInfo({ ...bookingInfo, item: cart })
                for (let item of cart) {
                    if (item.explorer) {
                        setIsExplorer(true)
                        for (let locationName of item.pickup.split(', ')) {
                            location.push(locationName)
                        }
                        setLocationData(location);
                        return;
                    }
                }
            }
        }
        setStripePayClicked(false)
    }, [deleteState])
    const handleOnChange = (e) => {
        e.preventDefault();
        setBookingInfo({ ...bookingInfo, [e.target.name]: e.target.value });
    }
    const initiateBooking = async(e)=>{
        e.preventDefault();
        if(typeof window!=='undefined'){
            localStorage.removeItem('tour-cart');
        }
        if(paymentMethod=='stripe'){
            setStripePayClicked(true)
        }
        const response = await fetch('/api/booking/add', {
            method:'POST',
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify({firstName:bookingInfo.firstName,
                lastName:bookingInfo.lastName,
                email:bookingInfo.email,
                contact:bookingInfo.contact,
                specialRequest:bookingInfo.specialRequest,
                pickupLocation:bookingInfo.pickupLocation,
                paymentMethod:bookingInfo.paymentMethod,
                item:bookingInfo.item,
                bookingFor:'tour',
                price:finalPayment.finalPayment,
                paymentStatus:'pending',
                authtoken:localStorage.getItem('tour-user')})
        })
        const responseData = await response.json();
        if(responseData.success){
            if(paymentMethod=='stripe'){
                createCheckOutSession(responseData.bookingNumber);
            }else{
                router.push('/success?id='+responseData.bookingNumber)
            }
        }else{
            toast.error(responseData.msg)
            setStripePayClicked(false)
        }
    }
    const createCheckOutSession = async (bookingNumber) => {
        let name='';
        // setStripePayClicked(true)
        for(let item of cartData){
            name = name + name?', ':'' + item.title;
        }
        const stripe = await stripePromise;
        const checkoutSession = await axios.post('/api/stripe/create-stripe-session', {
            item: {
                image:'https://i.ibb.co/BLsq4JS/logo.png',
                name:'Tour Payment',
                price:finalPayment.finalPayment,
                description:name,
                quantity:cartData.length,
                bookingNumber:bookingNumber
            },
        });
        const result = await stripe.redirectToCheckout({
            sessionId: checkoutSession.data.id,
        });
        if (result.error) {
            alert(result.error.message);
        }
    };
    const fetchSetting = async ()=>{
        let response = await fetch('/api/setting/fetch');
        let responseData = await response.json();
        if(responseData.success){
            setSettingData(responseData.setting[0])
        }
    }
    useEffect(() => {
        fetchSetting()
    }, [])
    
    return (
        <>
        <Head>
                <title>Al Atwal - Checkout</title>
                <meta name="title" content="Al Atwal - Best Partner in Your Travel Dairy!"/>
                    <meta name="description" content="Up and running, Alatwal Travel & Tourism is one stop solution for all your travel needs. We are a destination management company based in UAE offering the best of UAE tours, UEA Visa services and International Visa services." />
                    {/* <!-- Open Graph / Facebook --> */}
                    <meta property="og:type" content="website" />
                    <meta property="og:url" content="https://tourism-zeta.vercel.app" />
                    <meta property="og:title" content="Al Atwal - Best Partner in Your Travel Dairy!" />
                    <meta property="og:description" content="Up and running, Alatwal Travel & Tourism is one stop solution for all your travel needs. We are a destination management company based in UAE offering the best of UAE tours, UEA Visa services and International Visa services." />
                    <meta property="og:image" content="https://tourism-zeta.vercel.app/logo.png" />

                    {/* <!-- Twitter --> */}
                    <meta property="twitter:card" content="summary_large_image" />
                    <meta property="twitter:url" content="https://tourism-zeta.vercel.app/" />
                    <meta property="twitter:title" content="Al Atwal - Best Partner in Your Travel Dairy!" />
                    <meta property="twitter:description" content="Up and running, Alatwal Travel & Tourism is one stop solution for all your travel needs. We are a destination management company based in UAE offering the best of UAE tours, UEA Visa services and International Visa services." />
                    <meta property="twitter:image" content="https://tourism-zeta.vercel.app/logo.png" />
            </Head>
            <Navbar />
            <ToastContainer />
            <div className="w-full flex lg:flex-row  flex-col bg-gray-50 m-auto lg:rounded-l rounded">
                <form onSubmit={initiateBooking} className='lg:w-[70%] w-full p-4'>
                    <div className="w-full flex flex-col lg:flex-row justify-between">
                    </div>
                    <div className='w-full border rounded bg-white border-gray-200 my-1 p-2'>
                        <h2 className="w-full relative  text-lg rounded-t flex items-center justify-between font-semibold">
                            Personal Information
                        </h2>
                        <div id='' className="  border-gray-200 mt-1 border-t overflow-hidden relative transition-all duration-100">
                            <div className="w-full flex md:flex-row flex-col justify-between my-1">
                                <div className="w-full md:w-1/2 mx-1">
                                    <label htmlFor="" className='text-sm font-semibold'>First Name</label>
                                    <input type="text" placeholder='Mohd' name='firstName' onChange={handleOnChange} className='focus:outline-none w-full rounded border border-gray-100 bg-gray-50 p-1 px-2 text-sm' required />
                                </div>
                                <div className="w-full md:w-1/2 mx-1">
                                    <label htmlFor="" className='text-sm font-semibold'>Last Name</label>
                                    <input type="text" placeholder='Usman' name='lastName' onChange={handleOnChange} className='focus:outline-none w-full rounded border border-gray-100 bg-gray-50 p-1 px-2 text-sm' required/>
                                </div>
                            </div>
                            <div className="w-full flex md:flex-row flex-col justify-between my-1">
                                <div className="w-full  mx-1">
                                    <label htmlFor="" className='text-sm font-semibold'>Email</label>
                                    <input type="email" placeholder='example@domain.com' name='email' onChange={handleOnChange} className='focus:outline-none w-full rounded border border-gray-100 bg-gray-50 p-1 px-2 text-sm' required/>
                                </div>
                            </div>
                            <div className="w-full flex md:flex-row flex-col justify-between my-1">
                                <div className="w-full  mx-1">
                                    <label htmlFor="" className='text-sm font-semibold'>Contact Number</label>
                                    <input type="tel" placeholder='9839098390' name='contact' onChange={handleOnChange} className='focus:outline-none w-full rounded border border-gray-100 bg-gray-50 p-1 px-2 text-sm' required/>
                                </div>
                            </div>
                            {/* <div className="w-full flex md:flex-row flex-col justify-between my-1">
                                <div className="w-full  mx-1">
                                    <label htmlFor="" className='text-sm font-semibold'>Country</label>
                                    <select name="country" id="" onChange={handleOnChange} className='focus:outline-none w-full rounded border border-gray-100 bg-gray-50 p-1 px-2 text-sm cursor-pointer' required>
                                        <option value="">Select Country</option>
                                        <option value="United Arab Emirates">United Arab Emirated</option>
                                    </select>
                                </div>
                            </div> */}
                            <div className="w-full flex md:flex-row flex-col justify-between my-1">
                                <div className="w-full  mx-1">
                                    <label htmlFor="" className='text-sm font-semibold'>Special Request</label>
                                    <textarea placeholder='Special Request' name='specialRequest' onChange={handleOnChange} className='focus:outline-none w-full rounded border border-gray-100 bg-gray-50 p-1 px-2 text-sm h-20' />
                                </div>
                            </div>
                        </div>
                    </div>
                    {
                        isExplorer &&
                        <div className='w-full border rounded bg-white border-gray-200 my-1 mt-4 p-2'>
                            <button className="w-full relative  text-lg rounded-t flex items-center justify-between font-semibold">
                                Additional Information
                            </button>
                            <div className="w-full flex md:flex-row flex-col justify-between my-1">
                                <div className="w-full  mx-1">
                                    <label htmlFor="" className='text-sm font-semibold'>Pickup Location</label>
                                    <select name="pickupLocation" id="" onChange={handleOnChange} className='focus:outline-none w-full rounded border border-gray-100 bg-gray-50 p-1 px-2 text-sm cursor-pointer mt-2' required>
                                        <option value="">Select Location</option>
                                        {
                                            locationData && locationData.length > 0 &&
                                            locationData.map((location, index) => {
                                                return <option key={index} value={location}>{location}</option>
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                        </div>
                    }
                    <div className='w-full border rounded bg-white border-gray-200 my-1 mt-4 p-2'>
                        <div className="w-full relative  text-lg rounded-t flex items-center justify-between font-semibold">
                            Payment Method
                        </div>
                        <div id='' className="  border-gray-200 mt-1 border-t overflow-hidden relative transition-all duration-100">
                            <div className="w-full flex md:flex-row flex-col justify-start my-1 mt-2">
                                <button type='button' id='stripe' onClick={() => { selectPaymentMethod('stripe') }} className="px-2 py-1 rounded-sm m-1 bg-gray-50 border border-gray-200">
                                    Stripe Payment
                                </button>
                                <button type='button' id='bank' onClick={() => { selectPaymentMethod('bank') }} className="px-2 py-1 rounded-sm m-1 bg-gray-50 border border-gray-200">
                                    Bank Payment
                                </button>
                            </div>
                            {
                                paymentMethod && paymentMethod == 'stripe' && <div className="w-full flex md:flex-row flex-col justify-between p-2 items-center border-t border-b border-gray-100 my-2">
                                    <span className='font-semibold text-sm drop-shadow-sm'>Continue With Stripe Checkout</span>
                                    {
                                        !stripePayClicked && 
                                        <button type='submit' className="bg-green-400 rounded px-2 py-1 text-white text-sm hover:bg-green-500">Pay Now</button>
                                    }
                                    {
                                        stripePayClicked && 
                                        <button className=""> <img src="https://media.tenor.com/On7kvXhzml4AAAAj/loading-gif.gif" className='w-4 h-4' alt="" /></button>
                                    }
                                </div>
                            }
                            {
                                paymentMethod && paymentMethod == 'bank' && settingData && 
                                <div className="w-full p-2">
                                    <h6 className="text-sm ">Please deposit the amount in this bank and send the slip to info@alatwal.com :</h6>
                                    <h6 className="text-sm font-semibold my-1">Beneficiary: {settingData.beneficiary}</h6>
                                    <h6 className="text-sm font-semibold my-1">Bank: {settingData.bank}</h6>
                                    <h6 className="text-sm font-semibold my-1">A/C No: {settingData.accountNumber}</h6>
                                    <h6 className="text-sm font-semibold my-1">IBAN: {settingData.iban}</h6>
                                    <button type='submit' className="bg-blue-400 px-2 py-1 rounded text-white text-sm my-1 hover:bg-blue-500">Book Now</button>
                                </div>
                            }
                        </div>
                    </div>
                </form>
                <div className="bg-white lg:rounded-tl-[40px] lg:w-[30%] w-full p-6">
                    <h2 className="text-lg font-semibold">Your Cart</h2>
                    {
                        cartData && cartData.map((cart, index) => {
                            return <CartItem cart={cart} cartData={cartData} setCartData={setCartData} setDeleteState={setDeleteState} key={index} />
                        })
                    }
                    <div className="w-full  border border-gray-100 rounded-lg p-1 my-2 mt-4">
                        <h2 className="text-lg font-semibold border-b border-gray-100 p-1">Final Payment</h2>
                        {/* <div className="w-full flex justify-between text-sm border-b border-gray-100 p-1 mb-1">
                            <span className='font-semibold'>Total Amount:</span>
                            <p>{finalPayment.totalAmount} AED</p>
                        </div> */}
                        {/* <div className="w-full flex justify-between text-sm border-b border-gray-100 p-1 my-1">
                            <span className='font-semibold'>Total VAT</span>
                            <p>{finalPayment.totalVat} AED</p>
                        </div> */}
                        <div className="w-full flex justify-between text-sm  p-1 my-1">
                            <span className='font-semibold'>Final Payment</span>
                            <p className='font-semibold'>{finalPayment.finalPayment} AED</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Checkout