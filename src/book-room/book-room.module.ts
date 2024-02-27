import { Module } from '@nestjs/common';
import { BookRoomService } from './book-room.service';
import { BookRoomController } from './book-room.controller';
import { JwtStrategy } from 'src/strategy/jwt.strategy';

@Module({
  controllers: [BookRoomController],
  providers: [BookRoomService, JwtStrategy],
})
export class BookRoomModule {}
