import { PublicKey } from '../publicKey'

import { Nft } from '../nft'

export class Blockchain {
  id: string

  name: string

  dateCreated: string

  dateDeleted?: string

  dateUpdated: string

  publicKeys?: PublicKey[]

  nfts?: Nft[]
}
