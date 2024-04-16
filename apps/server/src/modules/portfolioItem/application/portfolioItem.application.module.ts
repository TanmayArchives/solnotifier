import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { PortfolioItemDomainModule } from '../domain'
import { PortfolioItemController } from './portfolioItem.controller'

import { PortfolioDomainModule } from '../../../modules/portfolio/domain'

import { PortfolioItemByPortfolioController } from './portfolioItemByPortfolio.controller'

import { CryptocurrencyDomainModule } from '../../../modules/cryptocurrency/domain'

import { PortfolioItemByCryptocurrencyController } from './portfolioItemByCryptocurrency.controller'

import { NftDomainModule } from '../../../modules/nft/domain'

import { PortfolioItemByNftController } from './portfolioItemByNft.controller'

@Module({
  imports: [
    AuthenticationDomainModule,
    PortfolioItemDomainModule,

    PortfolioDomainModule,

    CryptocurrencyDomainModule,

    NftDomainModule,
  ],
  controllers: [
    PortfolioItemController,

    PortfolioItemByPortfolioController,

    PortfolioItemByCryptocurrencyController,

    PortfolioItemByNftController,
  ],
  providers: [],
})
export class PortfolioItemApplicationModule {}
