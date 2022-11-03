import {Container, Box, Input} from "@chakra-ui/react"
import Link from "next/link"
import { css, jsx} from '@emotion/react';
import {SearchIcon} from '@chakra-ui/icons'
import {useColorMode } from "@chakra-ui/react"
import Search from './search'

const style = css`
  a {
    margin-left: 1em;
    font-weight: 400;
  }
`
const btnStyle = css`
  cursor: pointer;
`
const searchStyle = css`
  width: 21em;
  border-radius: 0.5em;
  border: none;
  border-color:  whiteAlpha.400;
  transition: width 0.5s;
  &:focus {
    width: 25em;
  }
`

const Header =()=>{
  const {colorMode} = useColorMode()
  const searchBgColor= colorMode === "light" ? "#fff" : "#394150"
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
