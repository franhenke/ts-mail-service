import React from 'react'
import Chip from '@material-ui/core/Chip'
import List from '@material-ui/core/List'

const MailboxList = ({ state }) => {
  return (
    <List>
      {state.mailboxes.map((mailbox) => {
        return (
          <Chip
            label={`${mailbox.name}`}
            onClick={() => state.setCurrentMailbox(mailbox.path)}
            style={{ width: 130, marginBottom: 10 }}
            color={
              state.currentMailbox === mailbox.path ? 'secondary' : 'primary'
            }
          />
        )
      })}
    </List>
  )
}

export default MailboxList
