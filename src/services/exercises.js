import axios from 'axios'
const API_URL = 'http://localhost:3001/api/workouts'

async function create(newObject, workoutId) {
  const req = axios.post(`${API_URL}/${workoutId}/exercises`, newObject)
  const res = await req
  return res.data
}

async function update(workoutId, exerciseId, updatedExercise) {
  const req = axios.put(
    `${API_URL}/${workoutId}/exercises/${exerciseId}`,
    updatedExercise
  )
  const res = await req
  return res.data
}

async function remove(workoutId, exerciseId) {
  const req = axios.delete(`${API_URL}/${workoutId}/exercises/${exerciseId}`)
  const res = await req
  return res.data
}

export default {
  create,
  update,
  remove
}
