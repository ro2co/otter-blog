import {useColorMode, Tag, Box } from "@chakra-ui/react"
import Link from "next/link"
import {ListItemProps} from "@/components/types"
const ArticleItem = ({item}: {item: ListItemProps}) =>{
  const {colorMode} = useColorMode()
  const tagBgColor = colorMode === "light" ? "#FFBD2F" : "#54a23d"
  return (
    <Box w={["100%","46%"]} mb="3em">
      <Box>
        <Box display="flex" justifyContent="space-between" pb=".8em">
          <Box color="#68757B">{item.date}</Box>
          <Tag bg={tagBgColor} color="#fff">{item.tags?.split(",")[0]}</Tag>
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
