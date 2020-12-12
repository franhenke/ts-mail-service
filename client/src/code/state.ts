import { config } from './config'

export function createState(inParentComponent) {
  return {
    // Flag: Is the please wait dialog visible?
    pleaseWaitVisible: false,

    contacts: [],
    mailboxes: [],
    messages: [],

    // The view that is currently showing ("welcome", "message", "compose", "contact" or "contactAdd").
    currentView: 'welcome',

    currentMailbox: null,
    messageID: null,
    messageDate: null,
    messageFrom: null,
    messageTo: null,
    messageSubject: null,
    messageBody: null,

    contactID: null,
    contactName: null,
    contactEmail: null,

    showHidePleaseWait: function (inVisible: boolean): void {
      this.setState({ pleaseWaitVisible: inVisible })
    }.bind(inParentComponent),

    showComposeMessage: function (inType: string): void {
      switch (inType) {
        case 'new':
          this.setState({
            currentView: 'compose',
            messageTo: '',
            messageSubject: '',
            messageBody: '',
            messageFrom: config.userEmail,
          })
          break

        case 'reply':
          this.setState({
            currentView: 'compose',
            messageTo: this.state.messageFrom,
            messageSubject: `Re: ${this.state.messageSubject}`,
            messageBody: `\n\n---- Original Message ----\n\n${this.state.messageBody}`,
            messageFrom: config.userEmail,
          })
          break

        case 'contact':
          this.setState({
            currentView: 'compose',
            messageTo: this.state.contactEmail,
            messageSubject: '',
            messageBody: '',
            messageFrom: config.userEmail,
          })
          break
      }
    }.bind(inParentComponent),

    showAddContact: function (): void {
      this.setState({
        currentView: 'contactAdd',
        contactID: null,
        contactName: '',
        contactEmail: '',
      })
    }.bind(inParentComponent),
  }
}
