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

  function handleUpdateExercise(workoutId, exerciseId, updatedExercise) {
    exerciseService
      .update(workoutId, exerciseId, updatedExercise)
      .then((returnedExercise) => {
        setExercises(
          exercises.map((e) => (e.id !== exerciseId ? e : returnedExercise))
        )
      })
      .catch((error) => console.log(error))
  }

  function handleDeleteExercise(exerciseId) {
    exerciseService.remove(workout.id, exerciseId).then(() => {
      setExercises(exercises.filter((e) => e.id !== exerciseId))
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
                workout={workout}
                onDeleteExercise={handleDeleteExercise}
                onUpdateExercise={handleUpdateExercise}
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
