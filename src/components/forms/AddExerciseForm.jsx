import { useState } from 'react'
// import exerciseService from '../../services/exercises'

export default function AddExerciseForm({ onAddExercise, workoutId }) {
  const [showForm, setShowForm] = useState(false)
  const [name, setName] = useState('')
  const [weight, setWeight] = useState(0)
  const [series, setSeries] = useState(0)
  const [repetitions, setRepetitions] = useState(0)

  async function handleSubmit(e) {
    e.preventDefault()
    const newExercise = {
      name,
      weight,
      series,
      repetitions
    }

    onAddExercise(newExercise, workoutId)
    console.log('create exercise form ', newExercise)
    setName('')
    setWeight(0)
    setSeries(0)
    setRepetitions(0)
    setShowForm(false)
  }

  if (!showForm) {
    return <button onClick={() => setShowForm(true)}>Add Exercise</button>
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <label>
        Weight:
        <input
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />
      </label>
      <label>
        Series:
        <input
          type="number"
          value={series}
          onChange={(e) => setSeries(e.target.value)}
        />
      </label>
      <label>
        Repetitions:
        <input
          type="number"
          value={repetitions}
          onChange={(e) => setRepetitions(e.target.value)}
        />
      </label>
      <button type="submit">Save</button>
      <button type="button" onClick={() => setShowForm(false)}>
        Cancel
      </button>
    </form>
  )
}
