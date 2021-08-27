import React from 'react'
import Head from 'next/head'
import 'bootstrap/dist/css/bootstrap.css'

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>AlamutHQ</title>
      </Head>
      <Component {...pageProps} />
    </>
  )
}
