import Workout from './Workout'
import { PropTypes } from 'prop-types'

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

WorkoutList.propTypes = {
  workouts: PropTypes.array.isRequired,
  onDeleteWorkout: PropTypes.func.isRequired,
  onUpdateWorkout: PropTypes.func.isRequired
}
