/* eslint-disable indent */
import UpdateExerciseForm from './forms/UpdateExerciseForm'
import { Box, Button, Typography } from '@mui/material'
import { styled } from '@mui/system'
import { PropTypes } from 'prop-types'

const ExerciseContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  padding: theme.spacing(2),
  backgroundColor: '#f5f5f5',
  marginBottom: theme.spacing(2),
  borderBottom: '2px solid #ccc',
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
      <DeleteButton
        onClick={deleteExercise}
        variant="contained"
        color="secondary"
      >
        Delete
      </DeleteButton>
      <UpdateExerciseForm
        onUpdateExercise={onUpdateExercise}
        exercise={exercise}
        workout={workout}
      />
    </ExerciseContainer>
  )
}

Exercise.propTypes = {
  workout: PropTypes.object.isRequired,
  exercise: PropTypes.object.isRequired,
  onDeleteExercise: PropTypes.func.isRequired,
  onUpdateExercise: PropTypes.func.isRequired
}
