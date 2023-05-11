import { PropTypes } from 'prop-types'
import { totalWeight } from '../utilis/workoutInfo'

export default function Home({ workouts }) {
  const totalExercises = workouts.flatMap((workout) => workout.exercises).length
  const exerciseArray = workouts.flatMap((workout) =>
    workout.exercises
      .filter((exercise) => !isNaN(Number(exercise.weight)))
      .map((exercise) => [
        Number(exercise.series),
        Number(exercise.repetitions),
        Number(exercise.weight)
      ])
  )

  totalWeight(exerciseArray)

  return (
    <div>
      <p>Total number of workouts: {workouts.length}</p>
      <p>Total number of exercises: {totalExercises}</p>
      <p>Total weight lifted: {totalWeight(exerciseArray)}kg</p>
    </div>
  )
}

Home.propTypes = {
  workouts: PropTypes.array
}
