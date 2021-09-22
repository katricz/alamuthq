import React from 'react'
import Head from 'next/head'
import 'bootstrap/dist/css/bootstrap.css'
import '../src/krcg.css'
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

export const getStaticProps = () => {
  const response = fetch('https://static.krcg.org/data/vtes.json');
  const data = response.json();

  return {
    props: {
      krcg: data,
    },
    revalidate: 172800 // 2 dias em segundos
  }
}