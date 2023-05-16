import axios from 'axios'
const API_URL = 'api/workouts'

let token = null

function setToken(newToken) {
  token = `Bearer ${newToken}`
}

async function getAll(user) {
  const req = axios.get(API_URL)
  const res = await req
  let filteredData = []

  filteredData = res.data.filter((workout) => {
    return workout.user.id === user.id
  })

  return filteredData
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
