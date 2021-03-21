import { NextPage } from 'next'
import { AppProps } from 'next/app'
import Head from 'next/head'

import Layout from '../components/layout/layout'

import '../styles/globals.css'

const MyApp: NextPage<AppProps> = ({ Component, pageProps }) => {
  return (
    <Layout>
      <Head>
        <title>NextJS Events</title>
        <meta name='description' content='NextJS Events' />
        <meta name='viewport' content='initial-scale=1.0, with=device-width' />
      </Head>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
