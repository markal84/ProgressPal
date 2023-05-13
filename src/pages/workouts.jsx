import workoutService from '../services/workouts'
import WorkoutList from '../components/WorkoutList'
import AddWorkoutForm from '../components/forms/AddWorkoutForm'
import { PropTypes } from 'prop-types'

export default function Workouts({ workouts, setWorkouts, setMessage, user }) {
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
      .then(() => {
        workoutService.getAll().then((updatedWorkouts) => {
          setWorkouts(updatedWorkouts)
        })
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

  return (
    <>
      {user && (
        <>
          <AddWorkoutForm onAddWorkout={handleAddWorkout} />
          <WorkoutList
            workouts={workouts}
            onDeleteWorkout={handleDeleteWorkout}
            onUpdateWorkout={handleUpdateWorkout}
            setWorkouts={setWorkouts}
          />
        </>
      )}
    </>
  )
}

Workouts.propTypes = {
  workouts: PropTypes.array,
  user: PropTypes.object,
  setWorkouts: PropTypes.func.isRequired,
  setMessage: PropTypes.func.isRequired
}
