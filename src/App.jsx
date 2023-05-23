import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import User from './pages/user'
import Workouts from './pages/workouts'
import Home from './pages/home'
import Register from './pages/register'
import workoutService from './services/workouts'
import Notification from './components/Notification'
import { Typography, Container, Box } from '@mui/material'
import ThemeSwitch from './components/ThemeSwitch'

function App() {
  const [workouts, setWorkouts] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    setIsLoading(true)

    if (user) {
      workoutService
        .getAll(user)
        .then((initialWorkouts) => {
          setWorkouts(initialWorkouts)
          setIsLoading(false)
        })
        .catch(() => {
          setMessage('Can not load workouts')
          setTimeout(() => {
            setMessage(null)
          }, 3000)
          setIsLoading(false)
        })
    }

    setIsLoading(false)
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
    <>
      <ThemeSwitch />
      <Box>
        <Router>
          <Notification message={message} />

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
                    setUser={setUser}
                  />
                }
              />
              <Route
                path="/account"
                element={
                  <User user={user} setUser={setUser} setMessage={setMessage} />
                }
              />
              <Route
                path="/"
                element={
                  <Home setUser={setUser} user={user} setMessage={setMessage} />
                }
              />
              <Route
                path="/login"
                element={<Home setUser={setUser} setMessage={setMessage} />}
              />
              <Route
                path="/register"
                element={<Register setMessage={setMessage} />}
              />
            </Routes>
          )}
        </Router>
      </Box>
    </>
  )
}

export default App
