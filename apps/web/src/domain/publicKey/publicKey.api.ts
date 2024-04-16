import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { PublicKey } from './publicKey.model'

export class PublicKeyApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<PublicKey>,
  ): Promise<PublicKey[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/publicKeys${buildOptions}`)
  }

  static findOne(
    publicKeyId: string,
    queryOptions?: ApiHelper.QueryOptions<PublicKey>,
  ): Promise<PublicKey> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/publicKeys/${publicKeyId}${buildOptions}`)
  }

  static createOne(values: Partial<PublicKey>): Promise<PublicKey> {
    return HttpService.api.post(`/v1/publicKeys`, values)
  }

  static updateOne(
    publicKeyId: string,
    values: Partial<PublicKey>,
  ): Promise<PublicKey> {
    return HttpService.api.patch(`/v1/publicKeys/${publicKeyId}`, values)
  }

  static deleteOne(publicKeyId: string): Promise<void> {
    return HttpService.api.delete(`/v1/publicKeys/${publicKeyId}`)
  }

  static findManyByUserId(
    userId: string,
    queryOptions?: ApiHelper.QueryOptions<PublicKey>,
  ): Promise<PublicKey[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/users/user/${userId}/publicKeys${buildOptions}`,
    )
  }

  static createOneByUserId(
    userId: string,
    values: Partial<PublicKey>,
  ): Promise<PublicKey> {
    return HttpService.api.post(`/v1/users/user/${userId}/publicKeys`, values)
  }

  static findManyByBlockchainId(
    blockchainId: string,
    queryOptions?: ApiHelper.QueryOptions<PublicKey>,
  ): Promise<PublicKey[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/blockchains/blockchain/${blockchainId}/publicKeys${buildOptions}`,
    )
  }

  static createOneByBlockchainId(
    blockchainId: string,
    values: Partial<PublicKey>,
  ): Promise<PublicKey> {
    return HttpService.api.post(
      `/v1/blockchains/blockchain/${blockchainId}/publicKeys`,
      values,
    )
  }
}
