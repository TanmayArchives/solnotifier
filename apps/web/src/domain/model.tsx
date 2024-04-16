import { AuthorizationRole as AuthorizationRoleModel } from './authorization/authorization.model'

import { User as UserModel } from './user/user.model'

import { Notification as NotificationModel } from './notification/notification.model'

import { Blockchain as BlockchainModel } from './blockchain/blockchain.model'

import { PublicKey as PublicKeyModel } from './publicKey/publicKey.model'

import { Cryptocurrency as CryptocurrencyModel } from './cryptocurrency/cryptocurrency.model'

import { Nft as NftModel } from './nft/nft.model'

import { Portfolio as PortfolioModel } from './portfolio/portfolio.model'

import { PortfolioItem as PortfolioItemModel } from './portfolioItem/portfolioItem.model'

export namespace Model {
  export class AuthorizationRole extends AuthorizationRoleModel {}

  export class User extends UserModel {}

  export class Notification extends NotificationModel {}

  export class Blockchain extends BlockchainModel {}

  export class PublicKey extends PublicKeyModel {}

  export class Cryptocurrency extends CryptocurrencyModel {}

  export class Nft extends NftModel {}

  export class Portfolio extends PortfolioModel {}

  export class PortfolioItem extends PortfolioItemModel {}
}
