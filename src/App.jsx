import { useState, useEffect } from 'react'
import workoutService from './services/workouts'
import loginService from './services/login'
// import exerciseService from './services/exercises'
import WorkoutList from './components/WorkoutList'
import AddWorkoutForm from './components/forms/AddWorkoutForm'
import Notification from './components/Notification'
import LoginForm from './components/forms/LoginForm'

function App() {
  const [workouts, setWorkouts] = useState([])
  const [message, setMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [loginVisible, setLoginVisible] = useState(false)

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

  async function handleLogin(e) {
    e.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password
      })

      window.localStorage.setItem('loggedWorkoutAppUser', JSON.stringify(user))

      workoutService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
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
      setUsername('')
      setPassword('')
    } catch (error) {
      setMessage('Error during logout')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
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
    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    const showWhenVisible = { display: loginVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>log in</button>
        </div>
        <div style={showWhenVisible}>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
          <button onClick={() => setLoginVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <h1>Gym progress app</h1>
      <Notification message={message} />

      {!user && loginForm()}
      {user && (
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
      )}

      <WorkoutList
        workouts={workouts}
        onDeleteWorkout={handleDeleteWorkout}
        onUpdateWorkout={handleUpdateWorkout}
      />
    </div>
  )
}

export default App
