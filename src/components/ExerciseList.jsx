import { useState } from 'react'
import exerciseService from '../services/exercises'
import Exercise from './Exercise'
import AddExerciseForm from './forms/AddExerciseForm'

export default function ExerciseList({ workout }) {
  const [exercises, setExercises] = useState(workout.exercises)

  function handleAddExercise(newExercise) {
    exerciseService
      .create(newExercise, workout.id)
      .then((createdExercise) => {
        setExercises([...exercises, createdExercise])
      })
      .catch((error) => console.log(error))
  }

  return (
    <>
      <div>
        <ul>
          Exercises:
          {exercises.map((exercise) => {
            return <Exercise key={exercise.id} exercise={exercise} />
          })}
        </ul>
      </div>
      <AddExerciseForm
        onAddExercise={handleAddExercise}
        workoutId={workout.id}
      />
    </>
  )
}
