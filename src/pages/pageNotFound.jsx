import { Box, Typography } from '@mui/material'
export default function PageNotFound() {
  return (
    <Box
      component="section"
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{
        maxWidth: '80%',
        height: '100vh',
        margin: '0 auto',
        textAlign: 'center'
      }}
    >
      <Typography variant="h2">Sorry, page not found</Typography>
    </Box>
  )
}
