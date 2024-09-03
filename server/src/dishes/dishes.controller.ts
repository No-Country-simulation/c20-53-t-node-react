import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { DishesService } from './dishes.service'
import { CreateDishDto } from './dto/create-dish.dto'
import { UpdateDishDto } from './dto/update-dish.dto'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { Auth } from 'src/auth/decorator'

@ApiTags('Dishes')
@Controller('dishes')
export class DishesController {
  constructor(private readonly dishesService: DishesService) {}

  @ApiOperation({
    description: 'This endpoint is for create new dishes',
  })
  @Post()
  @Auth('ADMIN', 'EMPLOYEE')
  create(@Body() createDishDto: CreateDishDto) {
    return this.dishesService.create(createDishDto)
  }

  @ApiOperation({
    description: 'This endpoint is for find all dishes',
  })
  @Get()
  findAll() {
    return this.dishesService.findAll()
  }

  @ApiOperation({
    description: 'This endpoint is for searching dishes that contain this name',
  })
  @Get(':dishe')
  findDishe(@Param('dishe') dishe: string) {
    return this.dishesService.findContain(dishe)
  }

  @ApiOperation({
    description: 'This endpoint is for update a dishe',
  })
  @Patch()
  update(@Body() updateDishDto: UpdateDishDto) {
    return this.dishesService.update(updateDishDto)
  }

  @Delete(':id')
  @Auth('ADMIN')
  remove(@Param('id') id: string) {
    return this.dishesService.remove(id)
  }
}
