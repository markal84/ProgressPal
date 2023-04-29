export default function Exercise({ exercise, onDeleteExercise }) {
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
      </li>
    </>
  )
}
