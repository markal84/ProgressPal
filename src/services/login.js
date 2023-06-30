import axios from 'axios'
//import { LOGIN } from '../config'

const login = async (credentials) => {
  const response = await axios.post(
    'https://gymapp-backend-52y9.onrender.com/api/login',
    credentials
  )
  return response.data
}

export default { login }
