import ExerciseList from './ExerciseList'
import UpdateWorkoutForm from './forms/UpdateWorkoutForm'
import formatDate from '../utilis/dateFormat'

export default function Workout({ workout, onDeleteWorkout, onUpdateWorkout }) {
  const formattedDate = formatDate(workout.date)

  function handleDeleteClick() {
    onDeleteWorkout(workout.id)
  }

  return (
    <div>
      <h2>
        Day: {workout.day} - {formattedDate}
      </h2>
      <button onClick={handleDeleteClick}>Delete</button>
      <UpdateWorkoutForm workout={workout} onUpdateWorkout={onUpdateWorkout} />
      <ExerciseList workout={workout} />
    </div>
  )
}
