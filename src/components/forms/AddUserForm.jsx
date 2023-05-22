import { useForm } from 'react-hook-form'
import { Box, Button, TextField, Typography } from '@mui/material'
import { PropTypes } from 'prop-types'
import validatePassword from '../../utilis/passValidator'

const UserRegisterForm = ({ handleRegister }) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  async function onSubmit(data) {
    await handleRegister(data.username, data.name, data.password)
  }

  return (
    <Box
      sx={{
        maxWidth: 320,
        margin: '0 auto',
        padding: 2
      }}
    >
      <Typography variant="h5" component="h2" gutterBottom>
        Register
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="Username"
          type="text"
          {...register('username', {
            required: 'Username is required',
            minLength: {
              value: 4,
              message: 'Username must be at least 4 characters long'
            },
            pattern: {
              value: /^[a-zA-Z0-9]+(_[a-zA-Z0-9]+)*$/,
              message: 'Username must contain only letters, numbers'
            }
          })}
          fullWidth
          margin="normal"
          variant="standard"
          error={!!errors.username}
          helperText={errors.username ? errors.username.message : ''}
        />

        <TextField
          label="Name"
          type="text"
          {...register('name', {
            minLength: {
              value: 2,
              message: 'Name must be at least 2 characters long'
            },
            pattern: {
              value: /^[A-Za-z]+(?: [A-Za-z]+)?$/,
              message: 'Name must contain letters only'
            }
          })}
          fullWidth
          margin="normal"
          variant="standard"
          error={!!errors.name}
          helperText={errors.name ? errors.name.message : ''}
        />

        <TextField
          label="Password"
          type="password"
          {...register('password', {
            required: 'Password is required',
            validate: (value) =>
              validatePassword(value) === 'Valid' || validatePassword(value)
          })}
          fullWidth
          margin="normal"
          variant="standard"
          error={!!errors.password}
          helperText={errors.password ? errors.password.message : ''}
        />

        <Button type="submit" variant="contained" color="primary" fullWidth>
          Register
        </Button>
      </form>
    </Box>
  )
}

UserRegisterForm.propTypes = {
  handleRegister: PropTypes.func.isRequired
}

export default UserRegisterForm
