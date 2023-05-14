import { useForm } from 'react-hook-form'
import { PropTypes } from 'prop-types'
import { Box, Button, TextField, Typography } from '@mui/material'

const LoginForm = ({ handleLogin }) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  async function onSubmit(data) {
    await handleLogin(data.username, data.password)
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
        Login
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
          Login
        </Button>
        <Typography variant="body2" gutterBottom>
          Dont have an account? (Register here) link to registration
        </Typography>
      </form>
    </Box>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired
}

export default LoginForm
