import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import User from './pages/user'
import Workouts from './pages/workouts'
import Login from './pages/login'
import Register from './pages/register'
import Nav from './components/Navigation'
import workoutService from './services/workouts'
import Notification from './components/Notification'
import { Typography, useMediaQuery, Paper, useTheme } from '@mui/material'
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
    let userWorkouts = []

    workoutService.getAll().then((initialWorkouts) => {
      if (user) {
        userWorkouts = initialWorkouts.filter((workout) => {
          return workout.user.id === user.id
        })
      }

      setWorkouts(userWorkouts)
      setIsLoading(false)
    })
  }, [user])

  useEffect(() => {
    const loggedUserData = window.localStorage.getItem('loggedWorkoutAppUser')
    if (loggedUserData) {
      const user = JSON.parse(loggedUserData)
      setUser(user)
      workoutService.setToken(user.token)
    }
  }, [])

  return (
    <Router>
      <Paper sx={{ padding: theme.spacing(2) }}>
        <Nav user={user} setMessage={setMessage} setUser={setUser} />
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
            <Route
              path="/"
              element={<Home workouts={workouts} user={user} />}
            />
            <Route
              path="/login"
              element={
                <Login setUser={setUser} user={user} setMessage={setMessage} />
              }
            />
            <Route
              path="/register"
              element={<Register setMessage={setMessage} />}
            />
          </Routes>
        )}
      </Paper>
    </Router>
  )
}

export default App
