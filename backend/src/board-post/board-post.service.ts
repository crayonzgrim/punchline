import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { BoardPost } from './board-post.entity';
import { CreateBoardPostDto } from './dto/create-board-post.dto';

@Injectable()
export class BoardPostService {
  constructor(
    @InjectRepository(BoardPost)
    private readonly postRepository: Repository<BoardPost>,
  ) {}

  async createPost(dto: CreateBoardPostDto, user: User) {
    const post = this.postRepository.create({
      ...dto,
      author: user,
    });

    return this.postRepository.save(post);
  }
}
