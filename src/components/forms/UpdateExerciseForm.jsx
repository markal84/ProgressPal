import { useState } from 'react'

export default function UpdateExerciseForm({
  workout,
  exercise,
  onUpdateExercise
}) {
  const [editMode, setEditMode] = useState(false)
  const [editedExercise, setEditedExercise] = useState(exercise)

  function handleUpdate(e) {
    e.preventDefault()
    onUpdateExercise(workout.id, exercise.id, editedExercise)
    setEditMode(false)
  }

  function handleUpdateInputChange(e) {
    const { name, value } = e.target
    setEditedExercise((prevState) => ({
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
            <label htmlFor="name">
              Name:
              <input
                type="text"
                name="name"
                defaultValue={editedExercise.name}
                onChange={handleUpdateInputChange}
              />
            </label>
            <label htmlFor="weight">
              Weight:
              <input
                type="number"
                name="weight"
                defaultValue={editedExercise.weight}
                onChange={handleUpdateInputChange}
              />
            </label>
            <label htmlFor="series">
              Series
              <input
                type="number"
                name="series"
                defaultValue={editedExercise.series}
                onChange={handleUpdateInputChange}
              />
            </label>
            <label htmlFor="repetitions">
              Repetitions
              <input
                type="number"
                name="repetitions"
                defaultValue={editedExercise.repetitions}
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
