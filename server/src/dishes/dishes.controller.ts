import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { DishesService } from "./dishes.service";
import { CreateDishDto } from "./dto/create-dish.dto";
import { UpdateDishDto } from "./dto/update-dish.dto";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
//import { Auth } from "src/auth/decorator";
//import { Dish } from "@prisma/client";

@ApiTags("Dishes")
@Controller("dishes")
export class DishesController {
  constructor(private readonly dishesService: DishesService) {}

  @ApiOperation({
    description: "This endpoint is for create new dishes",
  })
  @Post()
  //@Auth('ADMIN', 'EMPLOYEE')
  async create(@Body() createDishDto: CreateDishDto) {
    return await this.dishesService.create(createDishDto);
  }

  @ApiOperation({
    description: "This endpoint is for create a new category",
  })
  @Post("/category/:categoryname")
  // @Auth('ADMIN', 'EMPLOYEE')
  async createCategory(@Param("categoryname") categoryName: string) {
    return this.dishesService.newCategory(categoryName);
  }

  @ApiOperation({
    description: "This endpoint is for find all dishes",
  })
  @Get()
  async findAll() {
    return await this.dishesService.findAll();
  }

  @ApiOperation({
    description: "This endpoint is for searching dishes that contain this name",
  })
  @Get(":dishe")
  async findDishe(@Param("dishe") dishe: string) {
    return this.dishesService.findContain(dishe);
  }

  @ApiOperation({
    description: "This endpoint is for searching dishes that contain this name",
  })
  @Get("/category")
  async findAllCategory() {
    return this.dishesService.findAllCategory();
  }

  @ApiOperation({
    description: "This endpoint is for update a dishe",
  })
  @Patch(":id")
  async update(@Body() updateDishDto: UpdateDishDto) {
    return this.dishesService.update(updateDishDto);
  }

  @ApiOperation({
    description: "This endpoint is for remove a dishe",
  })
  @Delete(":id")
  //@Auth('ADMIN')
  async removeDishe(@Param("id") id: string) {
    return this.dishesService.remove(id);
  }

  @ApiOperation({
    description: "This endpoint is for remove a category",
  })
  @Delete("/category/:id")
  // @Auth('ADMIN')
  async removeCategory(@Param("id") id: string) {
    return this.dishesService.removeCategory(id);
  }
  @ApiOperation({
    description: "This endpoint returns 4 random dishes",
  })
  @ApiOperation({
    description: "This endpoint returns 4 random dishes",
  })
  @Get("/random")
  async getRandomDishes() {
    return this.dishesService.getRandomDishes();
  }
}
