import axios from 'axios'
const API_URL = 'http://localhost:3001/api/workouts'

async function create(newObject, workoutId) {
  const req = axios.post(`${API_URL}/${workoutId}/exercises`, newObject)
  const res = await req
  return res.data
}

export default {
  create
}
