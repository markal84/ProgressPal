import { PropTypes } from 'prop-types'

export default function User({ user }) {
  if (user) {
    return (
      <div>
        user account page
        <p>User name: {user.name}</p>
        <p>change user data will be here</p>
        <p>any other info will be here</p>
      </div>
    )
  }
}

User.propTypes = {
  user: PropTypes.object
}
