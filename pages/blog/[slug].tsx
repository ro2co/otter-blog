import fs from 'fs'
import path from 'path'
import {Container, Box} from "@chakra-ui/react"
import { serialize } from 'next-mdx-remote/serialize'
import rehypePrism from '@mapbox/rehype-prism'
import remarkToc from 'remark-toc'
import rehypeSlug from 'rehype-slug'
import Giscus from '@giscus/react';


import {getFiles,getFileBySlug} from '@/libs/utils'

import {MDXLayout} from '@/components/mdx'

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
      <Box w="68%">
        <Giscus
          id="comments"
          repo="ro2co/road2code-blog"
          repoId="R_kgDOIgXjjQ"
          category="Announcements"
          categoryId="DIC_kwDOIgXjjc4CSxEj"
          mapping="pathname"
          term="Welcome to @giscus/react component!"
          reactionsEnabled="1"
          emitMetadata="0"
          inputPosition="top"
          theme="transparent_dark"
          lang="zh-CN"
          loading="lazy"
        />

      </Box>
    </Box>
  </Container>
}

export async function getStaticProps(context: any) {
  const {params} = context;
  const {slug} = params;
  const _slug = slug.replaceAll("-", "_") 
  const suffix = _slug.split(".").pop() === 'md' ? "" : ".md";
  
  const {data,content} = getFileBySlug('posts',slug+suffix)
  console.log({data})
  const mdxSource = await serialize(content,{
    mdxOptions: {
      remarkPlugins: [remarkToc],
      rehypePlugins: [rehypeSlug, rehypePrism]
    }
  })
  console.log({mdxSource})

  const {title, date, layout="single"} = data;
  return { props: {params, content: mdxSource, title, date, layout} };
}

export async function getStaticPaths() {
  const files = getFiles("posts")
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
