export namespace PortfolioItemApplicationEvent {
  export namespace PortfolioItemCreated {
    export const key = 'portfolioItem.application.portfolioItem.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
