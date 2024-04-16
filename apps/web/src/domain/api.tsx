import { AiApi } from './ai/ai.api'
import { AuthenticationApi } from './authentication/authentication.api'
import { AuthorizationApi } from './authorization/authorization.api'
import { UploadApi } from './upload/upload.api'

import { UserApi } from './user/user.api'

import { NotificationApi } from './notification/notification.api'

import { BlockchainApi } from './blockchain/blockchain.api'

import { PublicKeyApi } from './publicKey/publicKey.api'

import { CryptocurrencyApi } from './cryptocurrency/cryptocurrency.api'

import { NftApi } from './nft/nft.api'

import { PortfolioApi } from './portfolio/portfolio.api'

import { PortfolioItemApi } from './portfolioItem/portfolioItem.api'

export namespace Api {
  export class Ai extends AiApi {}
  export class Authentication extends AuthenticationApi {}
  export class Authorization extends AuthorizationApi {}
  export class Upload extends UploadApi {}

  export class User extends UserApi {}

  export class Notification extends NotificationApi {}

  export class Blockchain extends BlockchainApi {}

  export class PublicKey extends PublicKeyApi {}

  export class Cryptocurrency extends CryptocurrencyApi {}

  export class Nft extends NftApi {}

  export class Portfolio extends PortfolioApi {}

  export class PortfolioItem extends PortfolioItemApi {}
}
