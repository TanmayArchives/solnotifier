import { PortfolioItem } from '../portfolioItem'

export class Cryptocurrency {
  id: string

  symbol: string

  name: string

  dateCreated: string

  dateDeleted?: string

  dateUpdated: string

  portfolioItems?: PortfolioItem[]
}
