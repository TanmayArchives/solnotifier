import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'

export class PortfolioItemCreateDto {
  @IsNumber()
  @IsNotEmpty()
  quantity: number

  @IsString()
  @IsOptional()
  dateCreated?: string

  @IsString()
  @IsOptional()
  dateDeleted?: string

  @IsString()
  @IsOptional()
  dateUpdated?: string

  @IsString()
  @IsOptional()
  portfolioId?: string

  @IsString()
  @IsOptional()
  cryptocurrencyId?: string

  @IsString()
  @IsOptional()
  nftId?: string
}

export class PortfolioItemUpdateDto {
  @IsNumber()
  @IsOptional()
  quantity?: number

  @IsString()
  @IsOptional()
  dateCreated?: string

  @IsString()
  @IsOptional()
  dateDeleted?: string

  @IsString()
  @IsOptional()
  dateUpdated?: string

  @IsString()
  @IsOptional()
  portfolioId?: string

  @IsString()
  @IsOptional()
  cryptocurrencyId?: string

  @IsString()
  @IsOptional()
  nftId?: string
}
