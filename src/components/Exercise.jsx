/* eslint-disable indent */
import UpdateExerciseForm from './forms/UpdateExerciseForm'
import { Box, Button, Typography, useMediaQuery, useTheme } from '@mui/material'
import { PropTypes } from 'prop-types'

export default function Exercise({
  workout,
  exercise,
  onDeleteExercise,
  onUpdateExercise
}) {
  function deleteExercise() {
    onDeleteExercise(exercise.id)
  }

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <Box
      component="li"
      sx={{
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        alignItems: 'flex-start',
        padding: 2,
        backgroundColor: '#f5f5f5',
        marginBottom: 2
      }}
    >
      <Typography variant="body1" component="p" gutterBottom>
        Name: {exercise.name}
      </Typography>
      {exercise.weight !== undefined &&
        exercise.weight !== 0 &&
        exercise.weight !== null && (
          <Typography variant="body1" component="p" gutterBottom>
            Weight: {exercise.weight}kg
          </Typography>
        )}
      <Typography variant="body1" component="p" gutterBottom>
        Series: {exercise.series}
      </Typography>
      <Typography variant="body1" component="p" gutterBottom>
        Repetitions: {exercise.repetitions}
      </Typography>
      <Button onClick={deleteExercise} variant="contained" color="secondary">
        Delete
      </Button>
      <UpdateExerciseForm
        onUpdateExercise={onUpdateExercise}
        exercise={exercise}
        workout={workout}
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
