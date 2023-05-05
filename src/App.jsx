import { useState, useEffect } from 'react'
import workoutService from './services/workouts'
import loginService from './services/login'
import WorkoutList from './components/WorkoutList'
import AddWorkoutForm from './components/forms/AddWorkoutForm'
import Notification from './components/Notification'
import LoginForm from './components/forms/LoginForm'
import Togglable from './components/Togglable'

function App() {
  const [workouts, setWorkouts] = useState([])
  const [message, setMessage] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    workoutService.getAll().then((initialWorkoutss) => {
      setWorkouts(initialWorkoutss)
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
      setMessage('Wrong credentials')
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
      <div>
        <p>{user.name}: logged</p>
        <button
          type="button"
          onClick={() => handleLogout()}
          style={{ marginBottom: '2rem' }}
        >
          Logout
        </button>
        <AddWorkoutForm onAddWorkout={handleAddWorkout} />
      </div>
    )
  }

  return (
    <div>
      <h1>Gym progress app</h1>
      <Notification message={message} />

      {!user && loginForm()}
      {user && loggedUser()}
      <WorkoutList
        workouts={workouts}
        onDeleteWorkout={handleDeleteWorkout}
        onUpdateWorkout={handleUpdateWorkout}
      />
    </div>
  )
}

export default App
