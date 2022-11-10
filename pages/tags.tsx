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
  margin-right: 3em;
  float: left;
  a {
    text-decoration: underline;
    font-size: 1.2em;
  }
`
  const {tagsCount} = props;
  const tags = Object.keys(tagsCount).sort((a, b)=> tagsCount[b] -tagsCount[a])
  return (<Container p="0">
    <Box  minH="400px" margin="auto" display="flex">
      <Flex w="32%" alignItems="center" justifyContent="right" fontWeight="bold" fontSize="3em" >
        <Box borderRight="2px solid #666" pr="0.5em">Tags</Box>
      </Flex>
      <Box w="68%" flexWrap="wrap" pl="2em">
        {tags.map((item,index)=> 
          <Box mr="2em" pt="3em" css={style} key={index}>
            <Link href={`/tags/${item}`} >{item}</Link> <span>{tagsCount[item]}</span>
          </Box>
        )}
      </Box>
    </Box>
  </Container>
  )
}

export default Algo
