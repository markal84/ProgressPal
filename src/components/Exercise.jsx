/* eslint-disable indent */
import UpdateExerciseForm from './forms/UpdateExerciseForm'
import { Box, Button, Typography, Paper } from '@mui/material'
import { styled } from '@mui/system'
import { Delete as DeleteIcon } from '@mui/icons-material'
import { PropTypes } from 'prop-types'

const ExerciseContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    alignItems: 'center'
  }
}))

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
  function deleteExercise() {
    onDeleteExercise(exercise.id)
  }

  return (
    <ExerciseContainer>
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
        <DeleteButton onClick={deleteExercise} color="secondary">
          <DeleteIcon />
        </DeleteButton>
        <UpdateExerciseForm
          onUpdateExercise={onUpdateExercise}
          exercise={exercise}
          workout={workout}
        />
      </Paper>
    </ExerciseContainer>
  )
}

Exercise.propTypes = {
  workout: PropTypes.object.isRequired,
  exercise: PropTypes.object.isRequired,
  onDeleteExercise: PropTypes.func.isRequired,
  onUpdateExercise: PropTypes.func.isRequired
}
