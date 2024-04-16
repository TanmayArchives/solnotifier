import { Request } from 'express'

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common'
import { EventService } from '@server/libraries/event'
import {
  Blockchain,
  BlockchainDomainFacade,
} from '@server/modules/blockchain/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { BlockchainApplicationEvent } from './blockchain.application.event'
import { BlockchainCreateDto, BlockchainUpdateDto } from './blockchain.dto'

@Controller('/v1/blockchains')
export class BlockchainController {
  constructor(
    private eventService: EventService,
    private blockchainDomainFacade: BlockchainDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.blockchainDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(@Body() body: BlockchainCreateDto, @Req() request: Request) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.blockchainDomainFacade.create(body)

    await this.eventService.emit<BlockchainApplicationEvent.BlockchainCreated.Payload>(
      BlockchainApplicationEvent.BlockchainCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:blockchainId')
  async findOne(
    @Param('blockchainId') blockchainId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.blockchainDomainFacade.findOneByIdOrFail(
      blockchainId,
      queryOptions,
    )

    return item
  }

  @Patch('/:blockchainId')
  async update(
    @Param('blockchainId') blockchainId: string,
    @Body() body: BlockchainUpdateDto,
  ) {
    const item =
      await this.blockchainDomainFacade.findOneByIdOrFail(blockchainId)

    const itemUpdated = await this.blockchainDomainFacade.update(
      item,
      body as Partial<Blockchain>,
    )
    return itemUpdated
  }

  @Delete('/:blockchainId')
  async delete(@Param('blockchainId') blockchainId: string) {
    const item =
      await this.blockchainDomainFacade.findOneByIdOrFail(blockchainId)

    await this.blockchainDomainFacade.delete(item)

    return item
  }
}
