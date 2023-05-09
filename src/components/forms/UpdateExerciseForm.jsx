import { useRef } from 'react'
import { useForm } from 'react-hook-form'
import { PropTypes } from 'prop-types'
import Togglable from '../Togglable'
import { Box, Button, TextField } from '@mui/material'

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
    updateExerciseFormRef.current.toggleVisibility()
    onUpdateExercise(workout.id, exercise.id, data)
  }

  const updateExerciseForm = () => {
    return (
      <Togglable buttonLabel="Edit Exercise" ref={updateExerciseFormRef}>
        <Box component="form" onSubmit={handleSubmit(handleUpdate)}>
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

          <Button type="submit" variant="contained">
            Update
          </Button>
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
