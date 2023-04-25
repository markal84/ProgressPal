import { useState, useEffect } from 'react'
import workoutService from './services/workouts'
import WorkoutList from './components/WorkoutList'

function App() {
  const [workouts, setWorkouts] = useState([])

  useEffect(() => {
    workoutService.getAll().then((initialWorkoutss) => {
      setWorkouts(initialWorkoutss)
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
