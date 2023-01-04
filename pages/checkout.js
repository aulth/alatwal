import React, { useState, useEffect } from 'react'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../components/Navbar'
import CartItem from '../components/CartItem'
const Checkout = () => {
    const [paymentMethod, setPaymentMethod] = useState('')
    const [cartData, setCartData] = useState();
    const [finalPayment, setFinalPayment] = useState({totalAmount:0, totalVat:0, finalPayment:0})
    let totalAmount=0, totalVat=0
    const selectPaymentMethod = (method)=>{
        if(typeof window!=='undefined'){
            let stripe = document.querySelector(`#stripe`);
            let bank = document.querySelector(`#bank`);
            if(method=='bank'){
                bank.classList.remove('bg-gray-50');
                bank.classList.add('bg-gray-200');
                stripe.classList.remove('bg-gray-200');
                stripe.classList.add('bg-gray-50');
            }else{
                bank.classList.remove('bg-gray-200');
                bank.classList.add('bg-gray-50');
                stripe.classList.remove('bg-gray-50');
                stripe.classList.add('bg-gray-200');
            }
            
        }
        setPaymentMethod(method);
    }
    useEffect(() => {
      if(typeof window!=='undefined'){
        if(localStorage.getItem('tour-cart')){
            let cart = JSON.parse(localStorage.getItem('tour-cart'))
            for(let item of cart){
                console.log(item.price);
                totalAmount+= item.price;
            }
            setFinalPayment({totalAmount:totalAmount, totalVat:totalVat, finalPayment:totalAmount+totalVat});
            setCartData(JSON.parse(localStorage.getItem('tour-cart')));
        }
      }
    }, [])
    
    return (
        <>
            <Navbar />
            <ToastContainer />
            <div className="w-full flex lg:flex-row  flex-col bg-gray-50 m-auto lg:rounded-l rounded">
                <div className='lg:w-[70%] w-full p-4'>
                    <div className="w-full flex flex-col lg:flex-row justify-between">
                    </div>
                    <div className='w-full border rounded bg-white border-gray-200 my-1 p-2'>
                        <button className="w-full relative  text-lg rounded-t flex items-center justify-between font-semibold">
                            Personal Information
                        </button>
                        <div id='' className="  border-gray-200 mt-1 border-t overflow-hidden relative transition-all duration-100">
                            <div className="w-full flex md:flex-row flex-col justify-between my-1">
                                <div className="w-full md:w-1/2 mx-1">
                                    <label htmlFor="" className='text-sm font-semibold'>First Name</label>
                                    <input type="text" placeholder='Mohd' className='focus:outline-none w-full rounded border border-gray-100 bg-gray-50 p-1 px-2 text-sm' />
                                </div>
                                <div className="w-full md:w-1/2 mx-1">
                                    <label htmlFor="" className='text-sm font-semibold'>Last Name</label>
                                    <input type="text" placeholder='Usman' className='focus:outline-none w-full rounded border border-gray-100 bg-gray-50 p-1 px-2 text-sm' />
                                </div>
                            </div>
                            <div className="w-full flex md:flex-row flex-col justify-between my-1">
                                <div className="w-full  mx-1">
                                    <label htmlFor="" className='text-sm font-semibold'>Email</label>
                                    <input type="email" placeholder='example@domain.com' className='focus:outline-none w-full rounded border border-gray-100 bg-gray-50 p-1 px-2 text-sm' />
                                </div>
                            </div>
                            <div className="w-full flex md:flex-row flex-col justify-between my-1">
                                <div className="w-full  mx-1">
                                    <label htmlFor="" className='text-sm font-semibold'>Contact Number</label>
                                    <input type="tel" placeholder='9839098390' className='focus:outline-none w-full rounded border border-gray-100 bg-gray-50 p-1 px-2 text-sm' />
                                </div>
                            </div>
                            <div className="w-full flex md:flex-row flex-col justify-between my-1">
                                <div className="w-full  mx-1">
                                    <label htmlFor="" className='text-sm font-semibold'>Country</label>
                                    <select name="country" id="" className='focus:outline-none w-full rounded border border-gray-100 bg-gray-50 p-1 px-2 text-sm cursor-pointer'>
                                        <option value="0">United Arab Emirated</option>
                                    </select>
                                </div>
                            </div>
                            <div className="w-full flex md:flex-row flex-col justify-between my-1">
                                <div className="w-full  mx-1">
                                    <label htmlFor="" className='text-sm font-semibold'>Special Request</label>
                                    <textarea  placeholder='Special Request' className='focus:outline-none w-full rounded border border-gray-100 bg-gray-50 p-1 px-2 text-sm h-20' />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='w-full border rounded bg-white border-gray-200 my-1 mt-4 p-2'>
                        <button className="w-full relative  text-lg rounded-t flex items-center justify-between font-semibold">
                            Additional Information
                        </button>
                        <div id='' className="  border-gray-200 mt-1 border-t overflow-hidden relative transition-all duration-100">
                            <div className="w-full flex md:flex-row flex-col justify-between my-1">
                                <div className="w-full  mx-1">
                                    <label htmlFor="" className='text-sm font-semibold'>Pickup Location</label>
                                    <input type="text" placeholder='Enter Pickup location' className='focus:outline-none w-full rounded border border-gray-100 bg-gray-50 p-1 px-2 text-sm' />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='w-full border rounded bg-white border-gray-200 my-1 mt-4 p-2'>
                        <button className="w-full relative  text-lg rounded-t flex items-center justify-between font-semibold">
                            Payment Method
                        </button>
                        <div id='' className="  border-gray-200 mt-1 border-t overflow-hidden relative transition-all duration-100">
                            <div className="w-full flex md:flex-row flex-col justify-start my-1 mt-2">
                                <button id='stripe' onClick={()=>{selectPaymentMethod('stripe')}} className="px-2 py-1 rounded-sm m-1 bg-gray-50 border border-gray-200">
                                    Stripe Payment
                                </button>
                                <button id='bank'  onClick={()=>{selectPaymentMethod('bank')}}  className="px-2 py-1 rounded-sm m-1 bg-gray-50 border border-gray-200">
                                    Bank Payment
                                </button>
                            </div>
                            {
                                paymentMethod && paymentMethod=='stripe' && <div className="w-full flex md:flex-row flex-col justify-between p-2 items-center border-t border-b border-gray-100 my-2">
                                    <span className='font-semibold text-sm drop-shadow-sm'>Continue With Stripe Checkout</span>
                                    <button className="bg-green-400 rounded px-2 py-1 text-white text-sm hover:bg-green-500">Pay Now</button>
                                </div>
                            }
                            {
                                paymentMethod && paymentMethod=='bank' && <div className="w-full p-2">
                                    <h6 className="text-sm ">Kindly Transfer To the Following Bank Account Details:</h6>
                                    <h6 className="text-sm font-semibold my-1">Beneficiary: Beneficiary name here</h6>
                                    <h6 className="text-sm font-semibold my-1">Bank: Bank name here</h6>
                                    <h6 className="text-sm font-semibold my-1">A/C No: 001140785</h6>
                                    <button className="bg-blue-400 px-2 py-1 rounded text-white text-sm my-1 hover:bg-blue-500">Book Now</button>
                                </div>
                            }
                        </div>
                    </div>
                </div>
                <div className="bg-white lg:rounded-tl-[40px] lg:w-[30%] w-full p-6">
                    <h2 className="text-lg font-semibold">Your Cart</h2>
                    {
                        cartData && cartData.map((cart, index)=>{
                            return <CartItem cart={cart} key={index} />
                        })
                    }
                    <div className="w-full  border border-gray-100 rounded-lg p-1 my-2 mt-4">
                        <h2 className="text-lg font-semibold border-b border-gray-100 p-1">Final Payment</h2>
                        <div className="w-full flex justify-between text-sm border-b border-gray-100 p-1 mb-1">
                            <span className='font-semibold'>Total Amount:</span>
                            <p>{finalPayment.totalAmount} AED</p>
                        </div>
                        <div className="w-full flex justify-between text-sm border-b border-gray-100 p-1 my-1">
                            <span className='font-semibold'>Total VAT</span>
                            <p>{finalPayment.totalVat} AED</p>
                        </div>
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