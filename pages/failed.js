import Link from 'next/link'
import React from 'react'
import {IoIosCloseCircleOutline} from 'react-icons/io'
import { useRouter } from 'next/router'
const SuccessPage = () => {
  const router = useRouter();
  const {id} = router.query;
  return (
    <div className="w-full h-screen flex justify-center items-center p-1 bg-gray-50">
        <div className='md:w-[400px] md:h-[400px] w-full h-[300px] bg-white shadow-lg border-gray-100 border border-l-4 border-l-red-300 flex justify-center items-center relative'>
            <Link href={"/"} className='absolute -top-2 -right-2 rounded-full bg-white hover:bg-black hover:text-white duration-150 text-gray-800'><IoIosCloseCircleOutline className='text-xl'/></Link>
        <div className='flex justify-center items-center flex-col p-2'>
            <img src="/images/close.png" className='w-[100px] aspect-square' alt="" />
            <h2 className="text-center font-bold text-red-500 text-xl mt-2">Failed!</h2>
            <p className='text-center capitalize font-semibold text-lg'>Unfortunately, Your order could not be placed</p>
            {/* <p className='text-center capitalize'>Order id: #{id}</p> */}
        </div>
        </div>
    </div>
  
  )
}

export default SuccessPage