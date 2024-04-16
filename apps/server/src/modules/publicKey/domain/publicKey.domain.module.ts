import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { PublicKeyDomainFacade } from './publicKey.domain.facade'
import { PublicKey } from './publicKey.model'

@Module({
  imports: [TypeOrmModule.forFeature([PublicKey]), DatabaseHelperModule],
  providers: [PublicKeyDomainFacade, PublicKeyDomainFacade],
  exports: [PublicKeyDomainFacade],
})
export class PublicKeyDomainModule {}
