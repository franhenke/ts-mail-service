import {
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core'
import { Dialog } from 'material-ui'
import React, { Component } from 'react'
import { createState } from '../state'

class BaseLayout extends Component {
  state = createState(this)

  render() {
    return (
      <div className="appContainer">
        <Dialog
          open={this.state.pleaseWaitVisible}
          disableBackdropClick={true}
          disableEscapeKeyDown={true}
          transitionDuration={0}
        >
          <DialogTitle style={{ textAlign: 'center' }}>Please Wait</DialogTitle>
          <DialogContent>
            <DialogContentText>...Connecting to server...</DialogContentText>
          </DialogContent>
        </Dialog>
      </div>
    )
  }
}

export default BaseLayout
