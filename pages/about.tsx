import {Container} from "@chakra-ui/react"
import { getFileBySlug } from "@/libs/utils"

export async function getStaticProps() {
  const aboutData = getFileBySlug("pages","about.md")
  return {props: {aboutData}}
}
const AboutPage = ({aboutData}: any) => (
  <Container p="0">
    about {aboutData.content}
  </Container>
)
export default AboutPage
