import { Module } from '@nestjs/common'
import { AuthenticationApplicationModule } from './authentication/application'
import { AuthorizationApplicationModule } from './authorization/application'
import { UserApplicationModule } from './user/application'

import { BlockchainApplicationModule } from './blockchain/application'

import { PublicKeyApplicationModule } from './publicKey/application'

import { CryptocurrencyApplicationModule } from './cryptocurrency/application'

import { NftApplicationModule } from './nft/application'

import { PortfolioApplicationModule } from './portfolio/application'

import { PortfolioItemApplicationModule } from './portfolioItem/application'

import { AiApplicationModule } from './ai/application/ai.application.module'
import { NotificationApplicationModule } from './notification/application/notification.application.module'
import { UploadApplicationModule } from './upload/application/upload.application.module'

@Module({
  imports: [
    AuthenticationApplicationModule,
    UserApplicationModule,
    AuthorizationApplicationModule,
    NotificationApplicationModule,
    AiApplicationModule,
    UploadApplicationModule,

    BlockchainApplicationModule,

    PublicKeyApplicationModule,

    CryptocurrencyApplicationModule,

    NftApplicationModule,

    PortfolioApplicationModule,

    PortfolioItemApplicationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppApplicationModule {}
