import '../styles/global.css'
import {customTheme} from '../styles/theme'
import Head from "next/head"
import type { AppProps } from 'next/app'
import Layout from '../common/layout'
import { ChakraProvider} from '@chakra-ui/react'


function MyApp({ Component, pageProps }: AppProps) {
  return <>
    <Head>
      <title>Code2Road</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>
    <ChakraProvider theme={customTheme}>
      <Layout>
          <Component {...pageProps} />
          
      </Layout>
      
    </ChakraProvider>
    </>
}

export default MyApp
