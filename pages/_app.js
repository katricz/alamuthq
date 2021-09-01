import React from 'react'
import Head from 'next/head'
import 'bootstrap/dist/css/bootstrap.css'
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
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
