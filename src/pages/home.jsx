import { useState, useEffect } from 'react'
import { PropTypes } from 'prop-types'
import { totalWeight } from '../utilis/workoutInfo'

export default function Home({ workouts, user }) {
  const [exerciseArray, setExerciseArray] = useState([])
  const [totalExercises, setTotalExercises] = useState(0)

  useEffect(() => {
    const updatedExerciseArray = workouts.flatMap((workout) =>
      workout.exercises
        .filter((exercise) => !isNaN(Number(exercise.weight)))
        .map((exercise) => [
          Number(exercise.series),
          Number(exercise.repetitions),
          Number(exercise.weight)
        ])
    )

    setExerciseArray(updatedExerciseArray)
    setTotalExercises(workouts.flatMap((workout) => workout.exercises).length)
  }, [workouts])

  totalWeight(exerciseArray)

  return (
    <div>
      {user && (
        <>
          <p>Total number of workouts: {workouts.length}</p>
          <p>Total number of exercises: {totalExercises}</p>
          <p>Total weight lifted: {totalWeight(exerciseArray)}kg</p>
        </>
      )}
      {!user && <p>Welcome to gym app, please login - placeholder message</p>}
    </div>
  )
}

Home.propTypes = {
  workouts: PropTypes.array,
  user: PropTypes.object
}
