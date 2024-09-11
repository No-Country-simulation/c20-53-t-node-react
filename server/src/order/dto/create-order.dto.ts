import { ApiProperty } from "@nestjs/swagger";
import { $Enums } from "@prisma/client";
import {
  IsDate,
  IsDateString,
  IsEnum,
  IsNumber,
  IsString,
} from "class-validator";

export class CreateOrderDto {
  @ApiProperty({
    example: "Pablito",
    description: "The waiterID of the order",
    minLength: 1,
  })
  @IsString()
  waiterID: string;

  @ApiProperty({
    example: "2022-01-01",
    description: "Date of the order, string",
    minLength: 10,
  })
  @IsDateString()
  @IsDate()
  date: Date;

  @ApiProperty({
    example: "20:00",
    description: "Hour of the order, string",
    minLength: 5,
  })
  @IsString()
  hour: string;

  @ApiProperty({
    example: 10000,
    description: "Total amount of the order, number",
    minLength: 1,
  })
  @IsNumber()
  totalAmount: number;

  @ApiProperty({
    example: "  PENDING | PREPARING | READY | SERVED | COMPLETED | CANCELLED",
    description: "Status of the order, enum",
    minLength: 1,
  })
  @IsEnum($Enums.Status)
  Status: $Enums.Status;
}
