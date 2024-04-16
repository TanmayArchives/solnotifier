import { User } from '../user'

import { PortfolioItem } from '../portfolioItem'

export class Portfolio {
  id: string

  netWorth: number

  dateCreated: string

  dateDeleted?: string

  dateUpdated: string

  userId: string

  user?: User

  portfolioItems?: PortfolioItem[]
}
