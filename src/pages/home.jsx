import { useState, useEffect } from 'react'
import { PropTypes } from 'prop-types'
import { useNavigate } from 'react-router-dom'
import { Box, Container } from '@mui/material'
import LoginForm from '../components/forms/LoginForm'
import UserRegisterForm from '../components/forms/AddUserForm'
import NavHomePage from '../components/NavHomePage'
import Header from '../components/Header'
import loginService from '../services/login'
import userService from '../services/users'
import workoutService from '../services/workouts'
import { DEMO_PASSWORD } from '../config'

export default function Home({ setUser, setMessage }) {
  const [isLoadingLogin, setIsLoadingLogin] = useState(false)
  const navigate = useNavigate()
  const [activeForm, setActiveForm] = useState('login')

  useEffect(() => {
    const loggedUserData = window.localStorage.getItem('loggedWorkoutAppUser')
    if (loggedUserData) {
      navigate('/workouts')
    }
  }, [navigate])

  async function handleLogin(username, password) {
    setIsLoadingLogin(true)

    try {
      const user = await loginService.login({
        username,
        password
      })

      window.localStorage.setItem('loggedWorkoutAppUser', JSON.stringify(user))

      workoutService.setToken(user.token)
      setUser(user)
      setIsLoadingLogin(false)
      navigate('/workouts')
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setMessage('Invalid username or password')
        setIsLoadingLogin(false)
      } else {
        setMessage('An error occurred. Please try again.')
        setIsLoadingLogin(false)
      }
      setTimeout(() => {
        setMessage(null)
      }, 3000)
    }
  }

  async function handleDemoLogin() {
    await handleLogin('DemoUser', DEMO_PASSWORD)
  }

  async function handleRegister(username, name, password) {
    const newUser = {
      username,
      name,
      password
    }
    userService
      .create(newUser)
      .then(() => {
        setMessage('user created, you can log in')
        setTimeout(() => {
          setMessage(null)
          navigate('/')
        }, 3000)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const loginForm = () => {
    return (
      <LoginForm
        handleLogin={handleLogin}
        handleDemoLogin={handleDemoLogin}
        visible={activeForm === 'login'}
        isLoading={isLoadingLogin}
      />
    )
  }

  const registerForm = () => {
    return (
      <UserRegisterForm
        handleRegister={handleRegister}
        visible={activeForm === 'register'}
      />
    )
  }

  return (
    <Container sx={{ height: '100vh' }}>
      <Header />
      <Box>
        <NavHomePage activeForm={activeForm} setActiveForm={setActiveForm} />
        {activeForm === 'login' && loginForm()}
        {activeForm === 'register' && registerForm()}
      </Box>
    </Container>
  )
}

Home.propTypes = {
  setUser: PropTypes.func.isRequired,
  setMessage: PropTypes.func.isRequired,
  setIsLoading: PropTypes.func,
  isLoading: PropTypes.bool,
  user: PropTypes.object
}
