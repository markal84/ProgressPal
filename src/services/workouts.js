import axios from 'axios'
const API_URL = 'api/workouts'

let token = null

function setToken(newToken) {
  token = `Bearer ${newToken}`
}

async function getAll(user) {
  const params = { id: user.id }
  const req = axios.get(API_URL, { params })
  const res = await req
  return res.data
}

async function create(newObject) {
  const config = {
    headers: { Authorization: token }
  }

  const req = axios.post(API_URL, newObject, config)
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
  remove,
  setToken
}
