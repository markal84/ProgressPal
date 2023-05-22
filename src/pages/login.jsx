import { PropTypes } from 'prop-types'
import { useNavigate } from 'react-router-dom'
import { Box } from '@mui/material'
import LoginForm from '../components/forms/LoginForm'
import NavHomePage from '../components/NavHomePage'
import Header from '../components/Header'
import loginService from '../services/login'
import workoutService from '../services/workouts'
import { DEMO_PASSWORD } from '../config'

export default function Login({ setUser, setMessage }) {
  const navigate = useNavigate()

  async function handleLogin(username, password) {
    try {
      const user = await loginService.login({
        username,
        password
      })

      window.localStorage.setItem('loggedWorkoutAppUser', JSON.stringify(user))

      workoutService.setToken(user.token)
      setUser(user)
      navigate('/workouts')
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setMessage('Invalid username or password')
      } else {
        setMessage('An error occurred. Please try again.')
      }
      setTimeout(() => {
        setMessage(null)
      }, 3000)
    }
  }

  async function handleDemoLogin() {
    await handleLogin('DemoUser', DEMO_PASSWORD)
  }

  const loginForm = () => {
    return (
      <LoginForm handleLogin={handleLogin} handleDemoLogin={handleDemoLogin} />
    )
  }

  return (
    <Box>
      <Header />
      <NavHomePage />
      {loginForm()}
    </Box>
  )
}

Login.propTypes = {
  setUser: PropTypes.func.isRequired,
  setMessage: PropTypes.func.isRequired,
  user: PropTypes.object
}
