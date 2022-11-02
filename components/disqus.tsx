import {DiscussionEmbed} from "disqus-react"
const DisqusComments = ({ post }: any) => {
  const disqusShortname = "road2code-1"
  const disqusConfig = {
    url: "https://road2code.me/blog",
    identifier: post.id, // Single post id
    title: post.title // Single post title
  }
  return (
    <div>
      <DiscussionEmbed
        shortname={disqusShortname}
        config={disqusConfig}
      />
    </div>
  )
}
export default DisqusComments;
