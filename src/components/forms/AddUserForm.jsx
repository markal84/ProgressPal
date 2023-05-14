import { useForm } from 'react-hook-form'
import { Box, Button, TextField, Typography } from '@mui/material'
import { PropTypes } from 'prop-types'

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
        padding: 2,
        backgroundColor: '#f5f5f5'
      }}
    >
      <Typography variant="h5" component="h2" gutterBottom>
        Register
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="Username"
          type="text"
          {...register('username', { required: 'Username is required' })}
          fullWidth
          margin="normal"
          variant="outlined"
          error={!!errors.username}
          helperText={errors.username ? errors.username.message : ''}
        />

        <TextField
          label="Name"
          type="text"
          {...register('name', { required: 'Name is required' })}
          fullWidth
          margin="normal"
          variant="outlined"
          error={!!errors.name}
          helperText={errors.name ? errors.name.message : ''}
        />

        <TextField
          label="Password"
          type="password"
          {...register('password', { required: 'Password is required' })}
          fullWidth
          margin="normal"
          variant="outlined"
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
