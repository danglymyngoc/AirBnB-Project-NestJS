import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

import { LocationModule } from './location/location.module';
import { RoomModule } from './room/room.module';


@Module({
  imports: [
    ConfigModule.forRoot({
    isGlobal: true,
  }),
  UserModule,
  AuthModule,
  LocationModule,
  RoomModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
