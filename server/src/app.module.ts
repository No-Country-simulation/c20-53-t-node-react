import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AuthModule } from './auth/auth.module'
import { OrderModule } from './order/order.module'
import { DishesModule } from './dishes/dishes.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    OrderModule,
    DishesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
