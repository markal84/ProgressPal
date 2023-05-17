import { useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Typography, Button } from '@mui/material'
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
      <Link style={{ padding: 5 }} to="/">
        home
      </Link>
      {user && (
        <>
          <Link style={{ padding: 5 }} to="/workouts">
            workouts
          </Link>
          <Link style={{ padding: 5 }} to="/account">
            my account
          </Link>
          <Typography variant="body1" gutterBottom>
            {user.name} logged in
          </Typography>
          <Button
            type="button"
            onClick={handleLogout}
            variant="contained"
            color="secondary"
            sx={{ marginBottom: '2rem' }}
          >
            Logout
          </Button>
        </>
      )}
      {!user && (
        <>
          <Link style={{ padding: 5 }} to="/login">
            login
          </Link>
          <Link style={{ padding: 5 }} to="/register">
            register
          </Link>
        </>
      )}
    </nav>
  )
}

Nav.propTypes = {
  user: PropTypes.object,
  setUser: PropTypes.func.isRequired,
  setMessage: PropTypes.func.isRequired
}
