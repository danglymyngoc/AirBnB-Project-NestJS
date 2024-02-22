import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { JwtStrategy } from 'src/strategy/jwt.strategy';

@Module({
  imports:[CloudinaryModule],
  controllers: [UserController],
  providers: [UserService,JwtStrategy],
})
export class UserModule {}
