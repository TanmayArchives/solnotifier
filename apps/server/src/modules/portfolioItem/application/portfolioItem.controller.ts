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
  PortfolioItem,
  PortfolioItemDomainFacade,
} from '@server/modules/portfolioItem/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { PortfolioItemApplicationEvent } from './portfolioItem.application.event'
import {
  PortfolioItemCreateDto,
  PortfolioItemUpdateDto,
} from './portfolioItem.dto'

@Controller('/v1/portfolioItems')
export class PortfolioItemController {
  constructor(
    private eventService: EventService,
    private portfolioItemDomainFacade: PortfolioItemDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.portfolioItemDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(@Body() body: PortfolioItemCreateDto, @Req() request: Request) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.portfolioItemDomainFacade.create(body)

    await this.eventService.emit<PortfolioItemApplicationEvent.PortfolioItemCreated.Payload>(
      PortfolioItemApplicationEvent.PortfolioItemCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:portfolioItemId')
  async findOne(
    @Param('portfolioItemId') portfolioItemId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.portfolioItemDomainFacade.findOneByIdOrFail(
      portfolioItemId,
      queryOptions,
    )

    return item
  }

  @Patch('/:portfolioItemId')
  async update(
    @Param('portfolioItemId') portfolioItemId: string,
    @Body() body: PortfolioItemUpdateDto,
  ) {
    const item =
      await this.portfolioItemDomainFacade.findOneByIdOrFail(portfolioItemId)

    const itemUpdated = await this.portfolioItemDomainFacade.update(
      item,
      body as Partial<PortfolioItem>,
    )
    return itemUpdated
  }

  @Delete('/:portfolioItemId')
  async delete(@Param('portfolioItemId') portfolioItemId: string) {
    const item =
      await this.portfolioItemDomainFacade.findOneByIdOrFail(portfolioItemId)

    await this.portfolioItemDomainFacade.delete(item)

    return item
  }
}
