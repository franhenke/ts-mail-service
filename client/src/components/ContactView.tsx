import React from 'react'
import Button from '@material-ui/core/Button'
import { TextField } from '@material-ui/core'

const ContactList = ({ state }) => {
  return (
    <TextField
      margin="dense"
      id="contactName"
      label="Name"
      value={state.contactName}
      variant="outlined"
      InputProps={{ style: { color: '#000' } }}
      disabled={state.currentView === 'contact'}
      style={{ width: 260 }}
      onChange={state.fieldOnChange}
    />
  )
}

export default ContactList
