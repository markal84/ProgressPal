import { useState } from 'react'
import { PropTypes } from 'prop-types'
import { Box, Button, TextField, Typography } from '@mui/material'

const LoginForm = ({ handleLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    await handleLogin(username, password)
    setUsername('')
    setPassword('')
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

      <form onSubmit={handleSubmit}>
        <TextField
          label="Username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          fullWidth
          margin="normal"
          variant="outlined"
        />

        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="normal"
          variant="outlined"
        />

        <Button type="submit" variant="contained" color="primary" fullWidth>
          Login
        </Button>
      </form>
    </Box>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired
}

export default LoginForm
