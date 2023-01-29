import React, {useState, useEffect} from 'react'
import { BsChevronCompactDown } from 'react-icons/bs'
import Link from 'next/link';
import { useRouter } from 'next/router';
const LandingPage = () => {
  const [service, setService] = useState('');
  const [allService, setAllService] = useState();
  const [allTour, setAllTour] = useState();
  const [tourUrl, setTourUrl] = useState('');
  const router = useRouter();
  const toggleService = () => {
    if (typeof window !== 'undefined') {
      document.getElementById("service-list").classList.toggle("hidden");
    }
  }
  useEffect(() => {
    if (typeof window !== 'undefined') {
      var date = new Date();
      var day = date.getDate();
      var month = date.getMonth() + 1;
      var year = date.getFullYear();
      if (month < 10) month = "0" + month;
      if (day < 10) day = "0" + day;
      var today = year + "-" + month + "-" + day;
      document.getElementById('datePicker').value = today;
    }

    if(typeof window!=='undefined'){
      
    }
  }, [])
  const fetchTour = async ()=>{
    const response = await fetch("/api/tour/fetch");
    const responseData = await response.json();
    setAllTour(responseData.tour);
    console.log(responseData.tour);
  }
  useEffect(() => {
    fetchTour();
  }, [])
  const navigateToTour = (e)=>{
    router.push(`/tour/${e.target.value}`);
  }
  return (
    <>
    <div className="home">
        <div style={{ height: 'calc(100vh - 72px)' }} className="flex flex-col justify-center items-center p-1">
          <h2 className="md:text-5xl text-3xl text-center font-semibold font-[helvetica] text-white drop-shadow-lg mb-8">Best Partner in Your Travel Dairy!</h2>
          <div className="flex md:flex-row flex-col justify-center items center border-white border rounded md:w-3/4 w-full p-1">
            <div className="flex items-center bg-white md:rounded-l md:rounded-r-none rounded-t  p-1  w-full relative">
              <select name="" onChange={navigateToTour} id="" className='w-full p-2 border-none focus:outline-none'>
                <option value="">Select Tour</option>
                {
                  allTour && allTour.length>0 && 
                  allTour.map((tour, index)=>{
                    return <option key={index} value={tour.url}>{tour.title}</option>
                  })
                }
              </select>
              {/* <button onClick={toggleService} className="w-full px-2 py-1 flex items-center text-gray-500 font-semibold">{service?service:'Burj Khalifa'} <BsChevronCompactDown className='mx-2 ' /></button>
              <div id='service-list' className="w-full hidden border-b border-l border-r border-gray-400 absolute -ml-[4.5px] top-10  rounded-b bg-white p-1 z-50">
                <ul className='w-full'>
                  <li className='w-full bg-gray-700 p-1 text-white font-semibold'>UAE Tours</li>
                  <li className=' text-gray-400 hover:text-white hover:bg-gray-600 cursor-pointer mb-1 p-1' onClick={()=>{setService("Desert Safari");toggleService()}}>Desert Safari</li>
                  <li className='text-gray-400 hover:text-white hover:bg-gray-600 cursor-pointer mb-1 p-1'  onClick={()=>{setService("Burj Khalifa");toggleService()}}>Burj Khalifa</li>
                  <li className=' text-gray-400 hover:text-white hover:bg-gray-600 cursor-pointer mb-1 p-1'  onClick={()=>{setService("Dhow Cruise");toggleService()}}>Dhow Cruise</li>
                  <li className='text-gray-400 hover:text-white hover:bg-gray-600 cursor-pointer mb-1 p-1'  onClick={()=>{setService("Wild Wadi Water Park");toggleService()}}>Wild Wadi Water Park</li>
                  <hr />
                  <li className='w-full bg-gray-700 p-1 text-white font-semibold'>Visa</li>
                  <li className='text-gray-400 hover:text-white hover:bg-gray-600 cursor-pointer mb-1 p-1'  onClick={()=>{setService("UAE Visa");toggleService()}}>UAE Visa</li>
                  <li className=' text-gray-400 hover:text-white hover:bg-gray-600 cursor-pointer mb-1 p-1'  onClick={()=>{setService("International Visa");toggleService()}}>International Visa</li>
                </ul>
              </div> */}
            </div>
            <div className="flex md:rounded-r rounded-b  md:rounded-bl-none items-center bg-white w-full md:my-0 my-1">
              <input type="date" id='datePicker' className='w-full md:rounded-none rounded-l outline-none border-none focus:border-none focus:outline-none p-2' />
              <input type="submit" value={"Book Now"} className='flex justify-center items-center  md:rounded-r rounded-br w-[200px] bg-orange-400 hover:bg-orange-500 cursor-pointer text-white font-semibold p-2' />
            </div>
          </div>
          <p className='text-center text-xl md:w-3/4 w-full my-5 text-white drop-shadow-xl '>Choose a wide range of experiences and services with best guaranteed rate and 24 hours customer support. Enjoy our hassle free booking system with safe and secure payments.</p>
        </div>
      </div>

    </>
  )
}

export default LandingPage