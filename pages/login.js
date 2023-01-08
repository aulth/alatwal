import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Link from 'next/link'
import { ToastContainer, toast } from 'react-toastify';
import Spinner from '../components/Spinner';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';
const Login = () => {
    const router = useRouter();
    const [userData, setUserData] = useState({ email: '', password: '' });
    const [isEmailValid, setIsEmailValid] = useState()
    const [loading, setLoading] = useState(false);
    const [userId, setUserId] = useState("");
    const [userOtp, setUserOtp] = useState('');
    const [systemOtp, setSystemOtp] = useState("")
    let authtoken;
    function validateEmail(email) {
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (email.match(mailformat)) {
            return true;
        }
        else {
            return false;
        }
    }
    const handleOnChange = (e) => {
        e.preventDefault();
        setUserData({ ...userData, [e.target.name]: e.target.value });
        if (e.target.name == 'email' && typeof window != 'undefined') {
            if (validateEmail(e.target.value)) {
                setIsEmailValid(true);
                document.querySelector("#not-valid").classList.add("hidden")
            } else {
                setIsEmailValid(false);
                document.querySelector("#not-valid").classList.remove("hidden")
            }
        }
    }
    const handleOnLogin = async (e) => {
        e.preventDefault();
        if (!userData.email || !userData.password) {
            toast.info("please fill all the fields")
            return;
        }
        setLoading(true)
        const apiResponse = await fetch("/api/user/login", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({ email: userData.email, password: userData.password })
        })
        const apiData = await apiResponse.json();
        console.log(apiData);
        if (apiData.success) {
            if (!apiData.verified) {
                setUserId(apiData.id);
                authtoken = apiData.authtoken;
                let otp = Math.floor(1000 + Math.random() * 9000);
                setSystemOtp(otp);
                const sendOtp = await fetch("/api/email/sendotp", {
                    method: "POST",
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify({ otp: otp, to: userData.email })
                })
                const sendOtpData = await sendOtp.json();
                if (sendOtpData.success) {
                    setLoading(false)
                    document.querySelector("#login-box").classList.add("hidden")
                    document.querySelector("#otp-box").classList.remove("hidden");
                } else {
                    toast.error("Something went wrong")
                    toast.error("Plese try again");
                }
            }else{
                toast.success("Login Successful");
                localStorage.setItem("tour-user", JSON.stringify(authtoken));
                setLoading(false)
                router.push("/");
            }
        } else {
            setLoading(false)
            toast.error(apiData.msg);
        }
    }
    const handleOnEnterOtp = (e) => {
        e.preventDefault();
        setUserOtp(e.target.value);
        console.log(userOtp);
    }
    const handleOnVerifyOtp = async (e) => {
        e.preventDefault();
        if (userOtp == systemOtp) {
            setLoading(true);
            console.log(userId)
            const verifyOtp = await fetch("/api/user/verify", {
                method: "POST",
                header: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({ id: userId })
            })
            const verifyOtpData = await verifyOtp.json();
            console.log(verifyOtpData)
            if (verifyOtpData.success) {
                toast.success("Login successful");
                toast.success("Email Verified");
                localStorage.setItem("tour-user", JSON.stringify(authtoken));
                setLoading(false)
                router.push("/");
            } else {
                toast.error(verifyOtpData.msg);
            }
        } else {
            toast.error("wrong otp");
        }
    }
    return (
        <>
            <Navbar />
            <ToastContainer />
            <section style={{ minHeight: 'calc(100vh - 72px)' }} className="bg-gray-50 dark:bg-gray-900 overflow-hidden">
                <div   className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <div id='login-box' className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Login to your account
                            </h1>
                            <form onSubmit={handleOnLogin} className="space-y-4 md:space-y-6" action="#">
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email <span id='not-valid' className='text-red-500 hidden'>is not valid</span></label>
                                    <input type="email" onChange={handleOnChange} name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required />
                                </div>
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                    <input type="password" onChange={handleOnChange} name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                                </div>
                                {
                                    loading &&
                                    <div className="w-full flex justify-center -ml-3"><Spinner /></div>
                                }
                                {
                                    !loading &&
                                    <button type="submit" className={`w-full ${isEmailValid ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-300'} text-white   focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`} disabled={isEmailValid ? false : true}>Login</button>

                                }
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    New to tourism? <Link href="/register" className="font-medium text-blue-600 hover:underline dark:text-blue-500">Register here</Link>
                                </p>
                            </form>
                        </div>
                    </div>
                    <div id='otp-box' className="w-full hidden bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Verify Email {userData.email ? userData.email : ""}
                                <h5 className="text-sm font-semibold">We have sent an otp to your mail.</h5>
                            </h1>
                            <form onSubmit={handleOnVerifyOtp} className="space-y-4 md:space-y-6" action="#">
                                <div>
                                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter OTP</label>
                                    <input type="number" onChange={handleOnEnterOtp} name="otp" id="otp" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="0000" required />
                                </div>
                                {
                                    loading &&
                                    <div className="w-full flex justify-center -ml-3"><Spinner /></div>
                                }
                                {
                                    !loading &&
                                    <button type="submit" className={` w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}  >Submit</button>
                                }
                            </form>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}

export default Login