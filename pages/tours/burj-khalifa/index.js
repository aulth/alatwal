import React from 'react'
import Navbar from '../../../components/Navbar'
import Tourcard from '../../../components/Tourcard'

const DesertSafari = () => {
  const desertSafari = [
    {
      price:'200',
      title:'Morning Desert Safari',
      description:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis dolore eaque quisquam quas tempore sint, ipsam laborum magnam reiciendis unde. Consequuntur, aspernatur? Dolores laudantium cupiditate aliquid tempore expedita accusantium accusamus.',
      location:'Dubai',
      duration:'3-4',
      url:'/'
    }
  ]
  return (
    <>
      <Navbar />
      <div className="w-full h-56 overflow-hidden relative">
        <img src="https://source.unsplash.com/random/?burj khalifa" className='object-cover object-center w-full ' alt="" />
        <div className="w-full absolute top-0 h-56 flex justify-center items-center">
        <h3 className="md:text-5xl text-3xl font-bold font-[helvetica] text-white drop-shadow">Burj Khalifa Tours</h3>
        </div>
      </div>
      <div className="w-full flex flex-wrap m-auto p-2 box-border">
        {
          desertSafari.map((data, index)=>{
            return [<Tourcard key={index} data={data} />]
          })
        }
      </div>

    </>
  )
}

export default DesertSafari