import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { SigninDto } from './dto/signin.dto';
import { SignupDto } from './dto/signup.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  private generateTokens(user: User) {
    const payload = { sub: user.id, email: user.email, role: user.role };

    const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_SECRET'),
      expiresIn: this.configService.get('JWT_EXPIRES_IN'),
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_SECRET'),
      expiresIn: this.configService.get('JWT_EXPIRES_IN'),
    });

    return { accessToken, refreshToken };
  }

  async signup(dto: SignupDto) {
    const emailExist = await this.userService.findByEmail(dto.email);
    if (emailExist) {
      throw new BadRequestException('이미 가입된 이메일입니다');
    }

    const nicknameExist = await this.userService.findByNickName(dto.nickname);
    if (nicknameExist) {
      throw new BadRequestException('이미 가입된 닉네임입니다');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const user = await this.userService.createUser({
      ...dto,
      password: hashedPassword,
    });

    return {
      message: '회원가입 성공',
      user: {
        id: user.id,
        email: user.email,
        nickname: user.nickname,
        role: user.role,
      },
    };
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

    const { accessToken, refreshToken } = this.generateTokens(user);

    return {
      message: '로그인 성공',
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        email: user.email,
        nickname: user.nickname,
        role: user.role,
      },
    };
  }
}
