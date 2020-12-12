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
  }
}
