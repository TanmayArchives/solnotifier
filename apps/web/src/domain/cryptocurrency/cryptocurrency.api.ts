import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { Cryptocurrency } from './cryptocurrency.model'

export class CryptocurrencyApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<Cryptocurrency>,
  ): Promise<Cryptocurrency[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/cryptocurrencys${buildOptions}`)
  }

  static findOne(
    cryptocurrencyId: string,
    queryOptions?: ApiHelper.QueryOptions<Cryptocurrency>,
  ): Promise<Cryptocurrency> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/cryptocurrencys/${cryptocurrencyId}${buildOptions}`,
    )
  }

  static createOne(values: Partial<Cryptocurrency>): Promise<Cryptocurrency> {
    return HttpService.api.post(`/v1/cryptocurrencys`, values)
  }

  static updateOne(
    cryptocurrencyId: string,
    values: Partial<Cryptocurrency>,
  ): Promise<Cryptocurrency> {
    return HttpService.api.patch(
      `/v1/cryptocurrencys/${cryptocurrencyId}`,
      values,
    )
  }

  static deleteOne(cryptocurrencyId: string): Promise<void> {
    return HttpService.api.delete(`/v1/cryptocurrencys/${cryptocurrencyId}`)
  }
}
