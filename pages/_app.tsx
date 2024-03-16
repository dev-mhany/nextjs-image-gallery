import type { AppProps } from 'next/app'
import '../styles/index.css'
import Script from 'next/script'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
  <div>
       <Script src="https://www.googletagmanager.com/gtag/js?id=G-66CRK9E2GM" />
       <Script id="google-analytics">
         {`
           window.dataLayer = window.dataLayer || [];
           function gtag(){dataLayer.push(arguments);}
           gtag('js', new Date());
  
           gtag('config', 'G-66CRK9E2GM');
         `}
       </Script>
    <Component {...pageProps} />
  </div>)
}
