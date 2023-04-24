import { useState } from 'react'
import Workout from './components/Workout'

function App(props) {
  const [workouts, setWorkouts] = useState(props.workouts)
  const [day, setDay] = useState('')
  const [date, setDate] = useState(new Date())

  function getDayName(dateStr, toLocale) {
    const date = new Date(dateStr)
    return date.toLocaleDateString(toLocale, { weekday: 'long' })
  }

  function handleAddWorkout(e) {
    e.preventDefault()

    const newWorkout = {
      id: workouts.length > 0 ? Math.max(...workouts.map((w) => w.id)) + 1 : 1,
      day: getDayName(date, 'en-US'),
      date: date.toLocaleDateString('en-US'),
      exercises: []
    }

    console.log(newWorkout.date)

    setWorkouts([...workouts, newWorkout])
    setDay('')
    setDate(new Date())
  }

  function handleDateChange(e) {
    setDate(new Date(e.target.value))
    setDay(day)
  }

  return (
    <div>
      <h1>Gym progress app</h1>
      <form onSubmit={handleAddWorkout}>
        <label>
          Date:
          <input
            type="date"
            value={date.toISOString().slice(0, 10)}
            onChange={handleDateChange}
          />
        </label>
        <button type="submit">Add Workout</button>
      </form>
      <div>
        {workouts.map((workout) => (
          <Workout key={workout.id} workout={workout} />
        ))}
      </div>
    </div>
  )
}

export default App
