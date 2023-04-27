import axios from 'axios'
const API_URL = 'http://localhost:3001/api/workouts'

async function getAll() {
  const req = axios.get(API_URL)
  const res = await req
  return res.data
}

async function create(newObject) {
  const req = axios.post(API_URL, newObject)
  const res = await req
  return res.data
}

async function update(id, newObject) {
  const req = axios.put(`${API_URL}/${id}`, newObject)
  const res = await req
  return res.data
}

async function remove(id) {
  const req = axios.delete(`${API_URL}/${id}`)
  const res = await req
  return res.data
}

export default {
  getAll,
  create,
  update,
  remove
}
