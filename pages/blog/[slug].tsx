import fs from 'fs'
import path from 'path'
import {Container, Box} from "@chakra-ui/react"
import { useEffect } from 'react'
import matter from 'gray-matter'
import {marked} from 'marked'
import MarkNav from 'markdown-navbar';
import hljs from 'highlight.js'

const DetailPage = ({title, content}:  any) =>{

  useEffect(()=>{
    marked.setOptions({
      langPrefix: "hljs language-",
      highlight: function(code) {
        return hljs.highlightAuto(code, ["html", "javascript"]).value;
      }
    })
  },[]);
  return <Container p="1.2em 0">
    <Box textAlign="center" fontSize="2em">{title}</Box>
    <Box lineHeight="2em">
      {
      content && 
       <div dangerouslySetInnerHTML={{__html: marked(content)}}></div>
      //<div>{content}</div>
      }
      <div>
          <MarkNav
          className="article-menu"
          source={content}
          headingTopOffset={80}
        />
      </div>
    </Box>
  </Container>
}

export async function getStaticProps(context: any) {
  const {params} = context;
  const {slug} = params;
  const _slug = slug.replaceAll("-", "_") 
  const configDirectory = path.resolve(process.cwd(), "posts");
  const suffix = _slug.split(".").pop() === 'md' ? "" : ".md";
  console.log(1111111, suffix)
  const markdownFile = fs.readFileSync(path.join(configDirectory, _slug+suffix, ))
  console.log(22,matter(markdownFile))
  const {content, data} = matter(markdownFile); 
  const {title, date} = data;
  return { props: {params, content, title, date} };
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
