import Workout from './Workout'

export default function WorkoutList({
  workouts,
  onDeleteWorkout,
  onUpdateWorkout
}) {
  return (
    <>
      <div></div>
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
