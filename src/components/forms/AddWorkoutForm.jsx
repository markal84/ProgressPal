import { useState } from 'react'
import { PropTypes } from 'prop-types'
import { Box, Button, Typography, TextField } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { formatISO } from 'date-fns'

export default function AddWorkoutForm({ onAddWorkout }) {
  const [date, setDate] = useState(null)

  function handleAddWorkout(e) {
    e.preventDefault()

    const newWorkout = {
      date: formatISO(date, { representation: 'date' }),
      exercises: []
    }

    onAddWorkout(newWorkout)
    setDate(null)
  }

  function handleDateChange(newDate) {
    setDate(newDate)
  }

  const isButtonDisabled = date === null

  return (
    <form onSubmit={handleAddWorkout}>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Typography variant="h5" component="p" gutterBottom>
          Create a new workout
        </Typography>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Select workout day"
            value={date}
            format="dd.MM.yyyy"
            disableFuture={true}
            onChange={handleDateChange}
          />
        </LocalizationProvider>
        <Button
          variant="contained"
          type="submit"
          sx={{ mt: 2, mb: 2 }}
          disabled={isButtonDisabled}
        >
          Add Workout
        </Button>
      </Box>
    </form>
  )
}

AddWorkoutForm.propTypes = {
  onAddWorkout: PropTypes.func.isRequired
}
