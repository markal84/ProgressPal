import { useState } from 'react'
import { PropTypes } from 'prop-types'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker'
import { parseISO, addDays } from 'date-fns'

export default function AddWorkoutForm({ onAddWorkout }) {
  const [date, setDate] = useState(new Date())
  const maxDate = addDays(new Date(), 0)

  function handleAddWorkout(e) {
    e.preventDefault()

    const newWorkout = {
      date: date.toLocaleDateString('en-US'),
      exercises: []
    }

    onAddWorkout(newWorkout)
    setDate(new Date())
  }

  function handleDateChange(newDate) {
    setDate(newDate)
  }

  return (
    <form onSubmit={handleAddWorkout}>
      <p>Create a new workout</p>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <MobileDatePicker
          label="Date"
          value={date}
          maxDate={maxDate}
          onChange={handleDateChange}
        />
      </LocalizationProvider>
      <button type="submit">Add Workout</button>
    </form>
  )
}

AddWorkoutForm.propTypes = {
  onAddWorkout: PropTypes.func.isRequired
}
