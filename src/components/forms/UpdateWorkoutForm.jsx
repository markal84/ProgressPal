import { useState, useRef } from 'react'
import { PropTypes } from 'prop-types'
import Togglable from '../Togglable'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { addDays, parseISO, formatISO } from 'date-fns'
import { Button, FormGroup, Typography, Box } from '@mui/material'

export default function UpdateWorkoutForm({ workout, onUpdateWorkout }) {
  const [editedWorkout, setEditedWorkout] = useState(workout)
  const maxDate = addDays(new Date(), 0)
  const parsedDate = parseISO(editedWorkout.date)

  const updateWorkoutFormRef = useRef()

  function handleUpdate(e) {
    e.preventDefault()
    updateWorkoutFormRef.current.open()

    onUpdateWorkout(workout.id, editedWorkout)
  }

  function handleUpdateDateChange(newDate) {
    const formattedDate = formatISO(newDate, { representation: 'date' })
    setEditedWorkout((prevState) => ({
      ...prevState,
      date: formattedDate
    }))
  }

  const toggleOpen = () => {
    updateWorkoutFormRef.current.open()
  }

  const updateWorkoutForm = () => {
    return (
      <Togglable mode="edit" ref={updateWorkoutFormRef}>
        <form onSubmit={handleUpdate}>
          <Box sx={{ marginBottom: 2 }}>
            <Typography variant="h6" gutterBottom>
              Edit Workout
            </Typography>
          </Box>
          <FormGroup>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Date"
                value={parsedDate}
                maxDate={maxDate}
                onChange={handleUpdateDateChange}
              />
            </LocalizationProvider>
          </FormGroup>
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
        </form>
      </Togglable>
    )
  }

  return <>{updateWorkoutForm()}</>
}

UpdateWorkoutForm.propTypes = {
  workout: PropTypes.object.isRequired,
  onUpdateWorkout: PropTypes.func.isRequired
}
