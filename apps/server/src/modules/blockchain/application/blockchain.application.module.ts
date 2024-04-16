import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { BlockchainDomainModule } from '../domain'
import { BlockchainController } from './blockchain.controller'

@Module({
  imports: [AuthenticationDomainModule, BlockchainDomainModule],
  controllers: [BlockchainController],
  providers: [],
})
export class BlockchainApplicationModule {}
