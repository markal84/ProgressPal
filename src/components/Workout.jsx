/* eslint-disable indent */
import { useState } from 'react'
import { Box, IconButton, Typography, Collapse, Divider } from '@mui/material'
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
    <>
      <Box
        component="section"
        sx={{
          padding: '1rem'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '1rem'
          }}
        >
          <Typography variant="h6">
            <span style={{ fontSize: '0.9rem' }}>{workout.day}</span>
            <br />
            <span>{formattedDate}</span>
          </Typography>
          <Box display="flex">
            <UpdateWorkoutForm
              workout={workout}
              onUpdateWorkout={onUpdateWorkout}
            />
            <IconButton
              color="secondary"
              onClick={handleDeleteClick}
              aria-label="delete workout"
              sx={{ marginLeft: '0.8rem' }}
            >
              <Delete />
            </IconButton>
          </Box>
        </Box>
        <Box sx={{ cursor: 'pointer' }}>
          <Typography
            variant="body1"
            onClick={handleToggleExerciseList}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingTop: '0.75rem',
              paddingBottom: '0.75rem'
            }}
          >
            <span>
              {totalExercises === 0
                ? 'No exercises'
                : `${totalExercises} ${
                    totalExercises === 1 ? 'exercise' : 'exercises'
                  }`}
            </span>
            {showExerciseList ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </Typography>
        </Box>
        <Collapse in={showExerciseList}>
          <ExerciseList
            workout={workout}
            setWorkouts={setWorkouts}
            user={user}
          />
          <Typography
            variant="body1"
            onClick={handleCollapseClose}
            sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
          >
            <span style={{ marginLeft: 'auto' }}>
              <ExpandLessIcon
                sx={{ marginTop: '1rem', marginBottom: '1rem' }}
              />
            </span>
          </Typography>
        </Collapse>

        <PromptDialog
          open={deleteConfirmationOpen}
          title="Confirm Delete"
          message="Are you sure you want to delete this workout?"
          onCancel={handleDeleteCancel}
          onConfirm={handleDeleteConfirmation}
        />
      </Box>
      <Divider />
    </>
  )
}

Workout.propTypes = {
  workout: PropTypes.object.isRequired,
  onDeleteWorkout: PropTypes.func.isRequired,
  onUpdateWorkout: PropTypes.func.isRequired,
  setWorkouts: PropTypes.func,
  user: PropTypes.object
}
