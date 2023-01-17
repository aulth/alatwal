import React, {useState, useEffect} from 'react'
import Link from 'next/link';

const Service = () => {
  const [allService, setAllService] = useState()
  const fetchService = async ()=>{
    const response = await fetch("/api/category/fetch");
    const responseData = await response.json();
    console.log(responseData.category[0].type)
    setAllService(responseData.category);
  }
  useEffect(() => {
    fetchService();
  }, [])
  
  return (
    <div  style={{ minHeight: 'calc(100vh - 72px)' }}  className="flex flex-col justify-center items-center p-2">
        <h2 className="text-2xl md:text-3xl font-[helvetica] md:mb-3 my-3">
          Select a Service
        </h2>
        <p className="text-center text-xl md:w-3/4 w-full mb-3">
        Up and running, Alatwal Travel & Tourism is one stop solution for all your travel needs. We are a destination management company based in UAE offering the best of UAE tours, UEA Visa services and International Visa services.
        </p>
        <div className="w-full flex md:flex-row flex-col justify-around overflow-auto items-center my-3">
          {
            allService && allService.map((service, index)=>{
              return <div key={index} className='md:w-[200px] m-2 mt-4 flex flex-col items-center rounded font-[helvetica] border border-transparent hover:border hover:border-blue-400 hover:shadow-lg md:p-2 py-8 text-white hover:bg-gray-100 hover:brightness-105'>
              <img className='w-1/2' src={service.image[0]} alt="" />
              <h3 className="text-lg font-semibold text-black text-center py-2">{service.title}</h3>
              <Link href={`${service.type=='tour'?'/tours/'+service.url:'/service/'+service.url}`} ><button className="bg-gray-700 hover:bg-gray-800 font-extralight rounded px-2 py-2 text-center text-sm">
                Explore
              </button>                                                                                                                                                                                                                           
              </Link>
            </div>
            })
          }
          {
            !allService &&
            <>
            <div className='md:w-[200px] m-2 mt-4 flex flex-col items-center rounded font-[helvetica] border border-transparent hover:border   md:p-2 py-8 '>
              <div className='md:w-[200px] rounded h-52 bg-gray-200 animate-pulse' src="" alt="" />
              <h3 className="text-lg font-semibold text-black text-center py-2 w-[200px] bg-gray-200 animate-pulse rounded-sm my-1 ">&nbsp;</h3>
               <button className="w-[100px]   font-extralight rounded px-2 py-2 text-center text-sm bg-gray-200 animate-pulse">
                &nbsp;
              </button>                                                                                                                                                                                                                           
            </div>
            <div className='md:w-[200px] m-2 mt-4 flex flex-col items-center rounded font-[helvetica] border border-transparent hover:border   md:p-2 py-8 '>
              <div className='md:w-[200px] rounded h-52 bg-gray-200 animate-pulse' src="" alt="" />
              <h3 className="text-lg font-semibold text-black text-center py-2 w-[200px] bg-gray-200 animate-pulse rounded-sm my-1 ">&nbsp;</h3>
               <button className="w-[100px]   font-extralight rounded px-2 py-2 text-center text-sm bg-gray-200 animate-pulse">
                &nbsp;
              </button>                                                                                                                                                                                                                           
            </div>
            <div className='md:w-[200px] m-2 mt-4 flex flex-col items-center rounded font-[helvetica] border border-transparent hover:border   md:p-2 py-8 '>
              <div className='md:w-[200px] rounded h-52 bg-gray-200 animate-pulse' src="" alt="" />
              <h3 className="text-lg font-semibold text-black text-center py-2 w-[200px] bg-gray-200 animate-pulse rounded-sm my-1 ">&nbsp;</h3>
               <button className="w-[100px]   font-extralight rounded px-2 py-2 text-center text-sm bg-gray-200 animate-pulse">
                &nbsp;
              </button>                                                                                                                                                                                                                           
            </div>
            </>
          }
        </div>
      </div>
  )
}

export default Service