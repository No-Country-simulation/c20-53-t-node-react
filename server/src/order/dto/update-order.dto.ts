import { ApiProperty, PartialType } from "@nestjs/swagger";
import { CreateOrderDto } from "./create-order.dto";
import { IsString } from "class-validator";

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
  @ApiProperty({
    example: "66d61e26d8aa181ecd0c34f7",
    description: "the id of the order",
    nullable: false,
  })
  @IsString()
  id: string;
}
