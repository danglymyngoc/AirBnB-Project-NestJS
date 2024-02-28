import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { JwtStrategy } from 'src/strategy/jwt.strategy';

@Module({
  controllers: [CommentController],
  providers: [CommentService, JwtStrategy],
})
export class CommentModule {}
