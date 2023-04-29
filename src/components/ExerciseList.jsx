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

  function handleDeleteExercise(exerciseId) {
    exerciseService.remove(workout.id, exerciseId).then(() => {
      setExercises(exercises.filter((e) => e.id !== exerciseId))
      console.log(`delete done`)
    })
  }

  return (
    <>
      <div>
        <ul>
          Exercises:
          {exercises.map((exercise) => {
            return (
              <Exercise
                key={exercise.id}
                exercise={exercise}
                onDeleteExercise={handleDeleteExercise}
              />
            )
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
