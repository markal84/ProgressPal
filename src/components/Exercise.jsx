import UpdateExerciseForm from './forms/UpdateExerciseForm'
import { PropTypes } from 'prop-types'

export default function Exercise({
  workout,
  exercise,
  onDeleteExercise,
  onUpdateExercise
}) {
  function deleteExercise() {
    onDeleteExercise(exercise.id)
  }

  return (
    <>
      <li>
        <p>Name: {exercise.name}</p>
        {exercise.weight !== undefined &&
          exercise.weight !== 0 &&
          exercise.weight !== null && <p>Weight: {exercise.weight}kg</p>}
        <p>Series: {exercise.series}</p>
        <p>Repetitions: {exercise.repetitions}</p>
        <button onClick={deleteExercise}>Delete</button>
        <UpdateExerciseForm
          onUpdateExercise={onUpdateExercise}
          exercise={exercise}
          workout={workout}
        />
      </li>
    </>
  )
}

Exercise.propTypes = {
  workout: PropTypes.object.isRequired,
  exercise: PropTypes.object.isRequired,
  onDeleteExercise: PropTypes.func.isRequired,
  onUpdateExercise: PropTypes.func.isRequired
}
