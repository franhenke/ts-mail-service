import path from 'path'
import express, { Express, NextFunction, Request, Response } from 'express'
import { serverInfo } from './ServerInfo'
import * as IMAP from './IMAP'
import * as SMTP from './SMTP'
import * as Contacts from './Contacts'
import { IContact } from './Contacts'

const app: Express = express()
app.use(express.json())

app.use('/', express.static(path.join(__dirname, '../../client/dist')))

app.use(function (
  inRequest: Request,
  inResponse: Response,
  inNext: NextFunction
) {
  inResponse.header('Access-Control-Allow-Origin', '*')
  inResponse.header(
    'Access-Control-Allow-Methods',
    'GET, POST, DELETE, OPTIONS'
  )
  inResponse.header(
    'Access-Control-Allow-Headers',
    'Origin,X-Requested-With,Content-Type,Accept'
  )
  inNext()
})

app.get('/mailboxes', async (inRequest: Request, inResponse: Response) => {
  try {
    const imapWorker: IMAP.Worker = new IMAP.Worker(serverInfo)
    const mailboxes: IMAP.IMailbox[] = await imapWorker.listMailboxes()
    inResponse.json(mailboxes)
  } catch (inError) {
    inResponse.send('error')
  }
})

app.get(
  '/mailboxes/:mailbox',
  async (inRequest: Request, inResponse: Response) => {
    try {
      const imapWorker: IMAP.Worker = new IMAP.Worker(serverInfo)
      const messages: IMAP.IMessage[] = await imapWorker.listMessages({
        mailbox: inRequest.params.mailbox,
      })
      inResponse.json(messages)
    } catch (inError) {
      inResponse.send('error')
    }
  }
)

app.get(
  '/mailboxes/:mailbox/:id',
  async (inRequest: Request, inResponse: Response) => {
    try {
      const imapWorker: IMAP.Worker = new IMAP.Worker(serverInfo)
      const messageBody: string = await imapWorker.getMessageBody({
        mailbox: inRequest.params.mailbox,
        id: parseInt(inRequest.params.id, 10),
      })
      inResponse.send(messageBody)
    } catch (inError) {
      inResponse.send('error')
    }
  }
)

// Delete a message

app.delete(
  '/messages/:mailbox/:id',
  async (inRequest: Request, inResponse: Response) => {
    try {
      const imapWorker: IMAP.Worker = new IMAP.Worker(serverInfo)
      await imapWorker.deleteMessage({
        mailbox: inRequest.params.mailbox,
        id: parseInt(inRequest.params.id, 10),
      })
      inResponse.send('ok')
    } catch (inError) {
      inResponse.send('error')
    }
  }
)

app.post('/messages', async (inRequest: Request, inResponse: Response) => {
  try {
    const smtpWorker: SMTP.Worker = new SMTP.Worker(serverInfo)
    await smtpWorker.sendMessage(inRequest.body)
    inResponse.send('ok')
  } catch (inError) {
    inResponse.send('error')
  }
})
