import { NextPage } from 'next'
import { AppProps } from 'next/app'

import Layout from '../components/layout/layout'

import '../styles/globals.css'

const MyApp: NextPage<AppProps> = ({ Component, pageProps }) => {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
