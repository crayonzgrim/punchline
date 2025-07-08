import { Body, Controller, Post as HttpPost, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { User } from 'src/user/user.entity';
import { BoardPostService } from './board-post.service';
import { CreateBoardPostDto } from './dto/create-board-post.dto';

@Controller('post')
export class BoardPostController {
  constructor(private readonly postService: BoardPostService) {}

  @UseGuards(AuthGuard('jwt'))
  @HttpPost()
  create(@Body() dto: CreateBoardPostDto, @CurrentUser() user: User) {
    return this.postService.createPost(dto, user);
  }
}
