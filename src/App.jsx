import { useState, useEffect } from 'react'
import axios from 'axios'
import WorkoutList from './components/WorkoutList'

function App() {
  const [workouts, setWorkouts] = useState([])

  useEffect(() => {
    axios.get('http://localhost:3001/workouts').then((res) => {
      setWorkouts(res.data)
    })
  }, [])

  function handleAddWorkout(newWorkout) {
    setWorkouts([...workouts, newWorkout])
  }

  return (
    <div>
      <h1>Gym progress app</h1>
      <WorkoutList workouts={workouts} onAddWorkout={handleAddWorkout} />
    </div>
  )
}

export default App
