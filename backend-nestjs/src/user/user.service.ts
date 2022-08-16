import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Prisma, User } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaService } from 'src/global/prisma.service';
import { getPasswordHash } from 'src/utils';

@Injectable()
export class UserService {
  constructor(private database: PrismaService, private config: ConfigService) {}

  async createUser(
    username: string,
    email: string,
    password: string,
  ): Promise<Prisma.Prisma__UserClient<User>> {
    try {
      email = email.toLowerCase();
      username = username.toLowerCase();
      const passwordHash = await getPasswordHash(
        password,
        this.config.get('BCRYPT_SALT_ROUNDS'),
      );
      return this.database.user.create({
        data: { username, email, passwordHash },
      });
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          throw new Error('Username or email already taken');
        }
      }
      console.error(e);
      throw new Error('Unknown error');
    }
  }

  getUserByEmail(email: string): Prisma.Prisma__UserClient<User> {
    return this.database.user.findUnique({ where: { email } });
  }

  getUserById(id: number): Prisma.Prisma__UserClient<User> {
    return this.database.user.findUnique({ where: { id } });
  }
}
