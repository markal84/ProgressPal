import ExerciseList from './ExerciseList'

export default function Workout({ workout }) {
  return (
    <div>
      <h3>Day: {workout.day}</h3>
      <p>Date: {workout.date}</p>
      <ExerciseList workout={workout} />
    </div>
  )
}
