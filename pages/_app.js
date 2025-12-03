import React from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import 'bootstrap/dist/css/bootstrap.css'
import '../styles/globals.css'
import Menu from '../components/Menu'
import { CardsProvider } from '../contexts/CardsContext'

/**
 * Main App component
 * @param {Object} props
 * @param {React.ComponentType} props.Component - The active page component
 * @param {Object} props.pageProps - Props for the page component
 */
export default function MyApp({ Component, pageProps }) {
  return (
    <CardsProvider>
      <Head>
        <title>AlamutHQ</title>
      </Head>
      <Menu>
        <Component {...pageProps} />
      </Menu>
    </CardsProvider>
  )
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
}
