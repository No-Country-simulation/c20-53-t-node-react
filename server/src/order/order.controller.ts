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
    description: "New order",
  })
  @Post()
  //@Auth("ADMIN")
  async createOrder(
    @Body() createOrderDto: CreateOrderDto,
    @GetUser() user: User
  ) {
    return await this.orderService.createOrder(createOrderDto, user);
  }

  @Get()
  async findAll() {
    return await this.orderService.findAll();
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    return await this.orderService.findOne(id);
  }

  @Patch(":id")
  async update(
    @Param("id") id: string,
    @Body() updateOrderDto: UpdateOrderDto
  ) {
    return await this.orderService.update(updateOrderDto);
  }

  @Delete(":id")
  async remove(@Param("id") id: string) {
    return await this.orderService.remove(id);
  }
}
