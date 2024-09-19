import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateDishDto } from "./dto/create-dish.dto";
import { UpdateDishDto } from "./dto/update-dish.dto";
import { PrismaService } from "../prisma/prisma.service";
import { handleErrorExceptions } from "../common/handleErrorsExcepcions";

@Injectable()
export class DishesService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createDishDto: CreateDishDto) {
    try {
      const existName = await this.findForName(createDishDto.name);
      if (existName)
        throw new ConflictException("The name of dishe already exist");
      return this.prisma.dishes.create({
        data: createDishDto,
      });
    } catch (e) {
      handleErrorExceptions(e);
    }
  }

  async findAll() {
    return this.prisma.dishes
      .findMany({
        where: {
          //deleted: false,
        },
      })
      .catch((e) => handleErrorExceptions(e));
  }

  async findForName(name: string) {
    return await this.prisma.dishes
      .findFirst({
        where: {
          name,
          // deleted: true,
        },
      })
      .catch((e) => handleErrorExceptions(e));
  }

  async findContain(dishe: string) {
    return this.prisma.dishes
      .findMany({
        where: {
          name: {
            contains: dishe,
            mode: "insensitive",
          },
          //deleted: false,
        },
      })
      .catch((e) => handleErrorExceptions(e));
  }

  async findForID(id: string) {
    return this.prisma.dishes
      .findUnique({
        where: { id },
      })
      .catch((e) => handleErrorExceptions(e));
  }

  async update(updateDishDto: UpdateDishDto) {
    try {
      const exist = await this.findForID(updateDishDto.id);
      if (!exist) throw new NotFoundException("Dishe not found");
      const existName = await this.findForName(updateDishDto.name);
      if (existName) throw new ConflictException("The name Already exist");
      return this.prisma.dishes.update({
        where: {
          id: updateDishDto.id,
        },
        data: updateDishDto,
      });
    } catch (e) {
      handleErrorExceptions(e);
    }
  }

  async remove(id: string) {
    try {
      const exist = await this.findForID(id);
      if (!exist) throw new NotFoundException("Dishe not found");
      return this.prisma.dishes.update({
        where: { id },
        data: {
          //deleted: true,
        },
      });
    } catch (e) {
      handleErrorExceptions(e);
    }
  }

  async newCategory(name: string) {
    try {
      const existName = this.findCategoryByName(name);
      if (existName) throw new ConflictException("Category already exists");
      return this.prisma.category.create({
        data: { name },
      });
    } catch (error) {
      handleErrorExceptions(error);
    }
  }

  async findCategoryByName(name: string) {
    return this.prisma.category
      .findFirst({
        where: {
          name,
          //deleted: false
        },
      })
      .catch((e) => handleErrorExceptions(e));
  }

  async findAllCategory() {
    return this.prisma.category
      .findMany({})
      .catch((e) => handleErrorExceptions(e));
  }

  async removeCategory(id: string) {
    return this.prisma.category.update({
      where: {
        id,
      },
      data: {
        //deleted: true,
      },
    });
  }
}
