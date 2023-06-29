import { useContext, useEffect, useState } from 'react'
import { Box, IconButton } from '@mui/material'
import { ThemeContext } from './ThemeContext'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'

export default function ThemeSwitch() {
  const { theme, toggleTheme } = useContext(ThemeContext)
  const [initialized, setInitialized] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(theme.palette.mode === 'dark')

  const handleSwitchChange = () => {
    toggleTheme()
    console.log('changing theme to', theme)
  }

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme')
    if (storedTheme && !initialized) {
      toggleTheme(storedTheme === 'dark')
      setInitialized(true)
    }
  }, [toggleTheme, initialized])

  useEffect(() => {
    setIsDarkMode(theme.palette.mode === 'dark')
  }, [theme])

  return (
    <Box display="flex" justifyContent="flex-end" alignItems="center">
      {theme.palette.mode} mode
      <IconButton sx={{ ml: 1 }} onClick={handleSwitchChange} color="inherit">
        {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
    </Box>
  )
}
