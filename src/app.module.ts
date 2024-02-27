import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

import { LocationModule } from './location/location.module';
import { RoomModule } from './room/room.module';
import { BookRoomModule } from './book-room/book-room.module';


@Module({
  imports: [
    ConfigModule.forRoot({
    isGlobal: true,
  }),
  UserModule,
  AuthModule,
  LocationModule,
  RoomModule,
  BookRoomModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
