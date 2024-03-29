import {Container, Box, useColorMode} from "@chakra-ui/react"
import {SunIcon, MoonIcon} from "@chakra-ui/icons"

const Footer =()=>{
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Container 
      height="4em" 
      lineHeight="4em" 
      borderTopWidth="1px" 
      borderTopColor="whiteAlpha.100"
      display="flex"
      justifyContent="space-between"
      p="0"
    >
      <Box>
        code2road.me All Right reserved @2019
      </Box>
      <Box>
        <button onClick={toggleColorMode}>
        {
          colorMode==="dark" ? <SunIcon /> : <MoonIcon /> 
        }</button>
      </Box>
    </Container>
  )
}
export default Footer;
