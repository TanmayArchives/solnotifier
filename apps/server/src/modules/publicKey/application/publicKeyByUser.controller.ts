import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { PublicKeyDomainFacade } from '@server/modules/publicKey/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { PublicKeyApplicationEvent } from './publicKey.application.event'
import { PublicKeyCreateDto } from './publicKey.dto'

import { UserDomainFacade } from '../../user/domain'

@Controller('/v1/users')
export class PublicKeyByUserController {
  constructor(
    private userDomainFacade: UserDomainFacade,

    private publicKeyDomainFacade: PublicKeyDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/user/:userId/publicKeys')
  async findManyUserId(
    @Param('userId') userId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.userDomainFacade.findOneByIdOrFail(userId)

    const items = await this.publicKeyDomainFacade.findManyByUser(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/user/:userId/publicKeys')
  async createByUserId(
    @Param('userId') userId: string,
    @Body() body: PublicKeyCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, userId }

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
