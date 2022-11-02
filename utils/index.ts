import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { serialize } from 'next-mdx-remote/serialize'
import rehypeHighlight from 'rehype-highlight'
import remarkToc from "remark-toc"


const root = process.cwd()


export async function getFiles (type: string) {
   return fs.readdirSync(path.join(root, type))
}

export async function getFileBySlug (type: string, slug: string) {
  const source = fs.readFileSync(path.join(root, type, slug), 'utf-8')
  const { data, content } = matter(source)
  const mdxSource = await serialize(content, {
    mdxOptions: {
      rehypePlugins: [rehypeHighlight],
      remarkPlugins: [remarkToc]
    }
  })
  console.log({data})
  return  {data, mdxSource}
}
