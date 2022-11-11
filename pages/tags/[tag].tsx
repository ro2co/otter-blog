import { Container, Tag, Box } from "@chakra-ui/react"
import ArticleItem from "@/components/article-item"
import {getAllTags, getAllFiles} from "@/libs/utils"

export async function getStaticPaths() {
  const tags = getAllTags("posts")
  return {
    paths: Object.keys(tags).map((tag) => ({
      params: {
        tag,
      },
    })),
    fallback: false,
  }
}

export async function getStaticProps({params} :any) {
  console.log({params})
  const temp:any = [];
  const frontmatter = getAllFiles("posts")
  frontmatter.forEach(post=>{
    console.log(23, post.tags);
    post.tags?.split(",").map((tag:string)=> {
      if(tag === params.tag) {
        temp.push(post)
      }
    })
  })
  console.log(29, temp);
  return { props: {metaPosts: temp}}
  //const allPosts = await getAllFiles("posts")
}

const TagPage = (props:any) => {
  return(
    <Container display="flex" flexWrap={["nowrap", "wrap", "wrap"]} justifyContent="space-between" p="2em 0">
        <Box w={["100%","100%", "100%", "68%"]} display="flex" flexWrap="wrap" justifyContent="space-between" padding={["1em", "1.21em", "0em"]}>
          <Box className="title" pb="1em"  w="100%">Articles</Box>
            {
              props.metaPosts?.map ((item:any, index: number) => {
                return <ArticleItem item={item} key={index} />
              })
            }
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
  )
}

export default TagPage
