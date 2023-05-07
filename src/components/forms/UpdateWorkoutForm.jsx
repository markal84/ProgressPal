import { useState, useRef } from 'react'
import { PropTypes } from 'prop-types'
import Togglable from '../Togglable'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { addDays, parseISO, formatISO } from 'date-fns'
import enGB from 'date-fns/esm/locale/en-GB/index.js'
import { Button, FormGroup, Typography } from '@mui/material'

export default function UpdateWorkoutForm({ workout, onUpdateWorkout }) {
  const [editedWorkout, setEditedWorkout] = useState(workout)
  const maxDate = addDays(new Date(), 0)
  const parsedDate = parseISO(editedWorkout.date)

  const updateWorkoutFormRef = useRef()

  function handleUpdate(e) {
    e.preventDefault()
    updateWorkoutFormRef.current.toggleVisibility()

    onUpdateWorkout(workout.id, editedWorkout)
  }

  function handleUpdateDateChange(newDate) {
    setEditedWorkout((prevState) => ({
      ...prevState,
      date: formatISO(newDate, { representation: 'date' })
    }))
  }

  const updateWorkoutForm = () => {
    return (
      <Togglable buttonLabel="Edit workout" ref={updateWorkoutFormRef}>
        <form onSubmit={handleUpdate}>
          <Typography variant="h5" component="p" gutterBottom>
            Edit Workout
          </Typography>
          <FormGroup>
            <LocalizationProvider
              dateAdapter={AdapterDateFns}
              adapterLocale={enGB}
            >
              <DatePicker
                label="Date"
                value={parsedDate}
                maxDate={maxDate}
                onChange={handleUpdateDateChange}
              />
            </LocalizationProvider>
          </FormGroup>
          <Button variant="contained" type="submit" sx={{ mt: 2 }}>
            Update
          </Button>
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
