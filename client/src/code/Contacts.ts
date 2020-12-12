import Axios, { AxiosResponse } from 'axios'
import { config } from './config'

export interface IContact {
  _id?: number
  name: string
  email: string
}

export class Worker {
  public async listContacts(): Promise<IContact[]> {
    const response: AxiosResponse = await Axios.get(
      `${config.serverAddress}/contacts`
    )
    return response.data
  }
}
