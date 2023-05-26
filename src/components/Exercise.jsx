/* eslint-disable indent */
import { useState } from 'react'
import UpdateExerciseForm from './forms/UpdateExerciseForm'
import PromptDialog from './PromptDialog'
import { Box, Typography, Button } from '@mui/material'
import { Delete as DeleteIcon } from '@mui/icons-material'
import { PropTypes } from 'prop-types'

export default function Exercise({
  workout,
  exercise,
  onDeleteExercise,
  onUpdateExercise
}) {
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false)

  function handleDeleteExercise() {
    setDeleteConfirmationOpen(true)
  }

  function handleDeleteConfirmation() {
    onDeleteExercise(exercise.id)
    setDeleteConfirmationOpen(false)
  }

  function handleDeleteCancel() {
    setDeleteConfirmationOpen(false)
  }

  const names = ['weight', 'series', 'repetitions']
  const displayNames = {
    repetitions: 'reps'
  }

  const exerciseInfo = names.map((name) => {
    if (name === 'weight' && !exercise.weight) {
      return null
    }

    const displayName = displayNames[name] || name

    return (
      <Typography key={name} variant="caption" gutterBottom>
        {displayName}:
        <Typography variant="subtitle1" sx={{ fontWeight: '600' }}>
          {exercise[name]}
          {name === 'weight' ? 'kg' : ''}
        </Typography>
      </Typography>
    )
  })

  return (
    <Box component="section">
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        sx={{ padding: '10px' }}
      >
        <Typography variant="body1" align="left">
          {exercise.name}
        </Typography>
        <Box display="flex">
          <UpdateExerciseForm
            onUpdateExercise={onUpdateExercise}
            exercise={exercise}
            workout={workout}
          />
          <Button onClick={handleDeleteExercise} color="secondary">
            <DeleteIcon fontSize="small" />
          </Button>
        </Box>
      </Box>
      <Box display="flex" gap={2} alignItems="center" ml={1} mt={1} mb={1}>
        {exerciseInfo}
      </Box>
      <PromptDialog
        open={deleteConfirmationOpen}
        title="Confirm Delete"
        message="Are you sure you want to delete this exercise?"
        onCancel={handleDeleteCancel}
        onConfirm={handleDeleteConfirmation}
      />
    </Box>
  )
}

Exercise.propTypes = {
  workout: PropTypes.object.isRequired,
  exercise: PropTypes.object.isRequired,
  onDeleteExercise: PropTypes.func.isRequired,
  onUpdateExercise: PropTypes.func.isRequired
}
