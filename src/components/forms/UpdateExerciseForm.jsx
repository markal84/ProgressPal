import { useRef } from 'react'
import { useForm } from 'react-hook-form'
import { PropTypes } from 'prop-types'
import Togglable from '../Togglable'
import { Box, Button, TextField, Typography } from '@mui/material'

export default function UpdateExerciseForm({
  workout,
  exercise,
  onUpdateExercise
}) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: exercise
  })

  const updateExerciseFormRef = useRef()

  function handleUpdate(data) {
    updateExerciseFormRef.current.open()
    onUpdateExercise(workout.id, exercise.id, data)
  }

  const toggleOpen = () => {
    updateExerciseFormRef.current.open()
  }

  const updateExerciseForm = () => {
    return (
      <Togglable mode="edit" ref={updateExerciseFormRef}>
        <Box component="form" onSubmit={handleSubmit(handleUpdate)}>
          <Box sx={{ marginBottom: 2 }}>
            <Typography variant="h6" gutterBottom>
              Edit Exercise
            </Typography>
          </Box>
          <TextField
            label="Name"
            name="name"
            {...register('name', {
              required: 'Name is required',
              pattern: {
                value: /^[A-Za-z\s-]+$/,
                message: 'Name must contain only letters, spaces, and hyphens'
              }
            })}
            fullWidth
            margin="normal"
            error={!!errors.name}
            helperText={errors.name ? errors.name.message : ''}
          />

          <TextField
            label="Weight"
            name="weight"
            type="number"
            {...register('weight')}
            fullWidth
            margin="normal"
            error={!!errors.weight}
            helperText={errors.weight ? errors.weight.message : ''}
          />

          <TextField
            label="Series"
            name="series"
            type="number"
            {...register('series', {
              required: 'Please put at least 1',
              pattern: {
                value: /^[1-9][0-9]*$/,
                message: 'Must be at least 1 series'
              }
            })}
            fullWidth
            margin="normal"
            error={!!errors.series}
            helperText={errors.series ? errors.series.message : ''}
          />

          <TextField
            label="Repetitions"
            name="repetitions"
            type="number"
            {...register('repetitions', {
              required: 'Please put at least 1',
              pattern: {
                value: /^[1-9][0-9]*$/,
                message: 'Must be at least 1 repetition'
              }
            })}
            fullWidth
            margin="normal"
            error={!!errors.repetitions}
            helperText={errors.repetitions ? errors.repetitions.message : ''}
          />

          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            mt={2}
          >
            <Button variant="contained" type="submit">
              Update
            </Button>
            <Button variant="outlined" onClick={toggleOpen}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Togglable>
    )
  }

  return <>{updateExerciseForm()}</>
}

UpdateExerciseForm.propTypes = {
  workout: PropTypes.object.isRequired,
  exercise: PropTypes.object.isRequired,
  onUpdateExercise: PropTypes.func.isRequired
}
