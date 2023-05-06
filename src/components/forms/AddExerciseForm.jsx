import { useState } from 'react'
import { PropTypes } from 'prop-types'
import { Box, Button, TextField } from '@mui/material'

export default function AddExerciseForm({ onAddExercise, workoutId }) {
  const [name, setName] = useState('')
  const [weight, setWeight] = useState(0)
  const [series, setSeries] = useState(1)
  const [repetitions, setRepetitions] = useState(1)

  async function handleSubmit(e) {
    e.preventDefault()
    const newExercise = {
      name,
      weight,
      series,
      repetitions
    }

    onAddExercise(newExercise, workoutId)
    setName('')
    setWeight(0)
    setSeries(1)
    setRepetitions(1)
  }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ marginTop: 2 }}>
      <TextField
        label="Name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
        required
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label="Weight (kg)"
        type="number"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label="Series"
        type="number"
        value={series}
        onChange={(e) => setSeries(e.target.value)}
        fullWidth
        required
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label="Repetitions"
        type="number"
        value={repetitions}
        onChange={(e) => setRepetitions(e.target.value)}
        fullWidth
        required
        sx={{ marginBottom: 2 }}
      />
      <Button type="submit" variant="contained" color="primary">
        Save
      </Button>
    </Box>
  )
}

AddExerciseForm.propTypes = {
  onAddExercise: PropTypes.func.isRequired,
  workoutId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}
