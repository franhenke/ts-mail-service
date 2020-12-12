import React from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import Person from '@material-ui/icons/Person'
import ListItemText from '@material-ui/core/ListItemText'

const ContactList = ({ state }) => {
  return (
    <List>
      {state.contacts.map((contact) => {
        return (
          <ListItem
            key={contact}
            button
            onClick={() =>
              state.showContact(contact._id, contact.name, contact.email)
            }
          >
            <ListItemAvatar>
              <Avatar>
                <Person />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={`${contact.name}`} />
          </ListItem>
        )
      })}
    </List>
  )
}

export default ContactList
