import React, {useState, useEffect} from 'react'
import { useRouter } from 'next/router'
import Navbar from '../../components/Navbar'
import Tourcard from '../../components/Tourcard'
import Tourpage from '../../components/Tourpage'
import Footer from '../../components/Footer'
const DynamicPage = ({title}) => {
    const [pageData, setPageData] = useState({title:'', overview:'', status:''})
    const router = useRouter();
    const fetchPage = async ()=>{
        const response = await fetch(`/api/cms/fetch/${title}`);
        const responseData = await response.json();
        console.log(responseData)
        if(responseData.success){
            if(typeof window!=='undefined'){
            }
            document.querySelector('#content-box').innerHTML = responseData.cms.overview;
            setPageData({title:responseData.cms.title, overview:responseData.cms.overview, status:responseData.cms.status, id:responseData.cms._id})
        }else{
            console.log(responseData.msg)
        }
    }
    useEffect(() => {
        fetchPage();
    }, [router])
  return (
    <>
      <Navbar />
      <div className="w-full h-56 overflow-hidden relative">
        {/* <img src="https://source.unsplash.com/random/?contact" className='object-cover object-center w-full ' alt="" /> */}
        <div className="w-full absolute top-0 h-56 flex justify-center items-center bg-gradient-to-r from-cyan-500 to-blue-500 ">
        <h3 className="md:text-5xl text-3xl font-bold font-[helvetica] text-white drop-shadow  text-center uppercase">{pageData.title?pageData.title:"This page does not exist"}</h3>
        </div>
      </div>
      <div className="w-full flex  m-auto md:p-5 p-2 box-border">
        <div id='content-box' className="w-full rounded border border-gray-400 p-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam nostrum recusandae explicabo nulla est accusamus quis non, quasi qui cupiditate reiciendis iste debitis vero earum quia nemo alias vitae aperiam?
        </div>
      </div>
      <Footer/>
    </>
  )
}

export default DynamicPage
export async function getServerSideProps(context) {
  const {slug} = context.params;
  console.log(slug)
  return {
    props: {
      title:slug
    }, // will be passed to the page component as props
  }
}