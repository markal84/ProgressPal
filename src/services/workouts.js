import axios from 'axios'
// import { WORKOUTS } from '../config'

const WORKOUTS = 'https://gymapp-backend-52y9.onrender.com/api/workouts'

let token = null

function setToken(newToken) {
  token = `Bearer ${newToken}`
}

async function getAll(user) {
  const params = { id: user.id }
  const req = axios.get(WORKOUTS, { params })
  const res = await req
  return res.data
}

async function create(newObject) {
  const config = {
    headers: { Authorization: token }
  }

  const req = axios.post(WORKOUTS, newObject, config)
  const res = await req
  return res.data
}

async function update(id, newObject) {
  const req = axios.put(`${WORKOUTS}/${id}`, newObject)
  const res = await req
  return res.data
}

async function remove(id) {
  const req = axios.delete(`${WORKOUTS}/${id}`)
  const res = await req
  return res.data
}

export default {
  getAll,
  create,
  update,
  remove,
  setToken
}
