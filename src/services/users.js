import axios from 'axios'
//import { USERS } from '../config'
const USERS = 'https://gymapp-backend-52y9.onrender.com/api/users'

async function create(newUser) {
  const req = axios.post(USERS, newUser)
  const res = await req
  return res.data
}

async function remove(id) {
  const req = axios.delete(`${USERS}/${id}`)
  const res = await req
  return res.data
}

export default {
  create,
  remove
}
