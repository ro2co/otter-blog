import '../styles/global.css'
import {customTheme} from '../styles/theme'
import Head from "next/head"
import type { AppProps } from 'next/app'
import Layout from '../components/layout'
import { ChakraProvider} from '@chakra-ui/react'
import 'highlight.js/styles/monokai.css';


function MyApp({ Component, pageProps }: AppProps) {
  const getLayout = Component.getLayout || ((page) => page)
  return <>
    <Head>
      <title>Code2Road</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>
    <ChakraProvider theme={customTheme}>
      <Layout>
        {/*<Component {...pageProps} />*/}
        {getLayout(<Component {...pageProps} />)}
      </Layout>
    </ChakraProvider>
    </>
}

export default MyApp
