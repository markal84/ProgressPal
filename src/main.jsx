import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { ThemeProviderWrapper } from './components/ThemeContext.jsx'
import './index.css'
import { CssBaseline } from '@mui/material'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProviderWrapper>
      <CssBaseline />
      <App />
    </ThemeProviderWrapper>
  </React.StrictMode>
)
