import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { PortfolioDomainModule } from '../domain'
import { PortfolioController } from './portfolio.controller'

import { UserDomainModule } from '../../../modules/user/domain'

import { PortfolioByUserController } from './portfolioByUser.controller'

@Module({
  imports: [
    AuthenticationDomainModule,
    PortfolioDomainModule,

    UserDomainModule,
  ],
  controllers: [PortfolioController, PortfolioByUserController],
  providers: [],
})
export class PortfolioApplicationModule {}
