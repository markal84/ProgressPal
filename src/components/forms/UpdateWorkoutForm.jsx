import { useState } from 'react'
import { PropTypes } from 'prop-types'

export default function UpdateWorkoutForm({ workout, onUpdateWorkout }) {
  const [editMode, setEditMode] = useState(false)
  const [editedWorkout, setEditedWorkout] = useState(workout)

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
    <>
      <button onClick={() => setEditMode(!editMode)}>
        {editMode ? 'Cancel' : 'Edit'}
      </button>
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
    </>
  )
}

UpdateWorkoutForm.propTypes = {
  workout: PropTypes.object.isRequired,
  onUpdateWorkout: PropTypes.func.isRequired
}
