import { useState } from 'react'

export default function AddWorkoutForm({ onAddWorkout }) {
  const [date, setDate] = useState(new Date())

  function handleAddWorkout(e) {
    e.preventDefault()

    const newWorkout = {
      date: date.toLocaleDateString('en-US'),
      exercises: []
    }

    onAddWorkout(newWorkout)
    setDate(new Date())
  }

  function handleDateChange(e) {
    const selectedDate = new Date(e.target.value)
    setDate(selectedDate)
  }

  return (
    <form onSubmit={handleAddWorkout}>
      <p>Create a new workout</p>
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
