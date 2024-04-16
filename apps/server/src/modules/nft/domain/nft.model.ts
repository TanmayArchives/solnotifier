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

import { Blockchain } from '../../../modules/blockchain/domain'

import { PortfolioItem } from '../../../modules/portfolioItem/domain'

@Entity()
export class Nft {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({})
  name: string

  @Column({})
  tokenId: string

  @Column({})
  blockchainId: string

  @ManyToOne(() => Blockchain, parent => parent.nfts)
  @JoinColumn({ name: 'blockchainId' })
  blockchain?: Blockchain

  @OneToMany(() => PortfolioItem, child => child.nft)
  portfolioItems?: PortfolioItem[]

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
