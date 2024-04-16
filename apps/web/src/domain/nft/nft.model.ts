import { Blockchain } from '../blockchain'

import { PortfolioItem } from '../portfolioItem'

export class Nft {
  id: string

  name: string

  tokenId: string

  dateCreated: string

  dateDeleted?: string

  dateUpdated: string

  blockchainId: string

  blockchain?: Blockchain

  portfolioItems?: PortfolioItem[]
}
