import fs from 'fs'
import {join} from 'path'
import {Container, Box} from "@chakra-ui/react"
import matter from 'gray-matter'
import {marked} from 'marked'

const DetailPage = ({title, content}:  any) =>{
  return <Container p="1.2em 0">
    <Box textAlign="center" fontSize="2em">{title}</Box>
    <Box lineHeight="2em">
      {
      content && 
       <div dangerouslySetInnerHTML={{__html: marked(content)}}></div>
      //<div>{content}</div>
      }
    </Box>
  </Container>
}

export async function getStaticProps(context: any) {
  const {params} = context;
  const {slug} = params;
  const _slug = slug.replaceAll("-", "_") + ".md"
  const markdownFile = fs.readFileSync(join('posts',_slug))
  console.log(22,matter(markdownFile))
  const {content, data} = matter(markdownFile); 
  const {title, date} = data;
  return { props: {params, content, title, date} };
}

export async function getStaticPaths() {
  const files = fs.readdirSync(join('posts'));
  console.log({files})
  //const posts = files.map((file:any)=> {
  //  return file.replaceAll(" ", "-")
  //})
  const paths = files.map((file:any)=>({
    params: {slug: file}
  }))
  return {
    fallback: true,
    paths
  }
}
export default DetailPage;
