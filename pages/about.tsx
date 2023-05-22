import {Container, Box, Flex} from "@chakra-ui/react"
import { getFileBySlug } from "@/libs/utils"

export async function getStaticProps() {
  const aboutData = getFileBySlug("pages","about.md")
  return {props: {aboutData}}
}
const AboutPage = ({aboutData}: any) => (
  <Container p="0" lineHeight="2.4em">
    <Flex minH="300px">
      <Flex w="32%" alignItems="center" justifyContent="right" fontWeight="bold" fontSize="3em" >
        <Box borderRight="2px solid #666" pr="0.5em">About</Box>
      </Flex>
      <Box w="68%" flexWrap="wrap" pl="2em">
        {aboutData.content}
      </Box>
    </Flex>
  </Container>
)
export default AboutPage
