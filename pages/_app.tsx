import '../styles/globals.css'
import type { AppProps } from 'next/app'
import NextNProgress from 'nextjs-progressbar';
import { useState, useEffect } from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import Main from '../components/Main';

export default function App({ Component, pageProps }: AppProps) {
  const [isBrowser, setIsBrowser] = useState(false)

  useEffect(() => {
    setIsBrowser(true)
  }, [])

  return (
    <>
      <NextNProgress />
      {isBrowser ? (
        <>
        <Main>
          <Component {...pageProps} />
        </Main>
        </>
      ) : (
        <CircularProgress />
      )}
    </>
  )
}
