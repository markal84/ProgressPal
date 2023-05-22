import { Box, Button } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'

export default function NavHomePage() {
  return (
    <Box display="flex" justifyContent="center" mt={4} mb={4}>
      <Button
        component={RouterLink}
        to="/login"
        variant="outlined"
        color="primary"
        size="small"
      >
        Login
      </Button>
      <Button
        component={RouterLink}
        to="/register"
        variant="outlined"
        color="primary"
        sx={{ marginLeft: 2 }}
        size="small"
      >
        Register
      </Button>
    </Box>
  )
}
