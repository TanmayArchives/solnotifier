import { ColumnNumeric } from '@server/core/database'
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

import { PortfolioItem } from '../../../modules/portfolioItem/domain'

@Entity()
export class Cryptocurrency {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({})
  symbol: string

  @Column({})
  name: string

  @OneToMany(() => PortfolioItem, child => child.cryptocurrency)
  portfolioItems?: PortfolioItem[]

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
