import '../styles/globals.css'
import type { AppProps } from 'next/app'
import AlertContextProvider from '../context/AlertContextProvider'
import SessionContextProvider from '../context/SessionContextProvider'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AlertContextProvider>
      <SessionContextProvider>
        <Component {...pageProps} />
      </SessionContextProvider>
    </AlertContextProvider>
  )
}

export default MyApp