import { Notification } from '../notification'

import { PublicKey } from '../publicKey'

import { Portfolio } from '../portfolio'

export enum UserStatus {
  CREATED = 'CREATED',
  VERIFIED = 'VERIFIED',
}
export class User {
  id: string
  email: string
  status: UserStatus
  name: string
  pictureUrl: string
  password: string
  dateCreated: string
  dateUpdated: string
  notifications?: Notification[]

  publicKeys?: PublicKey[]

  portfolios?: Portfolio[]
}
