import { useForm } from 'react-hook-form'
import { PropTypes } from 'prop-types'
import { Box, Button, TextField, Typography } from '@mui/material'

export default function AddExerciseForm({ onAddExercise, workoutId }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm()

  async function onSubmit(data) {
    onAddExercise(data, workoutId)
    reset()
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ marginTop: 2 }}
    >
      <Box sx={{ marginBottom: 2 }}>
        <Typography variant="h6" gutterBottom>
          Add Exercise
        </Typography>
      </Box>

      <TextField
        label="Name*"
        type="text"
        {...register('name', {
          required: 'Name is required',
          pattern: {
            value: /^[A-Za-z\s-]+$/,
            message: 'Name must contain only letters, spaces, and hyphens'
          }
        })}
        fullWidth
        sx={{ marginBottom: 2 }}
        error={!!errors.name}
        helperText={errors.name ? errors.name.message : ''}
      />
      <TextField
        label="Weight (kg)"
        type="number"
        {...register('weight')}
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label="Series*"
        type="number"
        {...register('series', {
          required: 'Please put at least 1',
          pattern: {
            value: /^[1-9][0-9]*$/,
            message: 'Must be at least 1 series'
          }
        })}
        fullWidth
        sx={{ marginBottom: 2 }}
        error={!!errors.series}
        helperText={errors.series ? errors.series.message : ''}
      />
      <TextField
        label="Repetitions*"
        type="number"
        {...register('repetitions', {
          required: 'Please put at least 1',
          pattern: {
            value: /^[1-9][0-9]*$/,
            message: 'Must be at least 1 repetition'
          }
        })}
        fullWidth
        sx={{ marginBottom: 2 }}
        error={!!errors.repetitions}
        helperText={errors.repetitions ? errors.repetitions.message : ''}
      />

      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        mt={2}
      >
        <Button type="submit" variant="contained" color="primary">
          Save
        </Button>
      </Box>
    </Box>
  )
}

AddExerciseForm.propTypes = {
  onAddExercise: PropTypes.func.isRequired,
  workoutId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}
