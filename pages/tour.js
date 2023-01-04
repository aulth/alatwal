import React from 'react'
import LandingPage from '../components/LandingPage'
import Navbar from '../components/Navbar'
import Tourservice from '../components/Tourservice'
import Carousel from '../components/Carousel'
const Tour = () => {
  return (
    <>
    <Navbar/>
    <Tourservice/>
    <Carousel images={['https://source.unsplash.com/random/?Desert', 'https://source.unsplash.com/random/?Mountain', 'https://source.unsplash.com/random/?Nature']} />
    </>
  )
}

export default Tour