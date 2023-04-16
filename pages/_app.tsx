import '../styles/global.css'
import {customTheme} from '../styles/theme'
import { ReactNode } from 'react';
import Head from "next/head"
import { NextPage } from "next";
import Layout from '@/layouts/index'
import { ChakraProvider} from '@chakra-ui/react'
import 'prismjs/themes/prism-okaidia.min.css';
//import 'prismjs/themes/prism-twilight.min.css';


type Page<P = {}> = NextPage<P> & {
  getLayout?: (page: ReactNode) => ReactNode;
};

type Props = AppProps & {
  Component: Page;
};

function MyApp({ Component, pageProps }: Props) {
  const getLayout = Component.getLayout || ((page: ReactNode) => page)
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
