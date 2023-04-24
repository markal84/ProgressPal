export default function Exercise({ exercise }) {
  return (
    <div>
      <span>{exercise.name}</span> <span>{exercise.weight}kg</span>{' '}
      <span>{exercise.series}</span> <span>{exercise.repetitions}</span>{' '}
    </div>
  )
}
