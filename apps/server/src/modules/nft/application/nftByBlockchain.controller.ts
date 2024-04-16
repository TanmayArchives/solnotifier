import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { NftDomainFacade } from '@server/modules/nft/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { NftApplicationEvent } from './nft.application.event'
import { NftCreateDto } from './nft.dto'

import { BlockchainDomainFacade } from '../../blockchain/domain'

@Controller('/v1/blockchains')
export class NftByBlockchainController {
  constructor(
    private blockchainDomainFacade: BlockchainDomainFacade,

    private nftDomainFacade: NftDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/blockchain/:blockchainId/nfts')
  async findManyBlockchainId(
    @Param('blockchainId') blockchainId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent =
      await this.blockchainDomainFacade.findOneByIdOrFail(blockchainId)

    const items = await this.nftDomainFacade.findManyByBlockchain(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/blockchain/:blockchainId/nfts')
  async createByBlockchainId(
    @Param('blockchainId') blockchainId: string,
    @Body() body: NftCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, blockchainId }

    const item = await this.nftDomainFacade.create(valuesUpdated)

    await this.eventService.emit<NftApplicationEvent.NftCreated.Payload>(
      NftApplicationEvent.NftCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}
