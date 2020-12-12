import { config } from './config'
import * as Contacts from './Contacts'
import * as IMAP from './IMAP'
import * as SMTP from './SMTP'

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

    setCurrentMailbox: function (inPath: string): void {
      this.setState({ currentView: 'welcome', currentMailbox: inPath })
      this.state.getMessages(inPath)
    }.bind(inParentComponent),

    getMessages: async function (inPath: string): Promise<void> {
      this.state.showHidePleaseWait(true)
      const imapWorker: IMAP.Worker = new IMAP.Worker()
      const messages: IMAP.IMessage[] = await imapWorker.listMessages(inPath)
      this.state.showHidePleaseWait(false)
      this.state.clearMessages()
      messages.forEach((inMessage: IMAP.IMessage) => {
        this.state.addMessageToList(inMessage)
      })
    }.bind(inParentComponent),

    clearMessages: function (): void {
      this.setState({ messages: [] })
    }.bind(inParentComponent),

    addMessageToList: function (inMessage: IMAP.IMessage): void {
      const copiedList = this.state.messages.slice(0)
      copiedList.push({
        id: inMessage.id,
        date: inMessage.date,
        from: inMessage.from,
        subject: inMessage.subject,
      })
      this.setState({ messages: copiedList })
    }.bind(inParentComponent),

    showContact: function (
      inID: string,
      inName: string,
      inEmail: string
    ): void {
      this.setState({
        currentView: 'contact',
        contactID: inID,
        contactName: inName,
        contactEmail: inEmail,
      })
    }.bind(inParentComponent),

    fieldOnChange: function (inEvent: any): void {
      if (
        inEvent.target.id === 'contactName' &&
        inEvent.target.value.length > 16
      ) {
        return
      }
      this.setState({ [inEvent.target.id]: inEvent.target.value })
    }.bind(inParentComponent),

    saveContact: async function (): Promise<void> {
      const copiedList = this.state.contacts.slice(0)
      this.state.showHidePleaseWait(true)
      const contactWorker: Contacts.Worker = new Contacts.Worker()
      const contact: Contacts.IContact = await contactWorker.addContact({
        name: this.state.contactName,
        email: this.state.contactEmail,
      })
      this.state.showHidePleaseWait(false)
      copiedList.push(contact)
      this.setState({
        contacts: copiedList,
        contactID: null,
        contactName: '',
        contactEmail: '',
      })
    }.bind(inParentComponent),
  }
}
