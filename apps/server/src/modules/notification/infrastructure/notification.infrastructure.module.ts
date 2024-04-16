import { Module } from '@nestjs/common'
import { SocketModule } from '@server/libraries/socket'
import { AuthorizationDomainModule } from '@server/modules/authorization/domain'
import { NotificationDomainModule } from '../domain'

import { NotificationBlockchainSubscriber } from './subscribers/notification.blockchain.subscriber'

import { NotificationPublicKeySubscriber } from './subscribers/notification.publicKey.subscriber'

import { NotificationCryptocurrencySubscriber } from './subscribers/notification.cryptocurrency.subscriber'

import { NotificationNftSubscriber } from './subscribers/notification.nft.subscriber'

import { NotificationPortfolioSubscriber } from './subscribers/notification.portfolio.subscriber'

import { NotificationPortfolioItemSubscriber } from './subscribers/notification.portfolioItem.subscriber'

@Module({
  imports: [AuthorizationDomainModule, NotificationDomainModule, SocketModule],
  providers: [
    NotificationBlockchainSubscriber,

    NotificationPublicKeySubscriber,

    NotificationCryptocurrencySubscriber,

    NotificationNftSubscriber,

    NotificationPortfolioSubscriber,

    NotificationPortfolioItemSubscriber,
  ],
  exports: [],
})
export class NotificationInfrastructureModule {}
