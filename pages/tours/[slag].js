import React, {useState, useEffect} from 'react'
import { useRouter } from 'next/router'
import Navbar from '../../components/Navbar'
import Tourcard from '../../components/Tourcard'
import Tourpage from '../../components/Tourpage'
const DesertSafari = ({categoryUrl}) => {
  const [tourData, setTourData] = useState()
  const [allTour, setAllTour] = useState([])
  const [categoryInfo, setCategoryInfo] = useState({title:'', image:[]})
    const fetchTour = async () => {
        try {
          const response = await fetch("/api/tour/singlecategory", {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ categoryUrl: categoryUrl })
        });
        const responseData = await response.json();
        console.log(responseData)
        setAllTour(responseData.tour)
        } catch (error) {
          console.log(error)
        }
    }
    const fetchCategory = async () => {
      try {
        const response = await fetch("/api/category/fetchone", {
          method: 'POST',
          headers: {
              'content-type': 'application/json'
          },
          body: JSON.stringify({ url: categoryUrl })
      });
      const responseData = await response.json();
      console.log(responseData)
      setCategoryInfo(responseData.category);
      } catch (error) {
        console.log(error)
      }
  }
   
    useEffect(() => {
        fetchTour();
        fetchCategory();
    }, [])
  return (
    <>
      <Navbar />
      <div className="w-full h-56 overflow-hidden relative">
        <img src={categoryInfo.image[1]?categoryInfo.image[1]:`https://source.unsplash.com/random/?${categoryInfo.url}`} className='object-cover object-center w-full ' alt="" />
        <div className="w-full absolute top-0 h-56 flex justify-center items-center">
        <h3 className="md:text-5xl text-3xl font-bold font-[helvetica] text-white drop-shadow  text-center">{categoryInfo.title?categoryInfo.title:"No Tour Found"}</h3>
        </div>
      </div>
      <div className="w-full flex flex-wrap m-auto p-2 box-border">
        {
          allTour && allTour.map((data, index)=>{
            return [<Tourcard key={index} data={data} />]
          })
        }
      </div>

    </>
  )
}

export default DesertSafari
export async function getServerSideProps(context) {
  const {slag} = context.params;
  console.log(slag)
  return {
    props: {
      categoryUrl:slag
    }, // will be passed to the page component as props
  }
}