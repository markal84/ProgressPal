import { useState, forwardRef, useImperativeHandle } from 'react'
import { PropTypes } from 'prop-types'
import { Box, Button, IconButton } from '@mui/material'
import { Edit } from '@mui/icons-material'

const Togglable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  function toggleVisibility() {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <Box sx={{ marginBottom: 2 }}>
      <Box sx={{ display: visible ? 'none' : '' }}>
        {props.mode === 'edit' ? (
          <IconButton color="primary" onClick={toggleVisibility}>
            <Edit />
          </IconButton>
        ) : (
          <Button variant="outlined" onClick={toggleVisibility}>
            {props.buttonLabel}
          </Button>
        )}
      </Box>
      <Box sx={{ display: visible ? '' : 'none', marginTop: 1 }}>
        {props.children}
        <Button variant="outlined" onClick={toggleVisibility}>
          Cancel
        </Button>
      </Box>
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
