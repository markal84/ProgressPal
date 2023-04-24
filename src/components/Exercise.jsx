export default function Exercise({ exercise }) {
  return (
    <li>
      <p>Name: {exercise.name}</p>
      <p>Weight: {exercise.weight}kg</p>
      <p>Series: {exercise.series}</p>
      <p>Repetitions: {exercise.repetitions}</p>
    </li>
  )
}
