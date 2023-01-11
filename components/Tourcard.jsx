import React from 'react'
import { AiTwotoneStar } from 'react-icons/ai'
import { CiLocationOn } from 'react-icons/ci'
import { IoTimeOutline } from 'react-icons/io5'
import Link from 'next/link'
import { useRouter } from 'next/router'
const Tourcard = ({data}) => {
  const router = useRouter();
  const pathName = router.pathname;
  return (
    <>
    <div className="lg:w-full md:w-[48%] w-full shadow-md hover:shadow-lg flex flex-col justify-center relative  lg:flex-row border rounded border-gray-200 my-2 mx-1">
          <div className="w-full lg:w-[40%] h-full overflow-hidden relative aspect-video lg:aspect-auto">
            <img src={data.image[0]?data.image[0]:`https://source.unsplash.com/random/?${data.url}`} className='object-cover w-full object-center' alt="" />
          </div>
          <div className="w-full lg:w-[60%] h-full  aspect-video lg:aspect-auto p-4">
            <div className="w-full flex justify-between items-center pb-4 border-b border-gray-200">
              <div>
                <button className='flex items-center'>
                  <AiTwotoneStar className='text-yellow-500' />
                  <AiTwotoneStar className='text-yellow-500 ml-1' />
                  <AiTwotoneStar className='text-yellow-500 ml-1' />
                  <AiTwotoneStar className='text-yellow-500 ml-1' />
                  <AiTwotoneStar className='text-yellow-500 mx-1' />
                  5.0
                </button>           
                <h3 className="md:text-lg font-semibold">{data.title?data.title:"Tour Title Here"}</h3>
              </div>
              <div className=' p-2'>
                <h3 className="md:text-2xl text-lg font-bold text-blue-400 text-right">AED {data.adultRate?data.adultRate:'Price'}</h3>
              </div>
            </div>
            <div className="w-full flex justify-start items-center py-2 mt-2">
              <button className='flex items-center text-sm'> <CiLocationOn className='bg-gray-200 p-1 rounded-full mr-2 text-xl aspect-square' /> {data.location?data.location:'Location'} <span className='opacity-20 mx-2'>|</span></button>
              <button className='flex items-center text-sm'> <IoTimeOutline className='bg-gray-200 p-1 rounded-full mr-2 text-xl aspect-square' /> {data.duration?data.duration:'00 hours'}</button>
            </div>
            <div className="w-full py-2 overflow-ellipsis mb-6">
              {data.description?data.description.slice(0, 420)+"..":'Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis dolore eaque quisquam quas tempore sint, ipsam laborum magnam reiciendis unde. Consequuntur, aspernatur? Dolores laudantium cupiditate aliquid tempore expedita accusantium accusamus.'}
            </div>
            <Link href={`/tour/${data.url}`}><button className=" ml-4 mt-4 rounded bg-gray-200 px-2 py-1 absolute bottom-3 lg:left-[40%] left-0 hover:bg-gray-300">Book Now</button></Link>
          </div>
        </div>
    </>
  )
}

export default Tourcard