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

import { User } from '../../../modules/user/domain'

import { PortfolioItem } from '../../../modules/portfolioItem/domain'

@Entity()
export class Portfolio {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ColumnNumeric({ type: 'numeric' })
  netWorth: number

  @Column({})
  userId: string

  @ManyToOne(() => User, parent => parent.portfolios)
  @JoinColumn({ name: 'userId' })
  user?: User

  @OneToMany(() => PortfolioItem, child => child.portfolio)
  portfolioItems?: PortfolioItem[]

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
