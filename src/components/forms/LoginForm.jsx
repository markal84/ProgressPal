import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { PropTypes } from 'prop-types'
import { Box, Paper, Button, TextField, Typography } from '@mui/material'

const LoginForm = ({ handleLogin, handleDemoLogin }) => {
  const [errorMessage, setErrorMessage] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  async function onSubmit(data) {
    try {
      await handleLogin(data.username, data.password)
    } catch (error) {
      setErrorMessage(error.message)
    }
  }

  async function handleDemoClick() {
    try {
      await handleDemoLogin()
    } catch (error) {
      setErrorMessage(error.message)
    }
  }

  return (
    <Paper
      sx={{
        margin: '0 auto',
        padding: 2
      }}
      elevation={0}
    >
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>

      {errorMessage && (
        <Typography variant="body2" color="error" gutterBottom>
          {errorMessage}
        </Typography>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="Username"
          type="text"
          {...register('username', { required: 'Username is required' })}
          fullWidth
          margin="normal"
          variant="standard"
          error={!!errors.username}
          helperText={errors.username ? errors.username.message : ''}
        />

        <TextField
          label="Password"
          type="password"
          {...register('password', { required: 'Password is required' })}
          fullWidth
          margin="normal"
          variant="standard"
          error={!!errors.password}
          helperText={errors.password ? errors.password.message : ''}
        />
        <Box sx={{ marginTop: 4 }}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Login
          </Button>
        </Box>
      </form>
      <Box sx={{ marginTop: 2 }}>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleDemoClick}
        >
          Demo User Login
        </Button>
      </Box>
    </Paper>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  handleDemoLogin: PropTypes.func
}

export default LoginForm
