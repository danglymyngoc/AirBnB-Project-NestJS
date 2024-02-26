import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomController } from './room.controller';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { JwtStrategy } from 'src/strategy/jwt.strategy';

@Module({
  imports: [CloudinaryModule],
  controllers: [RoomController],
  providers: [RoomService, JwtStrategy],
})
export class RoomModule {}
