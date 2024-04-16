export namespace CryptocurrencyApplicationEvent {
  export namespace CryptocurrencyCreated {
    export const key = 'cryptocurrency.application.cryptocurrency.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
