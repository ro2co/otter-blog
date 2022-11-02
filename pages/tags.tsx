import {Container, Box, Flex} from "@chakra-ui/react"
import Link from "next/link"
import {css} from "@emotion/react"
import {getAllTags} from "../utils/files"

export async function getStaticProps() {
  const tagsCount = getAllTags("posts")
  return {props: {tagsCount}}
}

const Algo = (props: any) => {
  const style = `
  a {
    text-decoration: underline;
    font-size: 1.2em;
  }
`
  const {tagsCount} = props;
  const tags = Object.keys(tagsCount).sort((a, b)=> tagsCount[b] -tagsCount[a])
  return (<Container p="0">
    <Box w="50%" minH="400px" margin="auto" display="flex">
      <Flex w="32%" alignItems="center" fontWeight="bold" fontSize="3em" >
        <Box borderRight="2px solid #666" pr="0.5em">Tags</Box>
      </Flex>
      <Flex w="68%">
        {tags.map((item,index)=> 
          <Box mr="2em" pt="3em" css={style} key={index}>
            <Link href={`/tags/${item}`} >{item}</Link> <span>{tagsCount[item]}</span>
          </Box>
        )}
      </Flex>
    </Box>
  </Container>
  )
}

export default Algo
