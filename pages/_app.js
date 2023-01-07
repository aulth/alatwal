import '../styles/globals.css'
import 'react-quill/dist/quill.snow.css'
import NextNProgress from 'nextjs-progressbar';
import AppContext from '../AppContext';
import { useState } from 'react';
export default function App({ Component, pageProps }) {
  const [adminSidebar, setAdminSidebar] = useState(false);
  return <AppContext.Provider value={{ "adminSidebar": adminSidebar, "setAdminSidebar":setAdminSidebar }}>
    <NextNProgress color='rgb(37 99 235)' height={2} />
    <Component {...pageProps} />
  </AppContext.Provider>


}
