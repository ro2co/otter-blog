import {Container, Box} from "@chakra-ui/react"

const Double = ({children}:  any) =>{
  return <Container p="1.2em 0" display="flex">
    <Box width="50%">left</Box>
    <Box width="50%">
        <div className="content">       
            {children}
        </div>
    </Box>

  </Container>
}
export default Double
