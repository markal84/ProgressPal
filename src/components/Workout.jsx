import ExerciseList from './ExerciseList'

export default function Workout({ workout, onDeleteWorkout }) {
  function handleDeleteClick() {
    onDeleteWorkout(workout.id)
  }
  return (
    <div>
      <h2>
        Day: {workout.day} - {workout.date}
      </h2>
      <button onClick={handleDeleteClick}>Delete</button>
      <ExerciseList workout={workout} />
    </div>
  )
}
