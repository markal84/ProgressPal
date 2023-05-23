import ThemeSwitch from '../components/ThemeSwitch'
import { Typography, useMediaQuery, Box, useTheme } from '@mui/material'

export default function Header() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <Box>
      <ThemeSwitch />
      <Typography align="center" variant={isMobile ? 'h3' : 'h1'} gutterBottom>
        ProgressPal
      </Typography>
    </Box>
  )
}
