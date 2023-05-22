import { useEffect } from 'react'
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom'
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
      navigate('/')
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
          padding: '1rem'
        }}
      >
        {user && (
          <>
            <Button component={RouterLink} to="/workouts">
              Workouts
            </Button>
            <Button component={RouterLink} to="/account">
              My account
            </Button>
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
