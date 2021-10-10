import React from 'react'
import Head from 'next/head'
import 'bootstrap/dist/css/bootstrap.css'
import '../styles/globals.css'
import Menu from '../components/Menu'

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>AlamutHQ</title>
      </Head>
      <Menu>
        <Component {...pageProps} />
        AlamutHQ Logo made by: DonHawK - 3008dmalves@ksgmail.com
      </Menu>
    </>
  )
}