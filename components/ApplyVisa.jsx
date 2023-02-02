import React, { useEffect, useState } from 'react'
import UploadImage from './../components/Admin/Upload/UploadImage'
import UploadPassport from './../components/Admin/Upload/UploadPassport'
import UploadPhotograph from './../components/Admin/Upload/UploadPhotgraph'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';
import { loadStripe } from '@stripe/stripe-js';
import Spinner from './../components/Spinner'
import axios from 'axios';
const ApplyVisa = ({ setApplyClicked, data }) => {
    const [bookingData, setBookingData] = useState({ item: data, type: data.type, price: data.type == 'UAE Visa' ? data.price30Days : data.price });
    const [image, setImage] = useState([])
    const [passport, setPassport] = useState('');
    const [photograph, setPhotograph] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');
    const [stripePayClicked, setStripePayClicked] = useState(false)
    const router = useRouter();
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (typeof window !== 'undefined') {
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
        setBookingData({ ...bookingData, paymentMethod: method })
    }

    const initiateBooking = async (e) => {
        e.preventDefault();
        if (paymentMethod == 'stripe') {
            setStripePayClicked(true)
        }
        if (!bookingData.date) {
            toast.info("Please select the date")
            return;
        }
        if (!passport) {
            toast.info("Please upload passport copy")
            return;
        }
        if (!photograph) {
            toast.info("Please upload photograph")
            return;
        }
        if (bookingData.type == 'UAE Visa' && !bookingData.visaDays) {
            toast.info("Please select visa duration")
            return;
        }
        setLoading(true)
        const response = await fetch('/api/booking/add', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                firstName: bookingData.firstName,
                lastName: bookingData.lastName,
                email: bookingData.email,
                contact: bookingData.contact,
                paymentMethod: bookingData.paymentMethod,
                item: bookingData.item,
                bookingFor: 'visa',
                price: bookingData.price,
                paymentStatus: 'pending',
                date: bookingData.date,
                image: image,
                type: bookingData.type,
                visaDays: bookingData.visaDays,
                authtoken: localStorage.getItem('tour-user'),
                passport: passport,
                photograph: photograph
            })
        })
        const responseData = await response.json();
        if (responseData.success) {
            setLoading(false)
            if (paymentMethod == 'stripe') {
                createCheckOutSession(responseData.bookingNumber);
            } else {
                router.push('/success?id=' + responseData.bookingNumber)
            }
        } else {
            toast.error(responseData.msg)
            setStripePayClicked(false)
        }
    }

    const createCheckOutSession = async (bookingNumber) => {
        let name = '';
        // setStripePayClicked(true)
        name = bookingData.item.title;
        const stripe = await stripePromise;
        const checkoutSession = await axios.post('/api/stripe/create-stripe-session', {
            item: {
                image: 'https://i.ibb.co/BLsq4JS/logo.png',
                name: 'Visa Payment',
                price: bookingData.price,
                description: bookingData.item.description,
                quantity: 1,
                bookingNumber: bookingNumber
            },
        });
        const result = await stripe.redirectToCheckout({
            sessionId: checkoutSession.data.id,
        });
        if (result.error) {
            alert(result.error.message);
        }
    };

    const handleOnChange = (e) => {
        e.preventDefault();
        setBookingData({ ...bookingData, [e.target.name]: e.target.value });
        if (e.target.name == 'visaDays') {
            setBookingData({ ...bookingData, type: e.target.value, price: e.target.value == '30 Days Visa' ? data.price30Days : e.target.value == '60 Days Visa' ? data.price60Days : data.price })
        }
    }

    const handleOnBook = async () => {

    }

    return (
        <>
            <ToastContainer />
            <form className='p-4 md:w-[40rem] w-full border border-gray-300 rounded-sm' >
                {
                    data.type == 'UAE Visa' &&
                    <>
                        <label className="block my-2 text-sm font-medium text-gray-900 dark:text-white">Type of Visa</label>
                        <select name="visaDays" onChange={handleOnChange} className="  rounded-r-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="">
                            <option value="">Select Duration</option>
                            <option value="30 Days Visa">30 Days Visa</option>
                            <option value="60 Days Visa">60 Days Visa</option>
                        </select>
                    </>
                }
                <label className="block mb-2 mt-4 text-sm font-medium text-gray-900 dark:text-white">Date of Travelling</label>
                <input type="date" onChange={handleOnChange} name="date" className="  rounded-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="date" required />
                <label className="block mb-2 mt-4 text-sm font-medium text-gray-900 dark:text-white">Your Name</label>
                <div className="w-full flex items-center">
                    <input type="text" onChange={handleOnChange} name="firstName" placeholder='First Name' className="  rounded-l-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="" required />
                    <input type="text" onChange={handleOnChange} name="lastName" placeholder='Last Name' className="  md:ml-2 md:mt-0 mt-2 rounded-r-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="" required />
                </div>
                <label className="block mb-2 mt-4 text-sm font-medium text-gray-900 dark:text-white">Your Email</label>
                <input type="email" onChange={handleOnChange} name="email" className=" rounded-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="" required />
                <label className="block mb-2 mt-4 text-sm font-medium text-gray-900 dark:text-white">Contact Number (optional)</label>
                <input type="tel" onChange={handleOnChange} name="contact" className="  rounded-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="" />
                <label className="block mt-4 -mb-4 text-sm font-medium text-gray-900 dark:text-white">Attach Passport (pdf)</label>
                <UploadPassport setPassport={setPassport} />
                <label className="block  -mb-4 text-sm font-medium text-gray-900 dark:text-white">Attach Recent Photograph</label>
                <UploadPhotograph setPhotograph={setPhotograph} />
                <div className="w-full flex md:flex-row flex-col justify-start my-1 mt-2">
                    <button type='button' id='stripe' onClick={() => { selectPaymentMethod('stripe') }} className="px-2 py-1 rounded-sm m-1 bg-gray-50 border border-gray-200">
                        Stripe Payment
                    </button>
                    <button type='button' id='bank' onClick={() => { selectPaymentMethod('bank') }} className="px-2 py-1 rounded-sm m-1 bg-gray-50 border border-gray-200">
                        Bank Payment
                    </button>
                </div>
                {loading &&
                    <div className="w-full flex justify-center items-center">
                        <Spinner />
                    </div>
                }{
                    !loading &&
                    <>
                        <input type="button" onClick={initiateBooking} disabled={paymentMethod == ''} value={"Apply"} className="  bg-blue-500 rounded-lg border border-gray-300 text-white cursor-pointer hover:bg-blue-600 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 my-4" id="" />
                        <button type='button' onClick={() => { setApplyClicked(false) }} className='className="  bg-gray-50 border border-gray-300 text-gray-900 cursor-pointer hover:bg-gray-100 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 my-4" '>Cancel</button>
                    </>
                }
            </form>
        </>

    )
}

export default ApplyVisa