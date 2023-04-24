import { useState } from 'react'
import Workout from './components/Workout'

function App(props) {
  const [workouts, setWorkouts] = useState(props.workouts)
  const [day, setDay] = useState('')
  const [date, setDate] = useState('')
  // const [showAll, setShowAll] = useState(false)

  function handleAddWorkout(event) {
    event.preventDefault()

    const newWorkout = {
      id: workouts.length + 1,
      day,
      date,
      exercises: []
    }

    console.log(newWorkout)

    setWorkouts([...workouts, newWorkout])

    setDay('')
    setDate('')
  }

  function handleDayChange(event) {
    setDay(event.target.value)
    console.log(event.target.value)
  }

  function handleDateChange(event) {
    setDate(event.target.value)
  }

  // const workoutsToShow = showAll ? workouts : workouts.filter((workout) => workout.important)

  return (
    <>
      <div>
        <h1>Gym progress app</h1>
        <div>
          <button>This button will show hide some data</button>
        </div>
        <form onSubmit={handleAddWorkout}>
          <label htmlFor="day">Day:</label>
          <input type="text" id="day" value={day} onChange={handleDayChange} />

          <label htmlFor="date">Date:</label>
          <input
            type="text"
            id="date"
            value={date}
            onChange={handleDateChange}
          />

          <button type="submit">Add Workout</button>
        </form>
        <div>
          {workouts.map((workout) => (
            <Workout key={workout.id} workout={workout} />
          ))}
        </div>
      </div>
    </>
  )
}

export default App
