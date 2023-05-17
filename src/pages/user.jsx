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
    console.log('user to delete ', user.id)
    userServices.remove(user.id)
    window.localStorage.removeItem('loggedWorkoutAppUser')
    setUser(null)
    console.log('user deleted')
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
        <p>Change user data will be here</p>
        <p>Any other info will be here</p>
        <Button variant="contained" color="error" onClick={handleOpenDialog}>
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
