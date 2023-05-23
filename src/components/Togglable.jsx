import { useState, forwardRef, useImperativeHandle } from 'react'
import { PropTypes } from 'prop-types'
import { Box, Button, IconButton, Dialog } from '@mui/material'
import { Edit } from '@mui/icons-material'

const Togglable = forwardRef((props, ref) => {
  const [open, setOpen] = useState(false)

  function toggleOpen() {
    setOpen(!open)
  }

  useImperativeHandle(ref, () => ({
    open: toggleOpen
  }))

  return (
    <Box display="flex" alignItems="center">
      {props.mode === 'edit' ? (
        <IconButton color="primary" onClick={toggleOpen}>
          <Edit />
        </IconButton>
      ) : (
        <Button variant="outlined" onClick={toggleOpen}>
          {props.buttonLabel}
        </Button>
      )}

      <Dialog open={open} onClose={toggleOpen}>
        <Box sx={{ padding: '1rem' }}>{props.children}</Box>
      </Dialog>
    </Box>
  )
})

Togglable.displayName = 'Togglable'
Togglable.propTypes = {
  buttonLabel: PropTypes.string,
  mode: PropTypes.string,
  children: PropTypes.node
}

export default Togglable
