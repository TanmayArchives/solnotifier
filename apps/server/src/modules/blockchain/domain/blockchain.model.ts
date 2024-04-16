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

import { PublicKey } from '../../../modules/publicKey/domain'

import { Nft } from '../../../modules/nft/domain'

@Entity()
export class Blockchain {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({})
  name: string

  @OneToMany(() => PublicKey, child => child.blockchain)
  publicKeys?: PublicKey[]

  @OneToMany(() => Nft, child => child.blockchain)
  nfts?: Nft[]

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
