import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private config: ConfigService,
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    email = email.toLowerCase();

    const user = await this.userService.getUserByEmail(email);

    if (!user) {
      return null;
    }

    const valid = await this.validatePassword(password, user.passwordHash);

    if (!valid) {
      return null;
    }

    return user;
  }

  createToken({ id }: User) {
    const secret = this.config.get('secret');

    return this.jwtService.sign({ id }, { secret });
  }

  async validatePassword(password: string, passwordHash: string) {
    return await bcrypt.compare(password, passwordHash);
  }
}
