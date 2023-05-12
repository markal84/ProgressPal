import { useState, useRef } from 'react'
import exerciseService from '../services/exercises'
import workoutService from '../services/workouts'
import Exercise from './Exercise'
import AddExerciseForm from './forms/AddExerciseForm'
import Togglable from './Togglable'
import { PropTypes } from 'prop-types'

export default function ExerciseList({ workout, setWorkouts }) {
  const [exercises, setExercises] = useState(workout.exercises)

  const exerciseFormRef = useRef()

  function handleAddExercise(newExercise) {
    exerciseFormRef.current.toggleVisibility()
    exerciseService
      .create(newExercise, workout.id)
      .then((createdExercise) => {
        setExercises([...exercises, createdExercise])
      })
      .then(() => {
        workoutService.getAll().then((updatedWorkouts) => {
          setWorkouts(updatedWorkouts)
        })
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
      .then(() => {
        workoutService.getAll().then((updatedWorkouts) => {
          setWorkouts(updatedWorkouts)
        })
      })
      .catch((error) => console.log(error))
  }

  function handleDeleteExercise(exerciseId) {
    exerciseService
      .remove(workout.id, exerciseId)
      .then(() => {
        setExercises(exercises.filter((e) => e.id !== exerciseId))
      })
      .then(() => {
        workoutService.getAll().then((updatedWorkouts) => {
          setWorkouts(updatedWorkouts)
        })
      })
      .catch((error) => console.log(error))
  }

  const addWorkoutForm = () => {
    return (
      <Togglable buttonLabel="add exercise" ref={exerciseFormRef}>
        <AddExerciseForm
          onAddExercise={handleAddExercise}
          workoutId={workout.id}
        />
      </Togglable>
    )
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
      {addWorkoutForm()}
    </>
  )
}

ExerciseList.propTypes = {
  workout: PropTypes.object.isRequired,
  setWorkouts: PropTypes.func
}
