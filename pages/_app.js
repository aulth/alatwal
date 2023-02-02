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
    if (typeof window !== 'undefined') {
      if (localStorage.getItem("alatwal-admin")) {
        setIsAdmin(true);
      }
      var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
      (function () {
        var s1 = document.createElement("script"), s0 = document.getElementsByTagName("script")[0];
        s1.async = true;
        s1.src = 'https://embed.tawk.to/63db7ddcc2f1ac1e2030f9b9/1go8m7b4a';
        s1.charset = 'UTF-8';
        s1.setAttribute('crossorigin', '*');
        s0.parentNode.insertBefore(s1, s0);
      })();
    }
  }, [])
  return <AppContext.Provider value={{ "adminSidebar": adminSidebar, "setAdminSidebar": setAdminSidebar, isAdmin: isAdmin, setIsAdmin: setIsAdmin }}>
    <NextNProgress color='rgb(37 99 235)' height={2} />
    <Component {...pageProps} />
    <Head>
      <link rel="icon" href="/favicon.ico" />
    </Head>
  </AppContext.Provider>


}
