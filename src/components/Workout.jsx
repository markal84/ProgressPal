import { useState } from 'react'
import { Paper, IconButton, Typography, Collapse } from '@mui/material'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Delete } from '@mui/icons-material'
import ExerciseList from './ExerciseList'
import UpdateWorkoutForm from './forms/UpdateWorkoutForm'
import formatDate from '../utilis/dateFormat'
import PromptDialog from './PromptDialog'
import { PropTypes } from 'prop-types'

export default function Workout({
  workout,
  onDeleteWorkout,
  onUpdateWorkout,
  setWorkouts,
  user
}) {
  const [showExerciseList, setShowExerciseList] = useState(false)
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false)

  const formattedDate = formatDate(workout.date)
  const totalExercises = workout.exercises.length

  function handleDeleteClick() {
    setDeleteConfirmationOpen(true)
  }

  function handleDeleteConfirmation() {
    onDeleteWorkout(workout.id)
    setDeleteConfirmationOpen(false)
  }

  function handleDeleteCancel() {
    setDeleteConfirmationOpen(false)
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
      <IconButton
        color="secondary"
        onClick={handleDeleteClick}
        aria-label="delete workout"
      >
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
        <ExerciseList workout={workout} setWorkouts={setWorkouts} user={user} />
        <Typography variant="body1" onClick={handleCollapseClose}>
          <ExpandLessIcon /> Close
        </Typography>
      </Collapse>
      <PromptDialog
        open={deleteConfirmationOpen}
        title="Confirm Delete"
        message="Are you sure you want to delete this workout?"
        onCancel={handleDeleteCancel}
        onConfirm={handleDeleteConfirmation}
      />
    </Paper>
  )
}

Workout.propTypes = {
  workout: PropTypes.object.isRequired,
  onDeleteWorkout: PropTypes.func.isRequired,
  onUpdateWorkout: PropTypes.func.isRequired,
  setWorkouts: PropTypes.func,
  user: PropTypes.object
}
