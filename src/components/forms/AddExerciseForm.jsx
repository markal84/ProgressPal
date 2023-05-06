import { useState } from 'react'
import { PropTypes } from 'prop-types'

export default function AddExerciseForm({ onAddExercise, workoutId }) {
  const [name, setName] = useState('')
  const [weight, setWeight] = useState(0)
  const [series, setSeries] = useState(1)
  const [repetitions, setRepetitions] = useState(1)

  async function handleSubmit(e) {
    e.preventDefault()
    const newExercise = {
      name,
      weight,
      series,
      repetitions
    }

    onAddExercise(newExercise, workoutId)
    setName('')
    setWeight(0)
    setSeries(1)
    setRepetitions(1)
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
    </form>
  )
}

AddExerciseForm.propTypes = {
  onAddExercise: PropTypes.func.isRequired,
  workoutId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}
