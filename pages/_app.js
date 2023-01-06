import '../styles/globals.css'
import 'react-quill/dist/quill.snow.css'
import NextNProgress from 'nextjs-progressbar';
export default function App({ Component, pageProps }) {
  return <>
    <NextNProgress color='rgb(37 99 235)' height={2} />
    <Component {...pageProps} />
  </>


}
