import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import User from './pages/user'
import Workouts from './pages/workouts'
import Home from './pages/home'
import Register from './pages/register'
import workoutService from './services/workouts'
import Notification from './components/Notification'

function App() {
  const [workouts, setWorkouts] = useState([])
  const [message, setMessage] = useState(null)
  const [user, setUser] = useState(null)

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
      <Notification message={message} />
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
            <User
              user={user}
              setUser={setUser}
              setMessage={setMessage}
              workouts={workouts}
            />
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
    </Router>
  )
}

export default App
