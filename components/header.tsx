import {Container, Box, Input} from "@chakra-ui/react"
import Link from "next/link"
import { css, jsx} from '@emotion/react';
import {useColorMode } from "@chakra-ui/react"
import Search from './search'

const style = css`
  a {
    margin-left: 1em;
    font-weight: 400;
  }
`

const Header =()=>{
  const {colorMode} = useColorMode()
  return (
    <Box  mb="2em">
      <Container p="1.5em 0">
        <Box display="flex" justifyContent="space-between">
          <Box fontSize="1.4em" fontWeight="bold">
            <Link href="/">
              <a>
                <span className="brace">{"{ "}</span> 
                Code<span style={{color: "red", fontWeight:"normal"}}>2</span>Road 
                <span className="brace">{" }"}</span>
              </a> 
            </Link>
            <Box display="inline" width="300px" fontSize="0.8em" pl="2em" css={style}>
              <Link href="/blog"> Blog </Link>
              <Link href="/tags"> Tags </Link>
              <Link href="/about"> About</Link>
            </Box>
          </Box>
          <Search />
        </Box>
      </Container>
    </Box>
  )
}
export default Header;
