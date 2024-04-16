import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { PublicKeyDomainFacade } from '@server/modules/publicKey/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { PublicKeyApplicationEvent } from './publicKey.application.event'
import { PublicKeyCreateDto } from './publicKey.dto'

import { BlockchainDomainFacade } from '../../blockchain/domain'

@Controller('/v1/blockchains')
export class PublicKeyByBlockchainController {
  constructor(
    private blockchainDomainFacade: BlockchainDomainFacade,

    private publicKeyDomainFacade: PublicKeyDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/blockchain/:blockchainId/publicKeys')
  async findManyBlockchainId(
    @Param('blockchainId') blockchainId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent =
      await this.blockchainDomainFacade.findOneByIdOrFail(blockchainId)

    const items = await this.publicKeyDomainFacade.findManyByBlockchain(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/blockchain/:blockchainId/publicKeys')
  async createByBlockchainId(
    @Param('blockchainId') blockchainId: string,
    @Body() body: PublicKeyCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, blockchainId }

    const item = await this.publicKeyDomainFacade.create(valuesUpdated)

    await this.eventService.emit<PublicKeyApplicationEvent.PublicKeyCreated.Payload>(
      PublicKeyApplicationEvent.PublicKeyCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}
