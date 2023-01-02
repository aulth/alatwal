import React from 'react'

const Service = () => {
  return (
    <div  style={{ minHeight: 'calc(100vh - 72px)' }}  className="flex flex-col justify-center items-center p-2">
        <h2 className="text-2xl md:text-3xl font-[helvetica] md:mb-3 my-3">
          Select a Service
        </h2>
        <p className="text-center md:w-3/4 w-full mb-3">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam, a optio autem adipisci commodi, quibusdam nam iste repellendus sed architecto, delectus magnam eveniet non repudiandae earum doloribus molestias laborum consequatur.
        </p>
        <div className="w-full flex md:flex-row flex-col justify-around items-center my-3">
          <div className='md:w-[200px] m-2 mt-4 flex flex-col items-center rounded font-[helvetica] border border-transparent hover:border hover:border-blue-400 hover:shadow-lg md:p-2 py-8 text-white hover:bg-gray-100 hover:brightness-105'>
            <img className='w-1/2' src="/images/visa-uae.png" alt="" />
            <h3 className="text-lg font-semibold text-black text-center py-2">UAE Visa</h3>
            <button className="bg-gray-700 hover:bg-gray-800 font-extralight rounded px-2 py-2 text-center text-sm">
              Explore
            </button>
          </div>
          <div className='md:w-[200px] m-2 mt-4 flex flex-col items-center rounded font-[helvetica] border border-transparent hover:border hover:border-blue-400 hover:shadow-lg md:p-2 py-8 text-white hover:bg-gray-100 hover:brightness-105'>
            <img className='w-1/2' src="/images/travel-icon.png" alt="" />
            <h3 className="text-lg font-semibold text-black text-center py-2">UAE Tours</h3>
            <button className="bg-gray-700 hover:bg-gray-800 font-extralight rounded px-2 py-2 text-center text-sm">
              Explore
            </button>
          </div>
          <div className='md:w-[200px] m-2 mt-4 flex flex-col items-center rounded font-[helvetica] border border-transparent hover:border hover:border-blue-400 hover:shadow-lg md:p-2 py-8 text-white hover:bg-gray-100 hover:brightness-105'>
            <img className='w-1/2' src="/images/passport.png" alt="" />
            <h3 className="text-lg font-semibold text-black text-center py-2">Intenrational Visa</h3>
            <button className="bg-gray-700 hover:bg-gray-800 font-extralight rounded px-2 py-2 text-center text-sm">
              Explore
            </button>
          </div>
        </div>
      </div>
  )
}

export default Service