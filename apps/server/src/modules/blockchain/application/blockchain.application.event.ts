export namespace BlockchainApplicationEvent {
  export namespace BlockchainCreated {
    export const key = 'blockchain.application.blockchain.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
