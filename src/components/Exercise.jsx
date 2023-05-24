/* eslint-disable indent */
import { useState } from 'react'
import UpdateExerciseForm from './forms/UpdateExerciseForm'
import PromptDialog from './PromptDialog'
import { Box, Button, Typography, Paper } from '@mui/material'
import { styled } from '@mui/system'
import { Delete as DeleteIcon } from '@mui/icons-material'
import { PropTypes } from 'prop-types'

const DeleteButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(1),
  alignSelf: 'flex-end'
}))

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

  return (
    <Box>
      <Paper>
        <Typography variant="body1" gutterBottom>
          Name: {exercise.name}
        </Typography>
        {exercise.weight && (
          <Typography variant="body1" gutterBottom>
            Weight: {exercise.weight}kg
          </Typography>
        )}
        <Typography variant="body1" gutterBottom>
          Series: {exercise.series}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Repetitions: {exercise.repetitions}
        </Typography>
        <DeleteButton onClick={handleDeleteExercise} color="secondary">
          <DeleteIcon />
        </DeleteButton>
        <UpdateExerciseForm
          onUpdateExercise={onUpdateExercise}
          exercise={exercise}
          workout={workout}
        />
      </Paper>
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
