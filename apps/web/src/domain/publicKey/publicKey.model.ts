import { User } from '../user'

import { Blockchain } from '../blockchain'

export class PublicKey {
  id: string

  publicKey: string

  dateCreated: string

  dateDeleted?: string

  dateUpdated: string

  userId: string

  user?: User

  blockchainId: string

  blockchain?: Blockchain
}
