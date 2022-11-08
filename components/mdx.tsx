import {Button, Heading, Code, Container} from '@chakra-ui/react';
import {Sandpack} from '@codesandbox/sandpack-react';
import {MDXRemote} from "next-mdx-remote"

const MDXComponents = {
    h1: (props:any) => <Heading as="h1" size="xl" my={4} {...props} />,
    h2: (props:any) => <Heading as="h2" size="lg" fontWeight="bold" {...props} />,
    h3: (props:any) => <Heading as="h3" size="md" fontWeight="bold" {...props} />,
    h4: (props:any) => <Heading as="h4" size="sm" fontWeight="bold" {...props} />,
    h5: (props:any) => <Heading as="h5" size="sm" fontWeight="bold" {...props} />,
    h6: (props:any) => <Heading as="h6" size="xs" fontWeight="bold" {...props} />,
    img: (props:any) => <p className="article-img"><img {...props} /></p>,
    inlineCode: (props:any) => (
        <Code colorScheme="yellow" fontSize="0.84em" {...props} />
    ),
    Button,
  Sandpack,
  Container
}
export default MDXComponents

export const MDXLayout = ({layout, content, ...rest}: any) => {
    const Layout = require(`../layouts/${layout}`).default
    return (
      <Layout>
            <MDXRemote {...content} components={MDXComponents} />
      </Layout>
    )
    
}

