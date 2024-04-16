export namespace PublicKeyApplicationEvent {
  export namespace PublicKeyCreated {
    export const key = 'publicKey.application.publicKey.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
