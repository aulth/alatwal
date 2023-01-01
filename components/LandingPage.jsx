import React from 'react'

const LandingPage = () => {
  return (
    <>
    <style jsx>

        {`
        input:focus{
            outline:none !important;
        }
        `}
    </style>
    <div style={{ height: 'calc(100vh - 72px)' }} className="flex flex-col justify-center items-center">
          <h2 className="md:text-5xl text-3xl text-center font-semibold font-[helvetica] text-white drop-shadow-lg">Book With Us And Enjoy Your Journey!</h2>
          <div className="flex justify-center items center border-white border rounded md:w-3/4 w-full">
            <div className="flex items-center bg-white rounded-l w-full">
              <select name="service" id="service" className='border-none focus:outline-none w-full'>
                <optgroup label='UAE Tour'>
                  <option value="">Desert Safari</option>
                  <option value="">Burj Khalifa</option>
                  <option value="">Dhow Cruise</option>
                  <option value="">Wild Wadi Water Park</option>
                </optgroup>
                <optgroup label='Visa'>
                  <option value="">UAE Visa</option>
                  <option value="">International Visa</option>
                </optgroup>
              </select>
            </div>
            <div className="flex items-center bg-white w-full">
              <input type="date" className='w-full outline-none border-none focus:outline-white focus:border-white' />
            </div>
          </div>
        </div>
    </>
  )
}

export default LandingPage