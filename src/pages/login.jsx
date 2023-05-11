import { PropTypes } from 'prop-types'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import LoginForm from '../components/forms/LoginForm'
import loginService from '../services/login'
import workoutService from '../services/workouts'

export default function Login({ setUser, user, setMessage }) {
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
      navigate('/')
    } catch (error) {
      setMessage('Wrong username or password')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const loginForm = () => {
    return <LoginForm handleLogin={handleLogin} />
  }

  useEffect(() => {
    const loggedUserData = window.localStorage.getItem('loggedWorkoutAppUser')
    if (loggedUserData) {
      const user = JSON.parse(loggedUserData)
      setUser(user)
      workoutService.setToken(user.token)
    }
  }, [setUser])

  return <div>{user ? 'already log in' : loginForm()}</div>
}

Login.propTypes = {
  setUser: PropTypes.func.isRequired,
  setMessage: PropTypes.func.isRequired,
  user: PropTypes.object
}
