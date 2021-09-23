import React from 'react'
import Head from 'next/head'
import 'bootstrap/dist/css/bootstrap.css'
import '../src/krcg.css'
import allCards from '../moch/krcgCrypt.json'
import Menu from '../components/Menu'

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>AlamutHQ</title>
      </Head>
      <Menu />
      <Component {...pageProps} />
    </>
  )
}