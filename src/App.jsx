import { useState, useEffect } from 'react'
import workoutService from './services/workouts'
// import exerciseService from './services/exercises'
import WorkoutList from './components/WorkoutList'
import Notification from './components/Notification'

function App() {
  const [workouts, setWorkouts] = useState([])
  const [message, setMessage] = useState(null)

  useEffect(() => {
    workoutService.getAll().then((initialWorkoutss) => {
      setWorkouts(initialWorkoutss)
    })
  }, [])

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

  /*
  function handleAddExercise(newExercise, workoutId) {
    exerciseService
      .create(newExercise, workoutId)
      .then((returnedExercise) => {
        setExercises((workouts) =>
          workouts.map((workout) => {
            if (workout.workoutId === workoutId) {
              return {
                ...workout,
                exercises: [...workout.exercises, returnedExercise]
              }
            } else {
              return workout
            }
          })
        )
      })
      .catch((error) => console.log(error))
  }
  */

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

  return (
    <div>
      <h1>Gym progress app</h1>
      <Notification message={message} />
      <WorkoutList
        workouts={workouts}
        onAddWorkout={handleAddWorkout}
        onDeleteWorkout={handleDeleteWorkout}
        onUpdateWorkout={handleUpdateWorkout}
      />
    </div>
  )
}

export default App
