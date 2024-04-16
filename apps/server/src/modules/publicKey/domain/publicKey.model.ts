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

import { Blockchain } from '../../../modules/blockchain/domain'

@Entity()
export class PublicKey {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({})
  publicKey: string

  @Column({})
  userId: string

  @ManyToOne(() => User, parent => parent.publicKeys)
  @JoinColumn({ name: 'userId' })
  user?: User

  @Column({})
  blockchainId: string

  @ManyToOne(() => Blockchain, parent => parent.publicKeys)
  @JoinColumn({ name: 'blockchainId' })
  blockchain?: Blockchain

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
