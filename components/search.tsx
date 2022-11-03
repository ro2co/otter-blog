import {useState} from "react"
import {Box, Input} from "@chakra-ui/react"
import { SearchIcon } from "@chakra-ui/icons"
import {css} from "@emotion/react"
import {useColorMode } from "@chakra-ui/react"
import searchData from '../search.json'
import {setTimeout} from "timers"

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
  transition: right 0s, width 0s;
  &:focus {
    width: 30em;
    transition: right 1s, width 0.5s;
  }
`
const resultStyle = css`
  width: 30em;
  height: 120px;
  background: #fff;
  transition: height 0.5s;
  position: absolute;
`
const noResultStyle = css`
  height: 0px;
  transition: height 0s;
`

const Search = () =>{
  const [filterRows, setFilterRows] = useState()
  const [isOpen, setOpen] = useState<boolean>(false)
  const handleChange = (e:any)=>{
    console.log(e.target.value)
  }
  const handleFocus = () =>{
    setTimeout(()=>{
      setOpen(true)
    }, 1000)
  }
  const handleBlur = () => {
    setOpen(false)
  }
  const {colorMode} = useColorMode()
  const searchBgColor= colorMode === "light" ? "#fff" : "#394150"
  return (
    <Box pt=".3em">
      <Box display="flex" alignItems="right" justifyContent="right">
        <Input bg={searchBgColor} css={searchStyle} onFocus={handleFocus} onBlur={handleBlur} onChange={handleChange}/>
      </Box>
      <Box css={ isOpen ? resultStyle : noResultStyle} ></Box>
    </Box>
  )
}
export default Search
