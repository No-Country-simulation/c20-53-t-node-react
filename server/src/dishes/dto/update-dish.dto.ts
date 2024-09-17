import { ApiProperty, PartialType } from '@nestjs/swagger'
import { CreateDishDto } from './create-dish.dto'
import { IsString } from 'class-validator'

export class UpdateDishDto extends PartialType(CreateDishDto) {
  @ApiProperty({
    example: '66d61e26d8aa181ecd0c34f7',
    description: 'the id of the dishe',
    nullable: false,
  })
  @IsString()
  id: string
}
