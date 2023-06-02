import { useState, useEffect } from 'react'
import { Snackbar } from '@mui/material'
import { PropTypes } from 'prop-types'

export default function Notification({ message }) {
  const [open, setOpen] = useState(Boolean(message))

  useEffect(() => {
    setOpen(Boolean(message))
  }, [message])

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Snackbar
      open={open}
      autoHideDuration={3500}
      onClose={handleClose}
      message={message}
    />
  )
}

Notification.propTypes = {
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}
