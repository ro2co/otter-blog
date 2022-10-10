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
const searchStyle = css`
  width: 21em;
  border-radius: 0.5em;
  border: none;
  border-color:  whiteAlpha.400;
  transition: width 0.5s;
  background: #394150 ;
  &:focus {
    width: 25em;
  }
`

const Header =()=>{
  return (
    <Box  mb="2em">
      <Container p="1.5em 0" borderBottomWidth="1px" borderBottomColor="whiteAlpha.200">
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
              <Link href="/blog"> 博客 </Link>
              <Link href="/archives"> 归档 </Link>
              <Link href="/playground"> playground </Link>
              <Link href="/about"> 关于</Link>
            </Box>
          </Box>
          <Box pt=".3em">
            <Input size="sm" css={searchStyle}/>
            <SearchIcon css={btnStyle} ml="1em"/>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}
export default Header;
