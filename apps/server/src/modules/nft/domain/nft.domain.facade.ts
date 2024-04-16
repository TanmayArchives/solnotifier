import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { DatabaseHelper } from '../../../core/database'
import { RequestHelper } from '../../../helpers/request'
import { Nft } from './nft.model'

import { Blockchain } from '../../blockchain/domain'

@Injectable()
export class NftDomainFacade {
  constructor(
    @InjectRepository(Nft)
    private repository: Repository<Nft>,
    private databaseHelper: DatabaseHelper,
  ) {}

  async create(values: Partial<Nft>): Promise<Nft> {
    return this.repository.save(values)
  }

  async update(item: Nft, values: Partial<Nft>): Promise<Nft> {
    const itemUpdated = { ...item, ...values }

    return this.repository.save(itemUpdated)
  }

  async delete(item: Nft): Promise<void> {
    await this.repository.softDelete(item.id)
  }

  async findMany(
    queryOptions: RequestHelper.QueryOptions<Nft> = {},
  ): Promise<Nft[]> {
    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptions,
    )

    return query.getMany()
  }

  async findOneByIdOrFail(
    id: string,
    queryOptions: RequestHelper.QueryOptions<Nft> = {},
  ): Promise<Nft> {
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

  async findManyByBlockchain(
    item: Blockchain,
    queryOptions: RequestHelper.QueryOptions<Nft> = {},
  ): Promise<Nft[]> {
    if (!item) {
      this.databaseHelper.invalidQueryWhere('blockchain')
    }

    const queryOptionsEnsured = {
      includes: queryOptions.includes,
      orders: queryOptions.orders,
      filters: {
        ...queryOptions.filters,
        blockchainId: item.id,
      },
    }

    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptionsEnsured,
    )

    return query.getMany()
  }
}
