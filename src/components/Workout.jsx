import Exercise from './Exercise'

export default function Workout({ workout }) {
  return (
    <div>
      <h3>Day: {workout.day}</h3>
      <p>Date: {workout.date}</p>
      <div>
        <ul>
          Exercises:
          {workout.exercises.map((exercise) => {
            return <Exercise key={exercise.id} exercise={exercise} />
          })}
        </ul>
      </div>
    </div>
  )
}
