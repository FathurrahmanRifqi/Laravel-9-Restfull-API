// ROOT 

import '../styles/globals.css'

//bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'

//mantine 
import { useState } from 'react';
import { MantineProvider, ColorSchemeProvider, ColorScheme } from '@mantine/core';
import React from 'react';

// add theme not used
const theme = ({
  colorScheme: 'dark',
  colors: {},
  shadows: {
    md: '1px 1px 3px rgba(0, 0, 0, .25)',
    xl: '5px 5px 3px rgba(0, 0, 0, .25)',
  },

  headings: {
    fontFamily: 'Roboto, sans-serif',
    sizes: {
      h1: { fontSize: 30 },
    },
  },
});


function MyApp({ Component, pageProps }) {
  const [colorScheme, setColorScheme] = useState<ColorScheme>('light');
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));
    
  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
    <MantineProvider
      theme={{colorScheme}}
      withGlobalStyles
      withNormalizeCSS
    >
      
       <Component {...pageProps} />

    </MantineProvider>
    </ColorSchemeProvider>
  

  )
}

export default MyApp
