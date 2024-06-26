import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'

export class CryptocurrencyCreateDto {
  @IsString()
  @IsNotEmpty()
  symbol: string

  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  @IsOptional()
  dateCreated?: string

  @IsString()
  @IsOptional()
  dateDeleted?: string

  @IsString()
  @IsOptional()
  dateUpdated?: string
}

export class CryptocurrencyUpdateDto {
  @IsString()
  @IsOptional()
  symbol?: string

  @IsString()
  @IsOptional()
  name?: string

  @IsString()
  @IsOptional()
  dateCreated?: string

  @IsString()
  @IsOptional()
  dateDeleted?: string

  @IsString()
  @IsOptional()
  dateUpdated?: string
}
