import React from 'react'
import Navbar from '../components/Navbar'
import Carousel from '../components/Carousel'
const Tour = () => {
  return (
    <>
    <Navbar/>
    <Carousel images={['https://source.unsplash.com/random/?Desert', 'https://source.unsplash.com/random/?Mountain', 'https://source.unsplash.com/random/?Nature']} />
    </>
  )
}

export default Tour