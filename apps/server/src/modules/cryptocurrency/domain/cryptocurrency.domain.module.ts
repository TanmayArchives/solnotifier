import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { CryptocurrencyDomainFacade } from './cryptocurrency.domain.facade'
import { Cryptocurrency } from './cryptocurrency.model'

@Module({
  imports: [TypeOrmModule.forFeature([Cryptocurrency]), DatabaseHelperModule],
  providers: [CryptocurrencyDomainFacade, CryptocurrencyDomainFacade],
  exports: [CryptocurrencyDomainFacade],
})
export class CryptocurrencyDomainModule {}
