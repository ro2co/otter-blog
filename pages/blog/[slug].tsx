import fs from 'fs'
import path from 'path'
import {Container, Box} from "@chakra-ui/react"
import { serialize } from 'next-mdx-remote/serialize'

import {getFileBySlug} from '../../utils/files'
import {MDXLayout} from '../../components/mdx'

const DetailPage = ({title,date,layout, content}:  any) =>{

  return <Container p="1.2em 0">
    <Box textAlign="center" fontSize="2em">{title}</Box>
    <Box>{date}</Box>
    <Box lineHeight="2em">
      {
      content && 
        <div className="content">       
          <MDXLayout content={content} layout={layout} />
        </div>
      }
    </Box>
  </Container>
}

export async function getStaticProps(context: any) {
  const {params} = context;
  const {slug} = params;
  const _slug = slug.replaceAll("-", "_") 
  const suffix = _slug.split(".").pop() === 'md' ? "" : ".md";
  
  const {data,content} = getFileBySlug('posts',slug+suffix)
  const mdxSource = await serialize(content)

  const {title, date, layout} = data;
  return { props: {params, content: mdxSource, title, date, layout} };
}

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join('posts'));
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
