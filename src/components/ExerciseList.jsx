import { useState } from 'react'
import Exercise from './Exercise'
import AddExerciseForm from './forms/AddExerciseForm'

export default function ExerciseList({ workout }) {
  const [exercises, setExercises] = useState(workout.exercises)
  console.log('exercises before add ', exercises)

  function handleAddExercise(newExercise) {
    setExercises([...exercises, newExercise])
    console.log('should update state now and reload component ', exercises)
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
