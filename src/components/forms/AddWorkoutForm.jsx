import { useState } from 'react'
import workoutService from '../../services/workouts'

export default function AddWorkoutForm({ onAddWorkout }) {
  const [day, setDay] = useState('')
  const [date, setDate] = useState(new Date())

  function getDayName(dateStr, toLocale) {
    const date = new Date(dateStr)
    return date.toLocaleDateString(toLocale, { weekday: 'long' })
  }

  function handleAddWorkout(e) {
    e.preventDefault()

    const newWorkout = {
      day: getDayName(date, 'en-US'),
      date: date.toLocaleDateString('en-US'),
      exercises: []
    }

    workoutService
      .create(newWorkout)
      .then((returnedWorkout) => {
        onAddWorkout(returnedWorkout)
        setDay('')
        setDate(new Date())
      })
      .catch((error) => {
        console.log(error)
      })
  }

  function handleDateChange(e) {
    const selectedDate = new Date(e.target.value)
    setDate(selectedDate)
    setDay(day)
  }

  return (
    <form onSubmit={handleAddWorkout}>
      <label>
        Date:
        <input
          type="date"
          value={date.toISOString().slice(0, 10)}
          max={new Date().toISOString().slice(0, 10)}
          onChange={handleDateChange}
        />
      </label>
      <button type="submit">Add Workout</button>
    </form>
  )
}
