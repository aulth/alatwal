import '../styles/globals.css'
import 'react-quill/dist/quill.snow.css'
import NextNProgress from 'nextjs-progressbar';
import AppContext from '../AppContext';
import { useState, useEffect } from 'react';
import Head from 'next/head';
export default function App({ Component, pageProps }) {
  const [adminSidebar, setAdminSidebar] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false)
  useEffect(() => {
    if(typeof window!=='undefined'){
      if(localStorage.getItem("alatwal-admin")){
        setIsAdmin(true);
      }
    }
  }, [])
  return <AppContext.Provider value={{ "adminSidebar": adminSidebar, "setAdminSidebar":setAdminSidebar, isAdmin:isAdmin, setIsAdmin:setIsAdmin }}>
    <NextNProgress color='rgb(37 99 235)' height={2} />
    <Component {...pageProps} />
    <Head>
    <link rel="icon" href="/favicon.ico" />
    </Head>
  </AppContext.Provider>


}
