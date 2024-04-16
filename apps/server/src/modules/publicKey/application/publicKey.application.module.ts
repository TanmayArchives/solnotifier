import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { PublicKeyDomainModule } from '../domain'
import { PublicKeyController } from './publicKey.controller'

import { UserDomainModule } from '../../../modules/user/domain'

import { PublicKeyByUserController } from './publicKeyByUser.controller'

import { BlockchainDomainModule } from '../../../modules/blockchain/domain'

import { PublicKeyByBlockchainController } from './publicKeyByBlockchain.controller'

@Module({
  imports: [
    AuthenticationDomainModule,
    PublicKeyDomainModule,

    UserDomainModule,

    BlockchainDomainModule,
  ],
  controllers: [
    PublicKeyController,

    PublicKeyByUserController,

    PublicKeyByBlockchainController,
  ],
  providers: [],
})
export class PublicKeyApplicationModule {}
