import { useState } from 'react'
import Exercise from './Exercise'
import AddExerciseForm from './forms/AddExerciseForm'

export default function Workout({ workout }) {
  const [exercises, setExercises] = useState(workout.exercises)

  const handleAddExercise = (newExercise) => {
    setExercises([...exercises, newExercise])
  }

  return (
    <div>
      <h3>Day: {workout.day}</h3>
      <p>Date: {workout.date}</p>
      <div>
        <ul>
          Exercises:
          {exercises.map((exercise) => {
            return <Exercise key={exercise.id} exercise={exercise} />
          })}
        </ul>
      </div>
      <AddExerciseForm onAddExercise={handleAddExercise} />
    </div>
  )
}
