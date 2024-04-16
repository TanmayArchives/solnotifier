import { Portfolio } from '../portfolio'

import { Cryptocurrency } from '../cryptocurrency'

import { Nft } from '../nft'

export class PortfolioItem {
  id: string

  quantity: number

  dateCreated: string

  dateDeleted?: string

  dateUpdated: string

  portfolioId: string

  portfolio?: Portfolio

  cryptocurrencyId?: string

  cryptocurrency?: Cryptocurrency

  nftId?: string

  nft?: Nft
}
