import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from './authentication/domain'
import { AuthorizationDomainModule } from './authorization/domain'

import { UserDomainModule } from './user/domain'

import { NotificationDomainModule } from './notification/domain'

import { BlockchainDomainModule } from './blockchain/domain'

import { PublicKeyDomainModule } from './publicKey/domain'

import { CryptocurrencyDomainModule } from './cryptocurrency/domain'

import { NftDomainModule } from './nft/domain'

import { PortfolioDomainModule } from './portfolio/domain'

import { PortfolioItemDomainModule } from './portfolioItem/domain'

@Module({
  imports: [
    AuthenticationDomainModule,
    AuthorizationDomainModule,
    UserDomainModule,
    NotificationDomainModule,

    BlockchainDomainModule,

    PublicKeyDomainModule,

    CryptocurrencyDomainModule,

    NftDomainModule,

    PortfolioDomainModule,

    PortfolioItemDomainModule,
  ],
  controllers: [],
  providers: [],
})
export class AppDomainModule {}
