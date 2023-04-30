import UpdateExerciseForm from './forms/UpdateExerciseForm'

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
        <p>Weight: {exercise.weight}kg</p>
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
