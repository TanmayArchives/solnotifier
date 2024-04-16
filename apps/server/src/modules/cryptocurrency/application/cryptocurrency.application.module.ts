import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { CryptocurrencyDomainModule } from '../domain'
import { CryptocurrencyController } from './cryptocurrency.controller'

@Module({
  imports: [AuthenticationDomainModule, CryptocurrencyDomainModule],
  controllers: [CryptocurrencyController],
  providers: [],
})
export class CryptocurrencyApplicationModule {}
