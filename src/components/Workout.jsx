import { useState } from 'react'
import { Paper, IconButton, Typography, Collapse } from '@mui/material'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Delete } from '@mui/icons-material'
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
  const [showExerciseList, setShowExerciseList] = useState(false)

  const formattedDate = formatDate(workout.date)
  const totalExercises = workout.exercises.length

  function handleDeleteClick() {
    onDeleteWorkout(workout.id)
  }

  function handleToggleExerciseList() {
    setShowExerciseList(!showExerciseList)
  }

  function handleCollapseClose() {
    setShowExerciseList(false)
  }

  return (
    <Paper sx={{ marginBottom: 4, padding: 2 }}>
      <Typography variant="h5" component="h2" gutterBottom>
        {workout.day} - {formattedDate}
      </Typography>
      <IconButton color="secondary" onClick={handleDeleteClick}>
        <Delete />
      </IconButton>
      <UpdateWorkoutForm workout={workout} onUpdateWorkout={onUpdateWorkout} />
      <Typography variant="body1">
        Number of exercises: {totalExercises}
      </Typography>
      <Typography variant="body1" onClick={handleToggleExerciseList}>
        <ExpandMoreIcon /> Click to {showExerciseList ? 'hide' : 'show'}{' '}
        exercises
      </Typography>
      <Collapse in={showExerciseList}>
        <ExerciseList workout={workout} setWorkouts={setWorkouts} />
        <Typography variant="body1" onClick={handleCollapseClose}>
          <ExpandLessIcon /> Close
        </Typography>
      </Collapse>
    </Paper>
  )
}

Workout.propTypes = {
  workout: PropTypes.object.isRequired,
  onDeleteWorkout: PropTypes.func.isRequired,
  onUpdateWorkout: PropTypes.func.isRequired,
  setWorkouts: PropTypes.func.isRequired
}
