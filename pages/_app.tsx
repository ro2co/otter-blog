import '../styles/global.css'
import {customTheme} from '../styles/theme'
import Head from "next/head"
import type { AppProps } from 'next/app'
import Layout from '@/layouts/index'
import { ChakraProvider} from '@chakra-ui/react'
import 'prismjs/themes/prism-okaidia.min.css';
//import 'prismjs/themes/prism-twilight.min.css';


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
