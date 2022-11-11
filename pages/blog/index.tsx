import { Container, Tag, Box,Button } from "@chakra-ui/react"
import fs from 'fs'
import {join} from 'path'
import matter from 'gray-matter'
import ArticleItem from "@/components/article-item"
import usePagination from "@/libs/hooks"
import {getFiles} from "@/libs/utils"

const itemsPerPage = 6;
export async function getStaticProps() {
  const files = getFiles('posts');
  const posts = files.map((filename)=> {
    const markdownWithMeta = fs.readFileSync(join("data","posts",filename), 'utf-8')
    console.log({markdownWithMeta})
    const {data: metaPosts} = matter(markdownWithMeta)
    metaPosts.slug = metaPosts.title.replaceAll(" ", "-")
    metaPosts._date = new Date(metaPosts.date).getTime()
    return metaPosts
  })
  return { props: { metaPosts: posts.sort((a, b)=> a._date - b._date)} };
}
function BlogList({data}: any) {
  const {currentPage, currentData, handlePrev, handleNext} = usePagination(data, itemsPerPage)
  return <>
      {
        currentData().map ((item:any, index: number) => {
          return <ArticleItem item={item} key={index} />
        })
      }
      <Box width="100%">
        <Button onClick={handlePrev}>前一页 </Button>
        <Button onClick={handleNext}>后一页 </Button>
      </Box>
  </>
}

const BlogPage = (props: any) =>{
  return (
    <Box minH="850px">
      <Container display="flex" flexWrap={["nowrap", "wrap", "wrap"]} justifyContent="space-between" p="2em 0">
        <Box w={["100%","100%", "100%", "68%"]} display="flex" flexWrap="wrap" justifyContent="space-between" padding={["1em", "1.21em", "0em"]}>
          <Box className="title" pb="1em"  w="100%">Articles</Box>
          <BlogList data={props.metaPosts}/>
        </Box>
        <Box w={["100%", "100%", "26%"]} lineHeight="2.2em">
          <Box pb="1em" className="title">Tags</Box>
          <Tag mr=".5em">vim</Tag>
          <Tag mr=".5em">Nodejs</Tag>
          <Tag mr=".5em">Nodejs</Tag>
          <Tag mr=".5em">Nodejs</Tag>
          <Tag mr=".5em">React</Tag>
          <Tag>Redux</Tag>
        </Box>
      </Container>
    </Box>
  )
}
export default BlogPage;
