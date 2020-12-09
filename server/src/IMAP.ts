const ImapClient = require('emailjs-imap-client')
import { ParsedMail, simpleParser } from 'mailparser'
import { IServerInfo } from './ServerInfo'

export interface ICallOptions {
  mailbox: string
  id?: number
}

export interface IMassage {
  id: string
  date: string
  from: string
  subject: string
  body?: string
}

export interface IMailbox {
  name: string
  path: string
}

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

export class Worker {
  private static serverInfo: IServerInfo

  constructor(inServerInfo: IServerInfo) {
    Worker.serverInfo = inServerInfo
  }

  private async connectToServer(): Promise<string> {
    const client: any = new ImapClient.default(
      Worker.serverInfo.imap.host,
      Worker.serverInfo.imap.port,
      { auth: Worker.serverInfo.imap.auth }
    )
    client.logLevel = client.LOG_LEVEL_NONE
    client.onerror = (inError: Error) => {
      console.log('IMAP.Worker.listMailboxes(): Connection error', inError)
    }
    await client.connect()
    return client
  }

  public async listMailboxes(): Promise<IMailbox[]> {
    const client: any = await this.connectToServer()
    const mailboxes: any = await client.listMailboxes()
    await client.close()
    const finalMailboxes: IMailbox[] = []
    const iterateChildren: Function = (inArray: any[]): void => {
      inArray.forEach((inValue: any) => {
        finalMailboxes.push({
          name: inValue.name,
          path: inValue.path,
        })
        iterateChildren(inValue.children)
      })
    }
    iterateChildren(mailboxes.children)
    return finalMailboxes
  }
}
