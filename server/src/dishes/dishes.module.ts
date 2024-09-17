import { Module } from '@nestjs/common'
import { DishesService } from './dishes.service'
import { DishesController } from './dishes.controller'
import { PrismaModule } from 'src/prisma/prisma.module'

@Module({
  controllers: [DishesController],
  providers: [DishesService],
  imports: [PrismaModule],
})
export class DishesModule {}
