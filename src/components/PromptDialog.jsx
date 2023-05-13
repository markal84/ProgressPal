import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography
} from '@mui/material'
import { PropTypes } from 'prop-types'

export default function PromptDialog({
  open,
  title,
  message,
  onCancel,
  onConfirm
}) {
  return (
    <Dialog open={open} onClose={onCancel}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Typography variant="body1">{message}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} color="primary" variant="contained">
          No
        </Button>
        <Button onClick={onConfirm} autoFocus color="error" variant="contained">
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  )
}

PromptDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired
}
