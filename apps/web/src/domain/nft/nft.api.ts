import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { Nft } from './nft.model'

export class NftApi {
  static findMany(queryOptions?: ApiHelper.QueryOptions<Nft>): Promise<Nft[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/nfts${buildOptions}`)
  }

  static findOne(
    nftId: string,
    queryOptions?: ApiHelper.QueryOptions<Nft>,
  ): Promise<Nft> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/nfts/${nftId}${buildOptions}`)
  }

  static createOne(values: Partial<Nft>): Promise<Nft> {
    return HttpService.api.post(`/v1/nfts`, values)
  }

  static updateOne(nftId: string, values: Partial<Nft>): Promise<Nft> {
    return HttpService.api.patch(`/v1/nfts/${nftId}`, values)
  }

  static deleteOne(nftId: string): Promise<void> {
    return HttpService.api.delete(`/v1/nfts/${nftId}`)
  }

  static findManyByBlockchainId(
    blockchainId: string,
    queryOptions?: ApiHelper.QueryOptions<Nft>,
  ): Promise<Nft[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/blockchains/blockchain/${blockchainId}/nfts${buildOptions}`,
    )
  }

  static createOneByBlockchainId(
    blockchainId: string,
    values: Partial<Nft>,
  ): Promise<Nft> {
    return HttpService.api.post(
      `/v1/blockchains/blockchain/${blockchainId}/nfts`,
      values,
    )
  }
}
