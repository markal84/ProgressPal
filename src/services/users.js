import axios from 'axios'
const USERS_URL = 'api/users'

async function create(newUser) {
  const req = axios.post(USERS_URL, newUser)
  const res = await req
  return res.data
}

export default {
  create
}
