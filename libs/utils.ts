import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const root = process.cwd()

export  function getFiles (folder: string) {
   return fs.readdirSync(path.join(root, folder))
}

export  function getAllFiles(folder: string) {
  //获取所有文章 frontMatter
  const files = getFiles(folder);
  console.log(3444, files)
  const matterFiles = files.map((file)=> {
      const {data: frontmatter} = getFileBySlug(folder, file)
      return frontmatter 
  })
  console.log({matterFiles})
  cacheFiles(matterFiles)
  return matterFiles;
}

export  function getFileBySlug(folder: string, slug: string) {
  const source = fs.readFileSync(path.join(root, folder, slug), 'utf-8')
  const { data, content } = matter(source)
  console.log("233", data)
  return {data, content}
}


export function getAllTags(folder: string) {
  // 获取所有tags 
  const files = getFiles(folder)
  const tagsCount: any = {}
  files.forEach((file)=>{
    const {data} = getFileBySlug(folder, file)
    const {tags} = data
    tags?.split(",").forEach((tag: any)=> {
      if (tag in tagsCount) {
        tagsCount[tag] +=1
      } else {
        tagsCount[tag] = 1
      }
    })
  })
  return tagsCount
}

export function cacheFiles(data:any) {
  console.log("write file")
  fs.writeFileSync(path.join(root,"search.json"), JSON.stringify(data))
}
