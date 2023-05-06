import { PropTypes } from 'prop-types'

export default function Notification({ message }) {
  if (message === null) {
    return null
  }

  return <div>{message}</div>
}

Notification.propTypes = {
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}
