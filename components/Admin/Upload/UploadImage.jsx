import React, { useState } from 'react'
import { BiImageAdd } from 'react-icons/bi'
import { AiOutlineDelete } from 'react-icons/ai'

const UploadImage = ({ labelWidth, image, setImage, multiple, preset }) => {
    let images = [];
    console.log(image)
    const [uploading, setUploading] = useState(false)
    const handleOnClick = (e) => {
        e.preventDefault();
        if (typeof window !== 'undefined') {
            let imageInput = document.querySelector("#upload-image");
            imageInput.click();
        }
    }
    const uploadFile = async (e) => {
        e.preventDefault();
        setUploading(true)
        if (typeof window !== 'undefined') {
            let files = e.target.files;
            for (let file of files) {
                let data = new FormData();
                data.append('file', file);
                data.append('upload_preset', 'images');
                let response = await fetch('https://api.cloudinary.com/v1_1/deypo9kaq/image/upload', {
                    method: "POST",
                    body: data
                })
                let responseData = await response.json();
                images.push(responseData.url)
            }
            setUploading(false);
            console.log(images);
            setImage(images);
        }
    }
    // const handleOnDelete = (start, count = 1) => {
    //     console.log("deleting index " + start)
    //     images.splice(start, count);
    //     setImage(images)
    //     console.log(images)
    // }
    return (
        <>
            <div className="w-full flex flex-col md:flex-row md:justify-between my-6">
                <label className={`font-semibold flex items-center mr-2 md:mb-0 mb-1 ${labelWidth ? labelWidth : 'w-14'}`} htmlFor="">Image  <sup className='text-red-600'>*</sup></label>
                {
                    !uploading &&
                    <div onClick={handleOnClick} className="w-full bg-white h-8 rounded flex justify-end hover:bg-gray-50 border hover:border-blue-400 cursor-pointer">
                        <button className='px-2 py-1 text-sm   flex  items-center rounded-r text-white bg-blue-400 hover:bg-blue-500'>
                            Upload Image <BiImageAdd className='text-lg ml-1' />
                        </button>
                    </div>
                }
                {uploading &&
                    <div className="w-full bg-white h-8 rounded cursor-not-allowed flex justify-end border  ">
                        <button className='px-2 py-1 text-sm  flex  items-center rounded-r text-white bg-blue-400  cursor-not-allowed'>
                            Uploading..
                        </button>
                    </div>}
                <input type="file" onChange={uploadFile} id='upload-image' className='w-full focus:outline focus:outline-blue-400 p-1 rounded border-black' multiple={multiple?multiple:false} hidden />
            </div>
            {
                image && image.length > 0 &&
                <div className="w-full flex flex-wrap justify-start items-center  ">
                    {
                        image.map((image, index) => {
                            return <div key={index} className="flex justify-center items-center m-2  w-[150px] relative">
                                <img src={image} className='w-full rounded ' alt="" />
                                {/* <AiOutlineDelete onClick={() => { handleOnDelete(index) }} className='border border-gray-200 p-1  text-2xl absolute top-1/2 left-1/2 bg-white -ml-[12px] -mt-[12px] hover:bg-gray-600 hover:text-white cursor-pointer' /> */}
                            </div>
                        })
                    }
                </div>
            }


        </>
    )
}

export default UploadImage