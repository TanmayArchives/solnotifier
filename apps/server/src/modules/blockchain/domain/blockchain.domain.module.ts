import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { BlockchainDomainFacade } from './blockchain.domain.facade'
import { Blockchain } from './blockchain.model'

@Module({
  imports: [TypeOrmModule.forFeature([Blockchain]), DatabaseHelperModule],
  providers: [BlockchainDomainFacade, BlockchainDomainFacade],
  exports: [BlockchainDomainFacade],
})
export class BlockchainDomainModule {}
