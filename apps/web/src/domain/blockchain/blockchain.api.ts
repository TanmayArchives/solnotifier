import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { Blockchain } from './blockchain.model'

export class BlockchainApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<Blockchain>,
  ): Promise<Blockchain[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/blockchains${buildOptions}`)
  }

  static findOne(
    blockchainId: string,
    queryOptions?: ApiHelper.QueryOptions<Blockchain>,
  ): Promise<Blockchain> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/blockchains/${blockchainId}${buildOptions}`)
  }

  static createOne(values: Partial<Blockchain>): Promise<Blockchain> {
    return HttpService.api.post(`/v1/blockchains`, values)
  }

  static updateOne(
    blockchainId: string,
    values: Partial<Blockchain>,
  ): Promise<Blockchain> {
    return HttpService.api.patch(`/v1/blockchains/${blockchainId}`, values)
  }

  static deleteOne(blockchainId: string): Promise<void> {
    return HttpService.api.delete(`/v1/blockchains/${blockchainId}`)
  }
}
