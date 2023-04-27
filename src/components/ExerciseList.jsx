import { useState } from 'react'
import Exercise from './Exercise'
import AddExerciseForm from './forms/AddExerciseForm'

export default function ExerciseList({ workout }) {
  const [exercises, setExercises] = useState(workout.exercises)

  const handleAddExercise = (newExercise) => {
    setExercises([...exercises, newExercise])
  }
  return (
    <>
      <div>
        <ul>
          Exercises:
          {workout.exercises.map((exercise) => {
            return <Exercise key={exercise.id} exercise={exercise} />
          })}
        </ul>
      </div>
      <AddExerciseForm onAddExercise={handleAddExercise} />
    </>
  )
}
