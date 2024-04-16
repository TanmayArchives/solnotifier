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
  Portfolio,
  PortfolioDomainFacade,
} from '@server/modules/portfolio/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { PortfolioApplicationEvent } from './portfolio.application.event'
import { PortfolioCreateDto, PortfolioUpdateDto } from './portfolio.dto'

@Controller('/v1/portfolios')
export class PortfolioController {
  constructor(
    private eventService: EventService,
    private portfolioDomainFacade: PortfolioDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.portfolioDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(@Body() body: PortfolioCreateDto, @Req() request: Request) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.portfolioDomainFacade.create(body)

    await this.eventService.emit<PortfolioApplicationEvent.PortfolioCreated.Payload>(
      PortfolioApplicationEvent.PortfolioCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:portfolioId')
  async findOne(
    @Param('portfolioId') portfolioId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.portfolioDomainFacade.findOneByIdOrFail(
      portfolioId,
      queryOptions,
    )

    return item
  }

  @Patch('/:portfolioId')
  async update(
    @Param('portfolioId') portfolioId: string,
    @Body() body: PortfolioUpdateDto,
  ) {
    const item = await this.portfolioDomainFacade.findOneByIdOrFail(portfolioId)

    const itemUpdated = await this.portfolioDomainFacade.update(
      item,
      body as Partial<Portfolio>,
    )
    return itemUpdated
  }

  @Delete('/:portfolioId')
  async delete(@Param('portfolioId') portfolioId: string) {
    const item = await this.portfolioDomainFacade.findOneByIdOrFail(portfolioId)

    await this.portfolioDomainFacade.delete(item)

    return item
  }
}
