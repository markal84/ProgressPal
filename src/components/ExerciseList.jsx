import { useState, useRef } from 'react'
import exerciseService from '../services/exercises'
import workoutService from '../services/workouts'
import Exercise from './Exercise'
import AddExerciseForm from './forms/AddExerciseForm'
import { Box, Divider, Grid } from '@mui/material'
import Togglable from './Togglable'
import { PropTypes } from 'prop-types'

export default function ExerciseList({ workout, setWorkouts, user }) {
  const [exercises, setExercises] = useState(workout.exercises)

  const exerciseFormRef = useRef()

  function handleAddExercise(newExercise) {
    exerciseFormRef.current.open()
    exerciseService
      .create(newExercise, workout.id)
      .then((createdExercise) => {
        setExercises([...exercises, createdExercise])
      })
      .then(() => {
        workoutService.getAll(user).then((updatedWorkouts) => {
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
        workoutService.getAll(user).then((updatedWorkouts) => {
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
        workoutService.getAll(user).then((updatedWorkouts) => {
          setWorkouts(updatedWorkouts)
        })
      })
      .catch((error) => console.log(error))
  }

  const addExerciseForm = () => {
    return (
      <Togglable ref={exerciseFormRef}>
        <AddExerciseForm
          onAddExercise={handleAddExercise}
          workoutId={workout.id}
        />
      </Togglable>
    )
  }

  const exercisesList = exercises.map((exercise) => {
    return (
      <Grid item key={exercise.id}>
        <Exercise
          exercise={exercise}
          workout={workout}
          onDeleteExercise={handleDeleteExercise}
          onUpdateExercise={handleUpdateExercise}
        />
        <Divider />
      </Grid>
    )
  })

  return (
    <Grid container display="block">
      <Grid item>
        <Box display="flex" alignItems="flex-start" justifyContent="flex-start">
          {addExerciseForm()}
        </Box>
      </Grid>
      <Box>{exercisesList}</Box>
    </Grid>
  )
}

ExerciseList.propTypes = {
  workout: PropTypes.object.isRequired,
  setWorkouts: PropTypes.func,
  user: PropTypes.object
}
