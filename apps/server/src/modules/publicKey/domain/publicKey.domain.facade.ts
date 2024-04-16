import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { DatabaseHelper } from '../../../core/database'
import { RequestHelper } from '../../../helpers/request'
import { PublicKey } from './publicKey.model'

import { User } from '../../user/domain'

import { Blockchain } from '../../blockchain/domain'

@Injectable()
export class PublicKeyDomainFacade {
  constructor(
    @InjectRepository(PublicKey)
    private repository: Repository<PublicKey>,
    private databaseHelper: DatabaseHelper,
  ) {}

  async create(values: Partial<PublicKey>): Promise<PublicKey> {
    return this.repository.save(values)
  }

  async update(
    item: PublicKey,
    values: Partial<PublicKey>,
  ): Promise<PublicKey> {
    const itemUpdated = { ...item, ...values }

    return this.repository.save(itemUpdated)
  }

  async delete(item: PublicKey): Promise<void> {
    await this.repository.softDelete(item.id)
  }

  async findMany(
    queryOptions: RequestHelper.QueryOptions<PublicKey> = {},
  ): Promise<PublicKey[]> {
    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptions,
    )

    return query.getMany()
  }

  async findOneByIdOrFail(
    id: string,
    queryOptions: RequestHelper.QueryOptions<PublicKey> = {},
  ): Promise<PublicKey> {
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

  async findManyByUser(
    item: User,
    queryOptions: RequestHelper.QueryOptions<PublicKey> = {},
  ): Promise<PublicKey[]> {
    if (!item) {
      this.databaseHelper.invalidQueryWhere('user')
    }

    const queryOptionsEnsured = {
      includes: queryOptions.includes,
      orders: queryOptions.orders,
      filters: {
        ...queryOptions.filters,
        userId: item.id,
      },
    }

    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptionsEnsured,
    )

    return query.getMany()
  }

  async findManyByBlockchain(
    item: Blockchain,
    queryOptions: RequestHelper.QueryOptions<PublicKey> = {},
  ): Promise<PublicKey[]> {
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
