import { useContext, useEffect, useState } from 'react'
import { Switch } from '@mui/material'
import { ThemeContext } from './ThemeContext'

export default function ThemeSwitch() {
  const { theme, toggleTheme } = useContext(ThemeContext)
  const [initialized, setInitialized] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(theme.palette.mode === 'dark')

  const handleSwitchChange = () => {
    toggleTheme()
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
    <>
      <Switch
        checked={isDarkMode}
        onChange={handleSwitchChange}
        color="primary"
      />
      <span>{isDarkMode ? 'Dark Mode' : 'Light Mode'}</span>
    </>
  )
}
