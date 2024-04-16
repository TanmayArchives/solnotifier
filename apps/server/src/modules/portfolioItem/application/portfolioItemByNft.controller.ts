import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { PortfolioItemDomainFacade } from '@server/modules/portfolioItem/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { PortfolioItemApplicationEvent } from './portfolioItem.application.event'
import { PortfolioItemCreateDto } from './portfolioItem.dto'

import { NftDomainFacade } from '../../nft/domain'

@Controller('/v1/nfts')
export class PortfolioItemByNftController {
  constructor(
    private nftDomainFacade: NftDomainFacade,

    private portfolioItemDomainFacade: PortfolioItemDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/nft/:nftId/portfolioItems')
  async findManyNftId(@Param('nftId') nftId: string, @Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.nftDomainFacade.findOneByIdOrFail(nftId)

    const items = await this.portfolioItemDomainFacade.findManyByNft(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/nft/:nftId/portfolioItems')
  async createByNftId(
    @Param('nftId') nftId: string,
    @Body() body: PortfolioItemCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, nftId }

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
