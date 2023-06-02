import axios from 'axios'
import { USERS } from '../config'

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
