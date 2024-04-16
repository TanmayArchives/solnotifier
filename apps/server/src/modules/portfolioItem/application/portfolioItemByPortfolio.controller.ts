import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { PortfolioItemDomainFacade } from '@server/modules/portfolioItem/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { PortfolioItemApplicationEvent } from './portfolioItem.application.event'
import { PortfolioItemCreateDto } from './portfolioItem.dto'

import { PortfolioDomainFacade } from '../../portfolio/domain'

@Controller('/v1/portfolios')
export class PortfolioItemByPortfolioController {
  constructor(
    private portfolioDomainFacade: PortfolioDomainFacade,

    private portfolioItemDomainFacade: PortfolioItemDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/portfolio/:portfolioId/portfolioItems')
  async findManyPortfolioId(
    @Param('portfolioId') portfolioId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent =
      await this.portfolioDomainFacade.findOneByIdOrFail(portfolioId)

    const items = await this.portfolioItemDomainFacade.findManyByPortfolio(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/portfolio/:portfolioId/portfolioItems')
  async createByPortfolioId(
    @Param('portfolioId') portfolioId: string,
    @Body() body: PortfolioItemCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, portfolioId }

    const item = await this.portfolioItemDomainFacade.create(valuesUpdated)

    await this.eventService.emit<PortfolioItemApplicationEvent.PortfolioItemCreated.Payload>(
      PortfolioItemApplicationEvent.PortfolioItemCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}
