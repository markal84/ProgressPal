import { useState } from 'react'
import WorkoutList from './components/WorkoutList'

function App(props) {
  const [workouts, setWorkouts] = useState(props.workouts)

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
