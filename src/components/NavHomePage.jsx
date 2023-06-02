import { Box, Button } from '@mui/material'
import { PropTypes } from 'prop-types'

export default function NavHomePage({ activeForm, setActiveForm }) {
  const handleButtonClick = (button) => {
    setActiveForm(button)
  }

  return (
    <Box display="flex" justifyContent="center" mt={4} mb={4}>
      <Button
        variant="outlined"
        color="primary"
        size="small"
        onClick={() => handleButtonClick('login')}
        sx={{ marginRight: 2 }}
        disabled={activeForm === 'login'}
      >
        Login
      </Button>
      <Button
        variant="outlined"
        color="primary"
        sx={{ marginLeft: 2 }}
        size="small"
        onClick={() => handleButtonClick('register')}
        disabled={activeForm === 'register'}
      >
        Register
      </Button>
    </Box>
  )
}

NavHomePage.propTypes = {
  setActiveForm: PropTypes.func.isRequired,
  activeForm: PropTypes.string
}
