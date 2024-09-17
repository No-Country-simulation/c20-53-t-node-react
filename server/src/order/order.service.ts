import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateOrderDto } from "./dto/create-order.dto";

import { PrismaService } from "src/prisma/prisma.service";
import { User } from "src/auth/interfaces";
import { UpdateOrderDto } from "./dto/update-order.dto";
import { handleErrorExceptions } from "src/common/handleErrorsExcepcions";

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  async createOrder(order: CreateOrderDto, user: User) {
    return await this.prisma.order.create({
      data: { ...order, clientID: user.id },
    });
  }

  async findAll() {
    return await this.prisma.order.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.order.findUnique({ where: { id: String(id) } });
  }

  async update(updateOrderDto: UpdateOrderDto) {
    try {
      const order = await this.findOne(updateOrderDto.id);
      if (!order) {
        new NotFoundException("Order not found");
      }
      if (order.Status !== "PENDING") {
        new NotFoundException("Order can`t be updated");
      }
      return await this.prisma.order.update({
        where: { id: String(updateOrderDto.id) },
        data: {
          Status: updateOrderDto.Status,
        },
      });
    } catch (error) {
      handleErrorExceptions(error);
    }
  }

  async remove(id: string) {
    try {
      const order = await this.findOne(id);
      if (!order) new NotFoundException("Order not found");
      if (order.Status !== "PENDING") {
        new NotFoundException(
          "Order can`t be cancelled, please call the waiter"
        );
      }
      return this.prisma.order.update({
        where: { id: String(id) },
        data: {
          Status: "CANCELLED",
        },
      });
    } catch (error) {
      handleErrorExceptions(error);
    }
  }
}
