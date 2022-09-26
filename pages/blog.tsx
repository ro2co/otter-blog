import styles from '../styles/Blog.module.css'
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
    <div className="blog">
      <div className="container">
        {
          props.metaPosts.map ((item:any) => {
            return (
             <div className={styles["article-item"]} key={item.slug}>
              <div className="info">
                <div className="date">
                  {item.date}
                </div>
                <div className="catagory">
                  {item.tags}
                </div>
              </div>
              <div className={styles.title}>
                <Link href={`/blog/${item.slug}`}>{item.title}</Link> 
                </div>
              <div className={styles.desc}>
                {item.expert}
              </div>
            </div>
            )
          })
        }
      </div>
    </div>
  )
}
export default BlogPage;
