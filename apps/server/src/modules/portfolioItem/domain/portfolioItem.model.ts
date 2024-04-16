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

import { Portfolio } from '../../../modules/portfolio/domain'

import { Cryptocurrency } from '../../../modules/cryptocurrency/domain'

import { Nft } from '../../../modules/nft/domain'

@Entity()
export class PortfolioItem {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ColumnNumeric({ type: 'numeric' })
  quantity: number

  @Column({})
  portfolioId: string

  @ManyToOne(() => Portfolio, parent => parent.portfolioItems)
  @JoinColumn({ name: 'portfolioId' })
  portfolio?: Portfolio

  @Column({ nullable: true })
  cryptocurrencyId?: string

  @ManyToOne(() => Cryptocurrency, parent => parent.portfolioItems)
  @JoinColumn({ name: 'cryptocurrencyId' })
  cryptocurrency?: Cryptocurrency

  @Column({ nullable: true })
  nftId?: string

  @ManyToOne(() => Nft, parent => parent.portfolioItems)
  @JoinColumn({ name: 'nftId' })
  nft?: Nft

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
