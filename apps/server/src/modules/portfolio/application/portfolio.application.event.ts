export namespace PortfolioApplicationEvent {
  export namespace PortfolioCreated {
    export const key = 'portfolio.application.portfolio.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
