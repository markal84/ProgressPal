import Exercise from './Exercise'

export default function Workout({ workout }) {
  return (
    <div>
      Single workout:
      <p>
        <span>Day: {workout.day}</span> <span>Date: {workout.date}</span>
      </p>
      <div>
        <div>
          Exercises:
          {workout.exercises.map((exercise) => {
            return <Exercise key={exercise.id} exercise={exercise} />
          })}
        </div>
      </div>
    </div>
  )
}
