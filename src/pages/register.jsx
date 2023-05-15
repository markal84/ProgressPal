import { PropTypes } from 'prop-types'
import userService from '../services/users'
import { useNavigate } from 'react-router'
import UserRegisterForm from '../components/forms/AddUserForm'

export default function Register({ setMessage }) {
  const navigate = useNavigate()

  async function handleRegister(username, name, password) {
    const newUser = {
      username,
      name,
      password
    }
    userService
      .create(newUser)
      .then(() => {
        setMessage('user created')
        setTimeout(() => {
          setMessage(null)
          navigate('/login')
        }, 1500)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const registerForm = () => {
    return <UserRegisterForm handleRegister={handleRegister} />
  }

  return <div>{registerForm()}</div>
}

Register.propTypes = {
  setMessage: PropTypes.func.isRequired
}
