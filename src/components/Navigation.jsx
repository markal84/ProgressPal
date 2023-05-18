import { useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Typography, Button, Box } from '@mui/material'
import { PropTypes } from 'prop-types'

export default function Nav({ user, setUser, setMessage }) {
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (
      !user &&
      location.pathname !== '/login' &&
      location.pathname !== '/register'
    ) {
      navigate('/')
    }
  }, [user, location.pathname, navigate])

  function handleLogout() {
    try {
      window.localStorage.removeItem('loggedWorkoutAppUser')
      setUser(null)
      setMessage('You successfully logged out')
      setTimeout(() => {
        setMessage(null)
      }, 2000)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <nav>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '1rem',
          flexWrap: 'wrap',
          padding: '1rem',
          backgroundColor: '#f0f0f0'
        }}
      >
        <Link to="/">Home</Link>
        {user ? (
          <>
            <Link to="/workouts">Workouts</Link>
            <Link to="/account">My Account</Link>
            <Typography variant="body1">{user.name} logged in</Typography>
            <Button
              type="button"
              onClick={handleLogout}
              variant="contained"
              color="secondary"
            >
              Logout
            </Button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </Box>
    </nav>
  )
}

Nav.propTypes = {
  user: PropTypes.object,
  setUser: PropTypes.func.isRequired,
  setMessage: PropTypes.func.isRequired
}
