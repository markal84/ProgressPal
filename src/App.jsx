import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/home'
import User from './pages/user'
import Workouts from './pages/workouts'
import workoutService from './services/workouts'
import loginService from './services/login'
import WorkoutList from './components/WorkoutList'
import AddWorkoutForm from './components/forms/AddWorkoutForm'
import Notification from './components/Notification'
import LoginForm from './components/forms/LoginForm'
import Togglable from './components/Togglable'
import {
  Box,
  Button,
  Typography,
  useMediaQuery,
  Paper,
  useTheme
} from '@mui/material'
import ThemeSwitch from './components/ThemeSwitch'

function App() {
  const [workouts, setWorkouts] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState(null)
  const [user, setUser] = useState(null)

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  useEffect(() => {
    setIsLoading(true)
    workoutService.getAll().then((initialWorkouts) => {
      setWorkouts(initialWorkouts)
      setIsLoading(false)
    })
  }, [])

  useEffect(() => {
    const loggedUserData = window.localStorage.getItem('loggedWorkoutAppUser')
    if (loggedUserData) {
      const user = JSON.parse(loggedUserData)
      setUser(user)
      workoutService.setToken(user.token)
    }
  }, [])

  async function handleLogin(username, password) {
    try {
      const user = await loginService.login({
        username,
        password
      })

      window.localStorage.setItem('loggedWorkoutAppUser', JSON.stringify(user))

      workoutService.setToken(user.token)
      setUser(user)
    } catch (error) {
      setMessage('Wrong username or password')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  function handleLogout() {
    try {
      window.localStorage.removeItem('loggedWorkoutAppUser')
      setUser(null)
      setMessage('Logged out')
      setTimeout(() => {
        setMessage(null)
      }, 2000)
    } catch (error) {
      console.log(error)
    }
  }

  function handleAddWorkout(newWorkout) {
    workoutService
      .create(newWorkout)
      .then((returnedWorkout) => {
        setWorkouts([...workouts, returnedWorkout])
        setMessage('workout added')
        setTimeout(() => {
          setMessage(null)
        }, 3500)
      })
      .then(() => {
        workoutService.getAll().then((updatedWorkouts) => {
          setWorkouts(updatedWorkouts)
        })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  function handleUpdateWorkout(id, updatedWorkout) {
    workoutService
      .update(id, updatedWorkout)
      .then((returnedWorkout) => {
        setWorkouts(workouts.map((w) => (w.id !== id ? w : returnedWorkout)))
        setMessage('workout updated')
        setTimeout(() => {
          setMessage(null)
        }, 3500)
      })
      .catch((error) => console.log(error))
  }

  function handleDeleteWorkout(id) {
    workoutService
      .remove(id)
      .then(() => {
        setWorkouts(workouts.filter((w) => w.id !== id))
        setMessage('workout deleted')
        setTimeout(() => {
          setMessage(null)
        }, 3500)
      })
      .catch((error) => console.log(error))
  }

  const loginForm = () => {
    return (
      <Togglable buttonLabel="log in">
        <LoginForm handleLogin={handleLogin} />
      </Togglable>
    )
  }

  const loggedUser = () => {
    return (
      <Box sx={{ marginTop: theme.spacing(3) }}>
        <Typography variant="body1" gutterBottom>
          {user.name}: logged
        </Typography>
        <Button
          type="button"
          onClick={handleLogout}
          variant="contained"
          color="secondary"
          sx={{ marginBottom: theme.spacing(3) }}
        >
          Logout
        </Button>
        <AddWorkoutForm onAddWorkout={handleAddWorkout} />
      </Box>
    )
  }

  return (
    <Router>
      <Paper sx={{ padding: theme.spacing(2) }}>
        <div>
          <Link style={{ padding: 5 }} to="/">
            home
          </Link>
          <Link style={{ padding: 5 }} to="/workouts">
            workouts
          </Link>
          <Link style={{ padding: 5 }} to="/users">
            user
          </Link>
        </div>

        <Routes>
          <Route path="/workouts" element={<Workouts />} />
          <Route path="/users" element={<User />} />
          <Route path="/" element={<Home />} />
        </Routes>
        <Typography variant={isMobile ? 'h3' : 'h1'} gutterBottom>
          Gym progress
        </Typography>
        <Notification message={message} />
        <ThemeSwitch />

        {!user && loginForm()}
        {user && loggedUser()}

        {isLoading ? (
          <Typography variant="body1" gutterBottom>
            Loading data...
          </Typography>
        ) : (
          <WorkoutList
            workouts={workouts}
            onDeleteWorkout={handleDeleteWorkout}
            onUpdateWorkout={handleUpdateWorkout}
          />
        )}
      </Paper>
    </Router>
  )
}

export default App
