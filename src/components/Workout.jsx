import { Paper, Button, Typography } from '@mui/material'
import ExerciseList from './ExerciseList'
import UpdateWorkoutForm from './forms/UpdateWorkoutForm'
import formatDate from '../utilis/dateFormat'
import { PropTypes } from 'prop-types'

export default function Workout({
  workout,
  onDeleteWorkout,
  onUpdateWorkout,
  setWorkouts
}) {
  const formattedDate = formatDate(workout.date)

  function handleDeleteClick() {
    onDeleteWorkout(workout.id)
  }

  return (
    <Paper sx={{ marginBottom: 4, padding: 2 }}>
      <Typography variant="h5" component="h2" gutterBottom>
        {workout.day} - {formattedDate}
      </Typography>
      <Button variant="contained" color="secondary" onClick={handleDeleteClick}>
        Delete Workout
      </Button>
      <UpdateWorkoutForm workout={workout} onUpdateWorkout={onUpdateWorkout} />
      <ExerciseList workout={workout} setWorkouts={setWorkouts} />
    </Paper>
  )
}

Workout.propTypes = {
  workout: PropTypes.object.isRequired,
  onDeleteWorkout: PropTypes.func.isRequired,
  onUpdateWorkout: PropTypes.func.isRequired,
  setWorkouts: PropTypes.func.isRequired
}
