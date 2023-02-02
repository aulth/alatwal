import React, { useState, useEffect } from 'react'
import { BiImageAdd } from 'react-icons/bi'
import { AiOutlineDelete } from 'react-icons/ai'
import { IKContext, IKUpload } from 'imagekitio-react';
const publicKey = "public_92LmaGdulaemcYl7X2YaL95QGnU=";
const urlEndpoint = "https://ik.imagekit.io/lgju5gzfspd/";
const authenticationEndpoint = "https://www.alatwal.com/api/imagekit/get";
import PDFObject from 'pdfobject'


const UploadPassport = ({ setPassport}) => {
    const onError = (err) => {
        console.log(err);
    };
    const savePassport = (url) =>{

    }
    const onSuccess = async (res) => {
        setPassport(res.url);
        if(typeof window!=='undefined'){
            document.querySelector('#passport-wrap').classList.remove('hidden')
            document.querySelector('#passport-wrap').classList.add('flex')
        }
        PDFObject.embed(res.url, `#passport`);
    }
    return (
        <>
            <div className="w-full flex flex-col md:flex-row md:justify-between my-6">
                <IKContext publicKey={publicKey} urlEndpoint={urlEndpoint} authenticationEndpoint={authenticationEndpoint}>
                    <IKUpload onSuccess={onSuccess} onError={onError} />
                </IKContext>
            </div>
                <div id='passport-wrap' className="w-full hidden flex-wrap justify-start items-center  ">
                    <div id="passport" className='  m-2 h-20 w-20'></div>
                </div>


        </>
    )
}

export default UploadPassport