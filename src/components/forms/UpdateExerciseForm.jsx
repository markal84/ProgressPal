import { useState, useRef } from 'react'
import { PropTypes } from 'prop-types'
import Togglable from '../Togglable'
import { Box, Button, TextField } from '@mui/material'

export default function UpdateExerciseForm({
  workout,
  exercise,
  onUpdateExercise
}) {
  const [editedExercise, setEditedExercise] = useState(exercise)

  const updateExerciseFormRef = useRef()

  function handleUpdate(e) {
    updateExerciseFormRef.current.toggleVisibility()
    e.preventDefault()
    onUpdateExercise(workout.id, exercise.id, editedExercise)
  }

  function handleUpdateInputChange(e) {
    const { name, value } = e.target
    setEditedExercise((prevState) => ({
      ...prevState,
      [name]: value
    }))
  }

  const updateExerciseForm = () => {
    return (
      <Togglable buttonLabel="Edit Exercise" ref={updateExerciseFormRef}>
        <Box component="form" onSubmit={handleUpdate}>
          <TextField
            label="Name"
            name="name"
            value={editedExercise.name}
            onChange={handleUpdateInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Weight"
            name="weight"
            type="number"
            value={editedExercise.weight}
            onChange={handleUpdateInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Series"
            name="series"
            type="number"
            value={editedExercise.series}
            onChange={handleUpdateInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Repetitions"
            name="repetitions"
            type="number"
            value={editedExercise.repetitions}
            onChange={handleUpdateInputChange}
            fullWidth
            margin="normal"
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
