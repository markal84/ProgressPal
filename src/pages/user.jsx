import { useState } from 'react'
import { PropTypes } from 'prop-types'
import userServices from '../services/users'
import PromptDialog from '../components/PromptDialog'
import { useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'

export default function User({ user, setUser }) {
  const navigate = useNavigate()
  const [dialogOpen, setDialogOpen] = useState(false)

  function onRemove(user) {
    userServices.remove(user.id)
    window.localStorage.removeItem('loggedWorkoutAppUser')
    setUser(null)
    navigate('/')
  }

  function handleOpenDialog() {
    setDialogOpen(true)
  }

  function handleCloseDialog() {
    setDialogOpen(false)
  }

  if (user) {
    return (
      <div>
        <h2>User Account Page</h2>
        <p>User Name: {user.name}</p>
        <Button
          variant="contained"
          color="error"
          onClick={handleOpenDialog}
          disabled={user.username === 'DemoUser'}
        >
          Remove User
        </Button>
        <PromptDialog
          open={dialogOpen}
          title="Delete User"
          message="Are you sure you want to delete your account?"
          onCancel={handleCloseDialog}
          onConfirm={() => {
            onRemove(user)
            handleCloseDialog()
          }}
        />
      </div>
    )
  }

  return null
}

User.propTypes = {
  user: PropTypes.object,
  setUser: PropTypes.func.isRequired
}
