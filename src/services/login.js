import axios from 'axios'
import { LOGIN } from '../config'

const login = async (credentials) => {
  const response = await axios.post(LOGIN, credentials)
  return response.data
}

export default { login }
