import React from 'react'
import Head from 'next/head'
import 'bootstrap/dist/css/bootstrap.css'
import '../styles/globals.css'
import Menu from '../components/Menu'
import allCards from '../moch/krcgCryptFull.json'

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

export const getStaticProps = async () => {
  const krcg = allCards
  const cryptCards = krcg.filter((card) =>
    (card.types.includes('Vampire') || card.types.includes('Imbued')))
  const libraryCards = krcg.filter((card) =>
    !(card.types.includes('Vampire') || card.types.includes('Imbued')))

  return {
    props: {
      allCards: krcg,
      cryptCards: cryptCards,
      libraryCards: libraryCards
    }
  }
}