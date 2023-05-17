import axios from 'axios'
const USERS_URL = 'api/users'

async function create(newUser) {
  const req = axios.post(USERS_URL, newUser)
  const res = await req
  return res.data
}

async function remove(id) {
  const req = axios.delete(`${USERS_URL}/${id}`)
  const res = await req
  return res.data
}

export default {
  create,
  remove
}
