import { createContext, useState } from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { PropTypes } from 'prop-types'

const ThemeContext = createContext()

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#3f51b5'
    },
    secondary: {
      main: '#f50057'
    }
  }
})

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9'
    },
    secondary: {
      main: '#f48fb1'
    }
  }
})

const ThemeProviderWrapper = ({ children }) => {
  //const storedTheme = localStorage.getItem('theme')
  const [theme, setTheme] = useState(darkTheme)

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === lightTheme ? darkTheme : lightTheme))
  }

  /*
  useEffect(() => {
    localStorage.setItem('theme', theme === darkTheme ? 'dark' : 'light')
  }, [theme])
  */

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  )
}

ThemeProviderWrapper.propTypes = {
  children: PropTypes.node
}

export { ThemeProviderWrapper, ThemeContext }
