import {Container, Box} from "@chakra-ui/react"

const Single = ({children}:  any) =>{

  return <Container p="1.2em 0">
    <Box lineHeight="2em">
        <div className="single-content">       
            {children}
        </div>
    </Box>
  </Container>
}
export default Single;
