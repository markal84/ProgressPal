import { useState, useEffect } from 'react'
import { PropTypes } from 'prop-types'
import { totalWeight } from '../utilis/workoutInfo'
import { Typography, Box, Grid } from '@mui/material'

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
    <>
      {user ? (
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12}>
            <Typography variant="h5" color="textSecondary" align="center">
              Total number of workouts
            </Typography>
            <Typography variant="h3" color="primary" align="center">
              {workouts.length}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h5" color="textSecondary" align="center">
              Total number of exercises
            </Typography>
            <Typography variant="h3" color="primary" align="center">
              {totalExercises}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h5" color="textSecondary" align="center">
              Total weight lifted
            </Typography>
            <Typography variant="h3" color="primary" align="center">
              {totalWeight(exerciseArray)}kg
            </Typography>
          </Grid>
        </Grid>
      ) : (
        <Box textAlign="center">
          <Typography variant="h4" gutterBottom>
            Your Personal Gym Companion
          </Typography>
          <Typography variant="h5" color="textSecondary" gutterBottom>
            Join the ProgressPal community and take control of your workouts.
          </Typography>
          <Typography variant="h5" color="textSecondary" gutterBottom>
            Log in to access personalized features and track your progress.
          </Typography>
        </Box>
      )}
    </>
  )
}

Home.propTypes = {
  workouts: PropTypes.array,
  user: PropTypes.object
}
