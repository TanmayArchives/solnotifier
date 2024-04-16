import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { DatabaseHelper } from '../../../core/database'
import { RequestHelper } from '../../../helpers/request'
import { PortfolioItem } from './portfolioItem.model'

import { Portfolio } from '../../portfolio/domain'

import { Cryptocurrency } from '../../cryptocurrency/domain'

import { Nft } from '../../nft/domain'

@Injectable()
export class PortfolioItemDomainFacade {
  constructor(
    @InjectRepository(PortfolioItem)
    private repository: Repository<PortfolioItem>,
    private databaseHelper: DatabaseHelper,
  ) {}

  async create(values: Partial<PortfolioItem>): Promise<PortfolioItem> {
    return this.repository.save(values)
  }

  async update(
    item: PortfolioItem,
    values: Partial<PortfolioItem>,
  ): Promise<PortfolioItem> {
    const itemUpdated = { ...item, ...values }

    return this.repository.save(itemUpdated)
  }

  async delete(item: PortfolioItem): Promise<void> {
    await this.repository.softDelete(item.id)
  }

  async findMany(
    queryOptions: RequestHelper.QueryOptions<PortfolioItem> = {},
  ): Promise<PortfolioItem[]> {
    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptions,
    )

    return query.getMany()
  }

  async findOneByIdOrFail(
    id: string,
    queryOptions: RequestHelper.QueryOptions<PortfolioItem> = {},
  ): Promise<PortfolioItem> {
    if (!id) {
      this.databaseHelper.invalidQueryWhere('id')
    }

    const queryOptionsEnsured = {
      includes: queryOptions?.includes,
      filters: {
        id: id,
      },
    }

    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptionsEnsured,
    )

    const item = await query.getOne()

    if (!item) {
      this.databaseHelper.notFoundByQuery(queryOptionsEnsured.filters)
    }

    return item
  }

  async findManyByPortfolio(
    item: Portfolio,
    queryOptions: RequestHelper.QueryOptions<PortfolioItem> = {},
  ): Promise<PortfolioItem[]> {
    if (!item) {
      this.databaseHelper.invalidQueryWhere('portfolio')
    }

    const queryOptionsEnsured = {
      includes: queryOptions.includes,
      orders: queryOptions.orders,
      filters: {
        ...queryOptions.filters,
        portfolioId: item.id,
      },
    }

    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptionsEnsured,
    )

    return query.getMany()
  }

  async findManyByCryptocurrency(
    item: Cryptocurrency,
    queryOptions: RequestHelper.QueryOptions<PortfolioItem> = {},
  ): Promise<PortfolioItem[]> {
    if (!item) {
      this.databaseHelper.invalidQueryWhere('cryptocurrency')
    }

    const queryOptionsEnsured = {
      includes: queryOptions.includes,
      orders: queryOptions.orders,
      filters: {
        ...queryOptions.filters,
        cryptocurrencyId: item.id,
      },
    }

    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptionsEnsured,
    )

    return query.getMany()
  }

  async findManyByNft(
    item: Nft,
    queryOptions: RequestHelper.QueryOptions<PortfolioItem> = {},
  ): Promise<PortfolioItem[]> {
    if (!item) {
      this.databaseHelper.invalidQueryWhere('nft')
    }

    const queryOptionsEnsured = {
      includes: queryOptions.includes,
      orders: queryOptions.orders,
      filters: {
        ...queryOptions.filters,
        nftId: item.id,
      },
    }

    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptionsEnsured,
    )

    return query.getMany()
  }
}
