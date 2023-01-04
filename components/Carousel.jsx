import React, { useState } from 'react'
import { MdOutlineNavigateNext } from 'react-icons/md'
import { GrFormPrevious } from 'react-icons/gr'
// https://source.unsplash.com/random/?Mountain
const Carousel = ({ images }) => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const getSlide = index => {
    console.log(index)
    if (typeof window !== 'undefined') {
      let slideImage = document.querySelector('#slide-image');
      slideImage.classList.remove("xyz-in");
      slideImage.classList.add("xyz-out");
      setTimeout(() => {
        slideImage.src = images[index];
        slideImage.classList.remove("xyz-out");
        slideImage.classList.add("xyz-in");
      }, 300);
    }
  }
  return (
    <>
      <div className="w-full">
        <div className="w-full overflow-hidden relative p-2">
          <div className="w-full overflow-hidden">
            <img id='slide-image' src={images[currentSlide]} className='h-56 w-full block object-cover object-center rounded-md duration-200 ease-in-out hover:scale-105 xyz-in ' xyz="fade big" alt="" />
          </div>
        </div>
        <div className="thumbnail w-full flex flex-wrap justify-center p-2">
          {
            images && images.map((image, index) => {
              return [<button key={index} onClick={() => { getSlide(index) }} className='w-12 h-12 aspect-square mx-1 rounded hover:drop-shadow-md  overflow-hidden'>
                <img src={image} className='object-cover w-full h-12 object-center hover:scale-110 duration-100 ease-in-out ' alt="" />
              </button>]
            })
          }
        </div>
      </div>
    </>
  )
}

export default Carousel