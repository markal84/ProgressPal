import Workout from './Workout'
import AddWorkoutForm from './forms/AddWorkoutForm'

export default function WorkoutList({ workouts, onAddWorkout }) {
  return (
    <>
      <div>
        <AddWorkoutForm onAddWorkout={onAddWorkout} />
      </div>
      <div>
        {workouts.map((workout) => (
          <Workout key={workout.id} workout={workout} />
        ))}
      </div>
    </>
  )
}
