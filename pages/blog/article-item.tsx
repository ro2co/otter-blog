import {useColorMode, Tag, Box } from "@chakra-ui/react"
import Link from "next/link"

const ArticleItem = ({item, index}: {item: any, index: number}) =>{

  const {colorMode} = useColorMode()
  const tagBgColor = colorMode === "light" ? "#FFBD2F" : "#54a23d"
  return (
    <Box w={["100%","46%"]} key={index} mb="3em">
      <Box>
        <Box display="flex" justifyContent="space-between">
          <Box color="#68757B">{item.date}</Box>
          <Tag bg={tagBgColor}>{item.catagory}</Tag>
        </Box>
      </Box>
      <Box fontSize="1.6em" fontWeight="bold">
        <Link href={`/blog/${item.slug}`}>{item.title}</Link> 
      </Box>
      <Box lineHeight="2em">
        {item.expert}
      </Box>
    </Box>
  )
}
export default ArticleItem;
