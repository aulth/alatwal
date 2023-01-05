import React from 'react'
import Navbar from '../../../components/Navbar'
import Tourcard from '../../../components/Tourcard'
import data from '../../data.json';
const DhowCruise = ({tours}) => {
  return (
    <>
      <Navbar />
      <div className="w-full h-56 overflow-hidden relative">
        <img src="https://source.unsplash.com/random/?dhow-cruise" className='object-cover object-center w-full ' alt="" />
        <div className="w-full absolute top-0 h-56 flex justify-center items-center">
        <h3 className="md:text-5xl text-3xl font-bold font-[helvetica] text-white drop-shadow">Dhow Cruise Tours</h3>
        </div>
      </div>
      <div className="w-full flex flex-wrap m-auto p-2 box-border">
        {
          tours.map((data, index)=>{
            return [<Tourcard key={index} data={data} />]
          })
        }
      </div>

    </>
  )
}

export default DhowCruise
export async function getServerSideProps(context) {
  let tours = data.filter(data=>data.category=="dhow-cruise");
  console.log(tours)
  return {
    props: {
      tours:tours
    }, // will be passed to the page component as props
  }
}