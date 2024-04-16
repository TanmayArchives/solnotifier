import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { PortfolioItemDomainFacade } from '@server/modules/portfolioItem/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { PortfolioItemApplicationEvent } from './portfolioItem.application.event'
import { PortfolioItemCreateDto } from './portfolioItem.dto'

import { CryptocurrencyDomainFacade } from '../../cryptocurrency/domain'

@Controller('/v1/cryptocurrencys')
export class PortfolioItemByCryptocurrencyController {
  constructor(
    private cryptocurrencyDomainFacade: CryptocurrencyDomainFacade,

    private portfolioItemDomainFacade: PortfolioItemDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/cryptocurrency/:cryptocurrencyId/portfolioItems')
  async findManyCryptocurrencyId(
    @Param('cryptocurrencyId') cryptocurrencyId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent =
      await this.cryptocurrencyDomainFacade.findOneByIdOrFail(cryptocurrencyId)

    const items = await this.portfolioItemDomainFacade.findManyByCryptocurrency(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/cryptocurrency/:cryptocurrencyId/portfolioItems')
  async createByCryptocurrencyId(
    @Param('cryptocurrencyId') cryptocurrencyId: string,
    @Body() body: PortfolioItemCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, cryptocurrencyId }

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
