import { extendTheme, withDefaultColorScheme } from '@chakra-ui/react';
import { mode } from "@chakra-ui/theme-tools"

//const dark = "#232323";
//const light = "#f0f0f0";

const breakpoints = {
  sm: '320px',
  md: '768px',
  lg: '1060px',
  xl: '1900px',
};
const Container = {
  sizes: {
    xl: {
      maxWidth: 'container.xl',
    },
    lg: {
      maxWidth: 'container.lg',
    },
    md: {
      maxWidth: 'container.md',
    },
    sm: {
      maxWidth: 'container.sm',
    },
  },
  defaultProps: {
    size: 'lg',
  },
};
const styles = {
  global: (props: any)=>({
    body: {
     //bg: mode(light, dark)(props),
      bg: mode("rgb(245, 245, 213)","rgb(30, 33, 39);")(props),
      color: mode( "#333","#ffffff",)(props),
      transition: "background-color 1s ease 0s"
    }
  })
  //global: {
  //  body: {
  //    background: "rgb(255, 250, 208)",
  //    color: "#333333"
  //  },
  //}
}
const sizes =  {
      container: {
        lg: '1080px',
      },
}
const config = {
  initialColorMode: "dark"
}

export const customTheme = extendTheme({
   components: {
      Container,
    },
  sizes,
  breakpoints,
  styles,
  config
})
