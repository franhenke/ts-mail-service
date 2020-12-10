import * as path from 'path'
const Datastore = require('nedb')

export interface IContact {
  _id?: number
  name: string
  email: string
}

export class Worker {
  private db: Nedb

  constructor() {
    this.db = new Datastore({
      filename: path.join(__dirname, 'contacts.db'),
      autoload: true,
    })
  }

  public listContacts(): Promise<IContact[]> {
    return new Promise((inResolve, inReject) => {
      this.db.find({}, (inError: Error, inDocs: IContact[]) => {
        if (inError) {
          inReject(inError)
        } else {
          inResolve(inDocs)
        }
      })
    })
  }
}
