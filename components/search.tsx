import {useState} from "react"
import {Box, Input} from "@chakra-ui/react"
import { SearchIcon } from "@chakra-ui/icons"
import {css} from "@emotion/react"
import {useColorMode } from "@chakra-ui/react"
import searchData from '../search.json'


const btnStyle = css`
  cursor: pointer;
`
const searchStyle = css`
  border-radius: 0.5em;
  transition: width 0.6s cubic-bezier(.1,.7,.1,1), height 0.6s  cubic-bezier(.1,.7,.1,1);
  & .input-box {
    font-size: 16px;
    border: none;
    outline: none;
    border-radius: 2px;
    color: #333;
  }
  position: relative;
  & .result {
    background: rgba(255,255,255,0.9);
    position: absolute;
    right: 0;
    transition: width 0.6s cubic-bezier(.1,.7,.1,1), height 0.6s cubic-bezier(.1,.7,.1,1), opacity 0.6s linear;
  }
`

const noResultStyle = css`
  height: 0px;
  transition: height 0s;
`

const Search = () =>{
  const [filterRows, setFilterRows] = useState()
  const [isOpen, setOpen] = useState<boolean>(false)
  const [inputValue, setInputValue] = useState<string>("")
  const handleChange = (e:any)=>{
    setInputValue(e.target.value)
    console.log(e.target.value)
  }
  const handleFocus = () =>{
      setOpen(true)
  }
  const handleBlur = () => {
    setOpen(false)
    setInputValue("")
  }
  const handleMouseOver = (e: any)=>{
    console.log("click")
     e.preventDefault();
  }
  const {colorMode} = useColorMode()
  const searchBgColor= colorMode === "light" ? "#fff" : "#394150"
  return (
    <Box pt=".3em" css={searchStyle} width={isOpen ? "26em": "16em"}>
      <Box display="flex" alignItems="right" justifyContent="right">
        <Input 
          size="sm" 
          className="input-box"
          bg={isOpen ? "#fff":searchBgColor} 
          value={inputValue}
          _focus={{
            boxShadow: "none"
          }}
          onFocus={handleFocus} onBlur={handleBlur} onChange={handleChange} 
        />
      </Box>
      <Box className="result" opacity={isOpen ? 1 : 0} height={isOpen ? '3em': "0"} width={isOpen ? "26em": "16em"}>
        <Box maxHeight="400px" bg="pink" display={isOpen ? "block": "none"} onMouseDown={handleMouseOver}> 
        </Box>
      </Box>
    </Box>
  )
}
export default Search
