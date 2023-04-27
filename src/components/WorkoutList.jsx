import Workout from './Workout'
import AddWorkoutForm from './forms/AddWorkoutForm'

export default function WorkoutList({
  workouts,
  onAddWorkout,
  onDeleteWorkout,
  onUpdateWorkout
}) {
  return (
    <>
      <div>
        <AddWorkoutForm onAddWorkout={onAddWorkout} />
      </div>
      <div>
        {workouts.map((workout) => (
          <Workout
            key={workout.id}
            workout={workout}
            onDeleteWorkout={onDeleteWorkout}
            onUpdateWorkout={onUpdateWorkout}
          />
        ))}
      </div>
    </>
  )
}
