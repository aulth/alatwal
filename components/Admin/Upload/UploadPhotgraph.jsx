import React, { useState, useEffect } from 'react'
import { BiImageAdd } from 'react-icons/bi'
import { AiOutlineDelete } from 'react-icons/ai'
import { IKContext, IKUpload } from 'imagekitio-react';
const publicKey = "public_92LmaGdulaemcYl7X2YaL95QGnU=";
const urlEndpoint = "https://ik.imagekit.io/lgju5gzfspd/";
const authenticationEndpoint = "https://www.alatwal.com/api/imagekit/get";

const UploadPassport = ({ setPhotograph }) => {
    const onError = (err) => {
        console.log(err);
    };
    const onSuccess = async (res) => {
        setPhotograph(res.url);
        if (typeof window !== 'undefined') {
            document.querySelector('#photograph-wrap').classList.remove('hidden')
            document.querySelector('#photograph-wrap').classList.add('flex')
            document.querySelector('#photograph').setAttribute('src', res.url);
        }
    }

    return (
        <>
            <div className="w-full flex flex-col md:flex-row md:justify-between my-6">
                <IKContext publicKey={publicKey} urlEndpoint={urlEndpoint} authenticationEndpoint={authenticationEndpoint}>
                    <IKUpload onSuccess={onSuccess} onError={onError} />
                </IKContext>
            </div>
            <div id="photograph-wrap" className="w-full hidden flex-wrap justify-start items-center  ">
                <img id="photograph" src='' alt="photograoh" className='  m-2 h-20 w-20'></img>
            </div>
        </>
    )
}

export default UploadPassport