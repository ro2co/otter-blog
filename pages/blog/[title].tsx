import fs from 'fs'
import {join} from 'path'
import matter from 'gray-matter'
import {marked} from 'marked'

const DetailPage = ({content}:  any) =>{
  return <div>
    {content && 
      <div dangerouslySetInnerHTML={{__html: marked(content)}}></div>
    }
  </div>
}

export async function getStaticProps(context: any) {
  const {params} = context;
  const {title} = params;
  const _title = title.replaceAll("-", "_") + ".md"
  const markdownFile = fs.readFileSync(join('posts',_title))
  const {content} = matter(markdownFile); 
  return { props: {params, content} };
}

export async function getStaticPaths() {
  const files = fs.readdirSync(join('posts'));
  console.log({files})
  //const posts = files.map((file:any)=> {
  //  return file.replaceAll(" ", "-")
  //})
  const paths = files.map((file:any)=>({
    params: {title: file}
  }))
  return {
    fallback: true,
    paths
  }
}
export default DetailPage;
