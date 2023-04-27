import { useState } from 'react'
import ExerciseList from './ExerciseList'
import formatDate from '../utilis/dateFormat'

export default function Workout({ workout, onDeleteWorkout, onUpdateWorkout }) {
  const [editMode, setEditMode] = useState(false)
  const [editedWorkout, setEditedWorkout] = useState(workout)

  const formattedDate = formatDate(workout.date)

  function handleDeleteClick() {
    onDeleteWorkout(workout.id)
  }

  function handleEditClick() {
    setEditMode(true)
  }

  function handleUpdate(e) {
    e.preventDefault()

    onUpdateWorkout(workout.id, editedWorkout)
    setEditMode(false)
  }

  function handleUpdateInputChange(e) {
    const { name, value } = e.target
    setEditedWorkout((prevState) => ({
      ...prevState,
      [name]: value
    }))
  }

  return (
    <div>
      <h2>
        Day: {workout.day} - {formattedDate}
      </h2>
      <button onClick={handleDeleteClick}>Delete</button>
      <button onClick={handleEditClick}>Edit</button>
      {editMode && (
        <div>
          <form>
            <label htmlFor="date">
              Date:
              <input
                type="date"
                name="date"
                value={editedWorkout.date}
                max={new Date().toISOString().slice(0, 10)}
                onChange={handleUpdateInputChange}
              />
            </label>
            <button type="submit" onClick={handleUpdate}>
              Update
            </button>
          </form>
        </div>
      )}
      <ExerciseList workout={workout} />
    </div>
  )
}
