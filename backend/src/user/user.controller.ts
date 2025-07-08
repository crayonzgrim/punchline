import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { JwtPayload } from 'src/auth/types/jwt-payload.interface';

@Controller('user')
export class UserController {
  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  getMe(@CurrentUser() user: JwtPayload) {
    return {
      message: '인증 된 사용자입니다',
      user,
    };
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('email')
  getEmail(@CurrentUser('email') email: string) {
    return { email };
  }
}
