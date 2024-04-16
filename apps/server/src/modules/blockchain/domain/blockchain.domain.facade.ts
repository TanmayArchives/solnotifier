import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { DatabaseHelper } from '../../../core/database'
import { RequestHelper } from '../../../helpers/request'
import { Blockchain } from './blockchain.model'

@Injectable()
export class BlockchainDomainFacade {
  constructor(
    @InjectRepository(Blockchain)
    private repository: Repository<Blockchain>,
    private databaseHelper: DatabaseHelper,
  ) {}

  async create(values: Partial<Blockchain>): Promise<Blockchain> {
    return this.repository.save(values)
  }

  async update(
    item: Blockchain,
    values: Partial<Blockchain>,
  ): Promise<Blockchain> {
    const itemUpdated = { ...item, ...values }

    return this.repository.save(itemUpdated)
  }

  async delete(item: Blockchain): Promise<void> {
    await this.repository.softDelete(item.id)
  }

  async findMany(
    queryOptions: RequestHelper.QueryOptions<Blockchain> = {},
  ): Promise<Blockchain[]> {
    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptions,
    )

    return query.getMany()
  }

  async findOneByIdOrFail(
    id: string,
    queryOptions: RequestHelper.QueryOptions<Blockchain> = {},
  ): Promise<Blockchain> {
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
}
