import React, {useState, useEffect} from 'react'
import { useRouter } from 'next/router'
import Navbar from '../../components/Navbar'
import Tourcard from '../../components/Tourcard'
import Tourpage from '../../components/Tourpage'
const DesertSafari = ({tourUrl}) => {
  const [tourData, setTourData] = useState()
  const [categoryInfo, setCategoryInfo] = useState({title:'', image:''})
    const fetchTour = async () => {
        try {
          const response = await fetch("/api/tour/fetchone", {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ url: tourUrl })
        });
        const responseData = await response.json();
        console.log(responseData)
        setTourData(responseData.tour);
        } catch (error) {
          console.log(error)
        }
    }
    useEffect(() => {
        fetchTour();
    }, [])
  return (
    <>
   {
     tourData && 
    <Tourpage data={tourData}/>
   }
   </>
  )
}

export default DesertSafari
export async function getServerSideProps(context) {
  const {slag} = context.params;
  console.log(slag)
  return {
    props: {
      tourUrl:slag
    }, // will be passed to the page component as props
  }
}