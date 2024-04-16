import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { PortfolioItemDomainFacade } from './portfolioItem.domain.facade'
import { PortfolioItem } from './portfolioItem.model'

@Module({
  imports: [TypeOrmModule.forFeature([PortfolioItem]), DatabaseHelperModule],
  providers: [PortfolioItemDomainFacade, PortfolioItemDomainFacade],
  exports: [PortfolioItemDomainFacade],
})
export class PortfolioItemDomainModule {}
