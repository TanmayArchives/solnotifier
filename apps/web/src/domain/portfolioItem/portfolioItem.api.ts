import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { PortfolioItem } from './portfolioItem.model'

export class PortfolioItemApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<PortfolioItem>,
  ): Promise<PortfolioItem[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/portfolioItems${buildOptions}`)
  }

  static findOne(
    portfolioItemId: string,
    queryOptions?: ApiHelper.QueryOptions<PortfolioItem>,
  ): Promise<PortfolioItem> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/portfolioItems/${portfolioItemId}${buildOptions}`,
    )
  }

  static createOne(values: Partial<PortfolioItem>): Promise<PortfolioItem> {
    return HttpService.api.post(`/v1/portfolioItems`, values)
  }

  static updateOne(
    portfolioItemId: string,
    values: Partial<PortfolioItem>,
  ): Promise<PortfolioItem> {
    return HttpService.api.patch(
      `/v1/portfolioItems/${portfolioItemId}`,
      values,
    )
  }

  static deleteOne(portfolioItemId: string): Promise<void> {
    return HttpService.api.delete(`/v1/portfolioItems/${portfolioItemId}`)
  }

  static findManyByPortfolioId(
    portfolioId: string,
    queryOptions?: ApiHelper.QueryOptions<PortfolioItem>,
  ): Promise<PortfolioItem[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/portfolios/portfolio/${portfolioId}/portfolioItems${buildOptions}`,
    )
  }

  static createOneByPortfolioId(
    portfolioId: string,
    values: Partial<PortfolioItem>,
  ): Promise<PortfolioItem> {
    return HttpService.api.post(
      `/v1/portfolios/portfolio/${portfolioId}/portfolioItems`,
      values,
    )
  }

  static findManyByCryptocurrencyId(
    cryptocurrencyId: string,
    queryOptions?: ApiHelper.QueryOptions<PortfolioItem>,
  ): Promise<PortfolioItem[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/cryptocurrencys/cryptocurrency/${cryptocurrencyId}/portfolioItems${buildOptions}`,
    )
  }

  static createOneByCryptocurrencyId(
    cryptocurrencyId: string,
    values: Partial<PortfolioItem>,
  ): Promise<PortfolioItem> {
    return HttpService.api.post(
      `/v1/cryptocurrencys/cryptocurrency/${cryptocurrencyId}/portfolioItems`,
      values,
    )
  }

  static findManyByNftId(
    nftId: string,
    queryOptions?: ApiHelper.QueryOptions<PortfolioItem>,
  ): Promise<PortfolioItem[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/nfts/nft/${nftId}/portfolioItems${buildOptions}`,
    )
  }

  static createOneByNftId(
    nftId: string,
    values: Partial<PortfolioItem>,
  ): Promise<PortfolioItem> {
    return HttpService.api.post(`/v1/nfts/nft/${nftId}/portfolioItems`, values)
  }
}
