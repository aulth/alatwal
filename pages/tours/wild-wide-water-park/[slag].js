import React, {useState} from 'react'
import Tourpage from '../../../components/Tourpage'
import { useRouter } from 'next/router'
import data from '../../data.json'
const DesertSafari = ({tourData}) => {

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
  let tour = data.filter(data=>data.url==slag)[0];
  console.log(tour)
  return {
    props: {
      tourData:tour
    }, // will be passed to the page component as props
  }
}