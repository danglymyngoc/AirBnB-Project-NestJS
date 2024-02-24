import { Module } from '@nestjs/common';
import { LocationService } from './location.service';
import { LocationController } from './location.controller';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { JwtStrategy } from 'src/strategy/jwt.strategy';

@Module({
  imports: [CloudinaryModule],
  controllers: [LocationController],
  providers: [LocationService, JwtStrategy],
})
export class LocationModule {}
