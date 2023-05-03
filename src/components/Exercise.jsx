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
  /*
  console.log(
    `Exercise weight is: ${exercise.weight} so exercise.weight === 0 is ${
      exercise.weight === 0
    } and undefined: ${exercise.weight === undefined}`
  )
  */
  console.log(exercise.weight)

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
