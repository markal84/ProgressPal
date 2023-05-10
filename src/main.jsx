import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { ThemeProviderWrapper } from './components/ThemeContext.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeProviderWrapper>
    <App />
  </ThemeProviderWrapper>
)
