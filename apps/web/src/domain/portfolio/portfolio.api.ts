import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { Portfolio } from './portfolio.model'

export class PortfolioApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<Portfolio>,
  ): Promise<Portfolio[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/portfolios${buildOptions}`)
  }

  static findOne(
    portfolioId: string,
    queryOptions?: ApiHelper.QueryOptions<Portfolio>,
  ): Promise<Portfolio> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/portfolios/${portfolioId}${buildOptions}`)
  }

  static createOne(values: Partial<Portfolio>): Promise<Portfolio> {
    return HttpService.api.post(`/v1/portfolios`, values)
  }

  static updateOne(
    portfolioId: string,
    values: Partial<Portfolio>,
  ): Promise<Portfolio> {
    return HttpService.api.patch(`/v1/portfolios/${portfolioId}`, values)
  }

  static deleteOne(portfolioId: string): Promise<void> {
    return HttpService.api.delete(`/v1/portfolios/${portfolioId}`)
  }

  static findManyByUserId(
    userId: string,
    queryOptions?: ApiHelper.QueryOptions<Portfolio>,
  ): Promise<Portfolio[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/users/user/${userId}/portfolios${buildOptions}`,
    )
  }

  static createOneByUserId(
    userId: string,
    values: Partial<Portfolio>,
  ): Promise<Portfolio> {
    return HttpService.api.post(`/v1/users/user/${userId}/portfolios`, values)
  }
}
