import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/home'
import User from './pages/user'
import Workouts from './pages/workouts'
import Login from './pages/login'
import workoutService from './services/workouts'
import Notification from './components/Notification'
import {
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

  function handleLogout() {
    try {
      window.localStorage.removeItem('loggedWorkoutAppUser')
      setUser(null)
      setMessage('You successfully logged out')
      setTimeout(() => {
        setMessage(null)
      }, 2000)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Router>
      <Paper sx={{ padding: theme.spacing(2) }}>
        <nav>
          <Link style={{ padding: 5 }} to="/">
            home
          </Link>
          <Link style={{ padding: 5 }} to="/workouts">
            workouts
          </Link>
          <Link style={{ padding: 5 }} to="/account">
            {user ? 'my account' : ''}
          </Link>
          {user ? (
            <>
              <Typography variant="body1" gutterBottom>
                {user.name} logged in
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
            </>
          ) : (
            <Link style={{ padding: 5 }} to="/login">
              login
            </Link>
          )}
        </nav>
        <ThemeSwitch />
        <Notification message={message} />

        <Typography variant={isMobile ? 'h3' : 'h1'} gutterBottom>
          Gym progress
        </Typography>

        {isLoading ? (
          <Typography variant="body1" gutterBottom>
            Loading data...
          </Typography>
        ) : (
          <Routes>
            <Route
              path="/workouts"
              element={
                <Workouts
                  workouts={workouts}
                  user={user}
                  setMessage={setMessage}
                  setWorkouts={setWorkouts}
                />
              }
            />
            <Route path="/account" element={<User user={user} />} />
            <Route path="/" element={<Home workouts={workouts} />} />
            <Route
              path="/login"
              element={
                <Login setUser={setUser} user={user} setMessage={setMessage} />
              }
            />
          </Routes>
        )}
      </Paper>
    </Router>
  )
}

export default App
