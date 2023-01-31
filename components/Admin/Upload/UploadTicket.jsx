import React, { useState, useEffect } from 'react'
import { BiImageAdd } from 'react-icons/bi'
import { AiOutlineDelete } from 'react-icons/ai'
import PDFObject from 'pdfobject'
import { IoTicketOutline } from 'react-icons/io5'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IKContext, IKUpload } from 'imagekitio-react';
const publicKey = "public_92LmaGdulaemcYl7X2YaL95QGnU=";
const urlEndpoint = "https://ik.imagekit.io/lgju5gzfspd/";
const authenticationEndpoint = "http://localhost:3000/api/imagekit/get";
const UploadTicket = ({ labelWidth, label, type, date, bookingNumber, ticketFromDb, bookedTourId, bookingDetails, email, name }) => {
    const [ticket, setTicket] = useState('')
    const saveTicketToDb = async (ticket) => {
        const response = await fetch('/api/booking/ticket/upload', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ ticket, type, bookingNumber, bookedTourId, authtoken: localStorage.getItem('alatwal-admin') })
        })
        let responseData = await response.json();
        console.log(responseData)
        if (responseData.success) {
            toast.success(responseData.msg);
            sendTicketToClient(ticket)
            PDFObject.embed(ticket, `#ticket-${bookedTourId}`);

        } else {
            toast.error(responseData.msg)
        }
    }
    const sendTicketToClient = async (ticket)=>{
        let response = await fetch('/api/email/sendticket',{
            method:'POST',
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify({ email, ticket, bookingDetails, bookingNumber, name, type:type, date:date})
        })
        let responseData = await response.json();
        if(responseData.success){
            toast.success(responseData.msg);
        }else{
            toast.error(responseData.msg)
        }
    }
    const onError = (err) => {
        console.log(err);
    };
    const onSuccess = async (res) => {
        setTicket(res.url)
        saveTicketToDb(res.url)
    }
    useEffect(() => {
        setTicket(ticketFromDb)
    }, [])
   useEffect(() => {
    PDFObject.embed(ticket?ticket:'', `#ticket-${bookedTourId}`);
   }, [ticket])
   
    return (
        <>
            <ToastContainer />
            <div className="w-full flex flex-col md:flex-row md:justify-start my-6">
                <label className={`font-semibold flex items-center mr-2   md:mb-0 mb-1 ${labelWidth ? labelWidth : 'w-14'}`} htmlFor="">{label}</label>
                {/* <input type="file"  onChange={uploadFile} id='upload-ticket' className='w-full focus:outline focus:outline-blue-400 p-1 rounded border-black' multiple={false}  /> */}
                <div className='w-full '>
                <IKContext publicKey={publicKey} urlEndpoint={urlEndpoint} authenticationEndpoint={authenticationEndpoint}>
                    <IKUpload onSuccess={onSuccess} onError={onError} />
                </IKContext>
                </div>
            </div>
            {ticket && 
                <div className="w-full flex flex-wrap justify-start items-center  ">
                    <div className='h-20 w-20 bg-gray-300' id={`ticket-${bookedTourId}`}>

                    </div>
                </div>
            }


        </>
    )
}

export default UploadTicket