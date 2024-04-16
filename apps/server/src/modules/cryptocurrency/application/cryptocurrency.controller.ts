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
  Cryptocurrency,
  CryptocurrencyDomainFacade,
} from '@server/modules/cryptocurrency/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { CryptocurrencyApplicationEvent } from './cryptocurrency.application.event'
import {
  CryptocurrencyCreateDto,
  CryptocurrencyUpdateDto,
} from './cryptocurrency.dto'

@Controller('/v1/cryptocurrencys')
export class CryptocurrencyController {
  constructor(
    private eventService: EventService,
    private cryptocurrencyDomainFacade: CryptocurrencyDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.cryptocurrencyDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(@Body() body: CryptocurrencyCreateDto, @Req() request: Request) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.cryptocurrencyDomainFacade.create(body)

    await this.eventService.emit<CryptocurrencyApplicationEvent.CryptocurrencyCreated.Payload>(
      CryptocurrencyApplicationEvent.CryptocurrencyCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:cryptocurrencyId')
  async findOne(
    @Param('cryptocurrencyId') cryptocurrencyId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.cryptocurrencyDomainFacade.findOneByIdOrFail(
      cryptocurrencyId,
      queryOptions,
    )

    return item
  }

  @Patch('/:cryptocurrencyId')
  async update(
    @Param('cryptocurrencyId') cryptocurrencyId: string,
    @Body() body: CryptocurrencyUpdateDto,
  ) {
    const item =
      await this.cryptocurrencyDomainFacade.findOneByIdOrFail(cryptocurrencyId)

    const itemUpdated = await this.cryptocurrencyDomainFacade.update(
      item,
      body as Partial<Cryptocurrency>,
    )
    return itemUpdated
  }

  @Delete('/:cryptocurrencyId')
  async delete(@Param('cryptocurrencyId') cryptocurrencyId: string) {
    const item =
      await this.cryptocurrencyDomainFacade.findOneByIdOrFail(cryptocurrencyId)

    await this.cryptocurrencyDomainFacade.delete(item)

    return item
  }
}
