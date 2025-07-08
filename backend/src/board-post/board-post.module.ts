import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardPostController } from './board-post.controller';
import { BoardPost } from './board-post.entity';
import { BoardPostService } from './board-post.service';

@Module({
  imports: [TypeOrmModule.forFeature([BoardPost])],
  providers: [BoardPostService],
  controllers: [BoardPostController],
})
export class PostModule {}
