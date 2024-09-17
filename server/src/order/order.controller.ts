import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { OrderService } from "./order.service";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";
import { GetUser } from "src/auth/decorator";
import { User } from "src/auth/interfaces";
import { ApiProperty } from "@nestjs/swagger";

@Controller("order")
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @ApiProperty({
    description: "This endpoint is for create new order",
  })
  @Post()
  //@Auth("ADMIN")
  async createOrder(
    @Body() createOrderDto: CreateOrderDto,
    @GetUser() user: User
  ) {
    return await this.orderService.createOrder(createOrderDto, user);
  }
  @ApiProperty({
    description: "This endpoint is for find all orders",
  })
  @Get()
  async findAll() {
    return await this.orderService.findAll();
  }
  @ApiProperty({
    description: "This endpoint is for find one order by id",
  })
  @Get(":id")
  async findOne(@Param("id") id: string) {
    return await this.orderService.findOne(id);
  }

  @ApiProperty({
    description: "This endpoint is for update one order by id",
  })
  @Patch(":id")
  async update(
    @Param("id") id: string,
    @Body() updateOrderDto: UpdateOrderDto
  ) {
    return await this.orderService.update(updateOrderDto);
  }

  @ApiProperty({
    description: "This endpoint is for delete one order by id",
  })
  @Delete(":id")
  async remove(@Param("id") id: string) {
    return await this.orderService.remove(id);
  }
}
