import { Injectable } from "@nestjs/common";
import { CreateOrderDto } from "./dto/create-order.dto";

import { PrismaService } from "src/prisma/prisma.service";
import { User } from "src/auth/interfaces";

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

  async update(id) {
    return await `This action updates a #${id} order`;
  }

  async remove(id: string) {
    return await `This action removes a #${id} order`;
  }
}
