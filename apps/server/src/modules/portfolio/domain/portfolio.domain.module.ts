import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { PortfolioDomainFacade } from './portfolio.domain.facade'
import { Portfolio } from './portfolio.model'

@Module({
  imports: [TypeOrmModule.forFeature([Portfolio]), DatabaseHelperModule],
  providers: [PortfolioDomainFacade, PortfolioDomainFacade],
  exports: [PortfolioDomainFacade],
})
export class PortfolioDomainModule {}
