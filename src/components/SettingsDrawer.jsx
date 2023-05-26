import { useState } from 'react'
import ThemeSwitch from './ThemeSwitch'
import SettingsIcon from '@mui/icons-material/Settings'
import { Box, Divider, List, ListItem, Drawer } from '@mui/material'

export default function SettingsDrawer() {
  const [open, setOpen] = useState(false)

  const toggleDrawer = (isOpen) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return
    }

    setOpen(isOpen)
  }

  return (
    <Box display="flex" justifyContent="flex-end" alignItems="center" mt={2}>
      <SettingsIcon onClick={toggleDrawer(true)} />
      <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
        <List>
          <ListItem></ListItem>
          <ListItem>
            <ThemeSwitch />
          </ListItem>
          <Divider />
        </List>
      </Drawer>
    </Box>
  )
}
