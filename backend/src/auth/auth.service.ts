import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { SigninDto } from './dto/signin.dto';
import { SignupDto } from './dto/signup.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signup(dto: SignupDto) {
    const emailExist = await this.userService.findByEmail(dto.email);
    if (emailExist) {
      throw new BadRequestException('이미 가입된 이메일입니다');
    }

    const nicknameExist = await this.userService.findByNickName(dto.nickname);
    if (nicknameExist) {
      throw new BadRequestException('이미 가입된 닉네임입니다');
    }

    const hashed = await bcrypt.hash(dto.password, 10);
    const user = await this.userService.createUser({
      ...dto,
      password: hashed,
    });

    return { message: '회원가입 성공', userId: user.id };
  }

  async signin(dto: SigninDto) {
    const user = await this.userService.findByEmail(dto.email);
    if (!user) {
      throw new UnauthorizedException('이메일 또는 비밀번호가 틀렸습니다.');
    }

    const passwordValid = await bcrypt.compare(dto.password, user.password);
    if (!passwordValid) {
      throw new UnauthorizedException('이메일 또는 비밀번호가 틀렸습니다.');
    }

    const payload = { sub: user.id, email: user.email, role: user.role };
    const token = this.jwtService.sign(payload);

    return { accessToken: token };
  }
}
