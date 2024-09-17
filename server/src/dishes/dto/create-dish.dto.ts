import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsString } from 'class-validator'

export class CreateDishDto {
  @ApiProperty({
    example: 'asado',
    description: 'The name of dishe',
    nullable: false,
    minLength: 1,
  })
  @IsString()
  name: string

  @ApiProperty({
    example: 'ingredient: carne de vacuno y cerdo',
    description: 'The description of dishe',
    nullable: false,
    minLength: 6,
  })
  @IsString()
  description: string

  @ApiProperty({
    example: '12000',
    description: 'The price of dishe',
    nullable: false,
    minLength: 1,
  })
  @IsNumber()
  price: number

  @ApiProperty({
    example: 'https://etc.com',
    description: 'The url photo of dishe',
  })
  @IsString()
  photo: string

  @ApiProperty({
    example: '66d61e26d8aa181ecd0c34f7',
    description: 'the id of category',
    nullable: false,
  })
  @IsString()
  categoryID: string
}
