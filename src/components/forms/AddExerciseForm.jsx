import { useState } from 'react'
import exerciseService from '../../services/exercises'

export default function AddExerciseForm({ onAddExercise, workoutId }) {
  const [showForm, setShowForm] = useState(false)
  const [name, setName] = useState('')
  const [weight, setWeight] = useState(0)
  const [series, setSeries] = useState(0)
  const [repetitions, setRepetitions] = useState(0)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newExercise = {
      name,
      weight,
      series,
      repetitions
    }

    try {
      const createdExercise = await exerciseService.create(
        newExercise,
        workoutId
      )
      console.log('created exercise', createdExercise)
      console.log('for workout ', workoutId)

      onAddExercise(createdExercise)
      setName('')
      setWeight(0)
      setSeries(0)
      setRepetitions(0)
      setShowForm(false)
    } catch (error) {
      console.log(error)
    }
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
