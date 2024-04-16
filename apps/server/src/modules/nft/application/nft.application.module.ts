import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { NftDomainModule } from '../domain'
import { NftController } from './nft.controller'

import { BlockchainDomainModule } from '../../../modules/blockchain/domain'

import { NftByBlockchainController } from './nftByBlockchain.controller'

@Module({
  imports: [
    AuthenticationDomainModule,
    NftDomainModule,

    BlockchainDomainModule,
  ],
  controllers: [NftController, NftByBlockchainController],
  providers: [],
})
export class NftApplicationModule {}
