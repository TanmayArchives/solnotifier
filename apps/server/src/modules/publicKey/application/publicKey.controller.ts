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
  PublicKey,
  PublicKeyDomainFacade,
} from '@server/modules/publicKey/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { PublicKeyApplicationEvent } from './publicKey.application.event'
import { PublicKeyCreateDto, PublicKeyUpdateDto } from './publicKey.dto'

@Controller('/v1/publicKeys')
export class PublicKeyController {
  constructor(
    private eventService: EventService,
    private publicKeyDomainFacade: PublicKeyDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.publicKeyDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(@Body() body: PublicKeyCreateDto, @Req() request: Request) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.publicKeyDomainFacade.create(body)

    await this.eventService.emit<PublicKeyApplicationEvent.PublicKeyCreated.Payload>(
      PublicKeyApplicationEvent.PublicKeyCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:publicKeyId')
  async findOne(
    @Param('publicKeyId') publicKeyId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.publicKeyDomainFacade.findOneByIdOrFail(
      publicKeyId,
      queryOptions,
    )

    return item
  }

  @Patch('/:publicKeyId')
  async update(
    @Param('publicKeyId') publicKeyId: string,
    @Body() body: PublicKeyUpdateDto,
  ) {
    const item = await this.publicKeyDomainFacade.findOneByIdOrFail(publicKeyId)

    const itemUpdated = await this.publicKeyDomainFacade.update(
      item,
      body as Partial<PublicKey>,
    )
    return itemUpdated
  }

  @Delete('/:publicKeyId')
  async delete(@Param('publicKeyId') publicKeyId: string) {
    const item = await this.publicKeyDomainFacade.findOneByIdOrFail(publicKeyId)

    await this.publicKeyDomainFacade.delete(item)

    return item
  }
}
