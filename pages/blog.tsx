import { Container, Tag, Box } from "@chakra-ui/react"
import fs from 'fs'
import Link from 'next/link'
import {join} from 'path'
import matter from 'gray-matter'

export async function getStaticProps() {
  const files = fs.readdirSync(join('posts'));
  const posts = files.map((filename)=> {
    const markdownWithMeta = fs.readFileSync(join("posts", filename), 'utf-8')
    const {data: metaPosts} = matter(markdownWithMeta)
    metaPosts.slug = metaPosts.title.replaceAll(" ", "-")
    return metaPosts;
  })
  console.log(posts)
  return { props: { metaPosts: posts} };
}

const BlogPage = (props: any) =>{
  return (
    <Box minH="850px">
      <Container display="flex" justifyContent="space-between" p="2em 0">
        <Box w="68%" display="flex" flexWrap="wrap" justifyContent="space-between">
          <Box className="title" pb="1em"  w="100%">Articles</Box>
        {
          props.metaPosts.map ((item:any, index: number) => {
            return (
               <Box w="46%" key={index}>
              <Box >
                <Box display="flex" justifyContent="space-between">
                  <Box>{item.date}</Box>
                  <Tag>{item.catagory}</Tag>
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
          })
        }
        </Box>
        <Box w="26%" lineHeight="2.2em">
          <Box pb="1em" className="title">All tags</Box>
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
