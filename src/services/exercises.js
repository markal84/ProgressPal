import axios from 'axios'
//import { WORKOUTS } from '../config'
const WORKOUTS = 'https://gymapp-backend-52y9.onrender.com/api/workouts'

async function create(newObject, workoutId) {
  const req = axios.post(`${WORKOUTS}/${workoutId}/exercises`, newObject)
  const res = await req
  return res.data
}

async function update(workoutId, exerciseId, updatedExercise) {
  const req = axios.put(
    `${WORKOUTS}/${workoutId}/exercises/${exerciseId}`,
    updatedExercise
  )
  const res = await req
  return res.data
}

async function remove(workoutId, exerciseId) {
  const req = axios.delete(`${WORKOUTS}/${workoutId}/exercises/${exerciseId}`)
  const res = await req
  return res.data
}

export default {
  create,
  update,
  remove
}
