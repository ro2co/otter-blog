import {Container, Box, Input} from "@chakra-ui/react"
import Link from "next/link"
import { css, jsx} from '@emotion/react';
import {SearchIcon} from '@chakra-ui/icons'

const style = css`
  a {
    margin-left: 1em;
    font-weight: 400;
  }
`
const btnStyle = css`
  cursor: pointer;
`

const Header =()=>{
  return (
    <Box  mb="2em">
      <Container p="1.5em 0"  borderBottom="1px solid #333">
        <Box display="flex" justifyContent="space-between">
          <Box fontSize="1.4em" fontWeight="bold">
            <Link href="/">
              <a>
                <span className="brace">{"["}</span> 
                Code<span style={{color: "red", fontWeight:"normal"}}>2</span>Road 
                <span className="brace">{"]"}</span>
              </a> 
            </Link>
            <Box display="inline" width="300px" fontSize="0.8em" pl="2em" css={style}>
              <Link href="/blog"> 博客 </Link>
              <Link href="/interactive"> 交互 </Link>
              <Link href="/archives"> 归档 </Link>
              <Link href="/about"> 关于</Link>
            </Box>
          </Box>
          <Box pt=".3em">
            <Input size="sm" width="20em" borderRadius="0.5em" borderColor="whiteAlpha.400"/>
            <SearchIcon css={btnStyle} ml="1em"/>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}
export default Header;
