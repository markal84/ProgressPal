import axios from 'axios'
const API_URL = 'http://localhost:3001/workouts' //change to api/workouts/ after switching to server

function getAll() {
  return axios.get(API_URL)
}

function create(newObject) {
  return axios.post(API_URL, newObject)
}

function update(id, newObject) {
  return axios.put(`${API_URL}/${id}`, newObject)
}

export default {
  getAll,
  create,
  update
}
