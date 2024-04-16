import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { DatabaseHelper } from '../../../core/database'
import { RequestHelper } from '../../../helpers/request'
import { Cryptocurrency } from './cryptocurrency.model'

@Injectable()
export class CryptocurrencyDomainFacade {
  constructor(
    @InjectRepository(Cryptocurrency)
    private repository: Repository<Cryptocurrency>,
    private databaseHelper: DatabaseHelper,
  ) {}

  async create(values: Partial<Cryptocurrency>): Promise<Cryptocurrency> {
    return this.repository.save(values)
  }

  async update(
    item: Cryptocurrency,
    values: Partial<Cryptocurrency>,
  ): Promise<Cryptocurrency> {
    const itemUpdated = { ...item, ...values }

    return this.repository.save(itemUpdated)
  }

  async delete(item: Cryptocurrency): Promise<void> {
    await this.repository.softDelete(item.id)
  }

  async findMany(
    queryOptions: RequestHelper.QueryOptions<Cryptocurrency> = {},
  ): Promise<Cryptocurrency[]> {
    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptions,
    )

    return query.getMany()
  }

  async findOneByIdOrFail(
    id: string,
    queryOptions: RequestHelper.QueryOptions<Cryptocurrency> = {},
  ): Promise<Cryptocurrency> {
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
