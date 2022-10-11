import {Button, Heading, Code, Container} from '@chakra-ui/react';
import {Sandpack} from '@codesandbox/sandpack-react'
const MDXComponents = {
     h1: (props) => <Heading as="h1" size="xl" my={4} {...props} />,
    h2: (props) => <Heading as="h2" size="lg" fontWeight="bold" {...props} />,
    h3: (props) => <Heading as="h3" size="md" fontWeight="bold" {...props} />,
    h4: (props) => <Heading as="h4" size="sm" fontWeight="bold" {...props} />,
    h5: (props) => <Heading as="h5" size="sm" fontWeight="bold" {...props} />,
    h6: (props) => <Heading as="h6" size="xs" fontWeight="bold" {...props} />,
    inlineCode: (props) => (
        <Code colorScheme="yellow" fontSize="0.84em" {...props} />
    ),
    Button,
  Sandpack,
  Container
}
export default MDXComponents
