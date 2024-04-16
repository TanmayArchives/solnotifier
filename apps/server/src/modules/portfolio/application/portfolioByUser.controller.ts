import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { PortfolioDomainFacade } from '@server/modules/portfolio/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { PortfolioApplicationEvent } from './portfolio.application.event'
import { PortfolioCreateDto } from './portfolio.dto'

import { UserDomainFacade } from '../../user/domain'

@Controller('/v1/users')
export class PortfolioByUserController {
  constructor(
    private userDomainFacade: UserDomainFacade,

    private portfolioDomainFacade: PortfolioDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/user/:userId/portfolios')
  async findManyUserId(
    @Param('userId') userId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.userDomainFacade.findOneByIdOrFail(userId)

    const items = await this.portfolioDomainFacade.findManyByUser(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/user/:userId/portfolios')
  async createByUserId(
    @Param('userId') userId: string,
    @Body() body: PortfolioCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, userId }

    const item = await this.portfolioDomainFacade.create(valuesUpdated)

    await this.eventService.emit<PortfolioApplicationEvent.PortfolioCreated.Payload>(
      PortfolioApplicationEvent.PortfolioCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}
