import { PrismaClient, User } from "@prisma/client";
import { UserService } from ".";

export function PrismaUserService(database: PrismaClient): UserService {
  async function createUser(
    username: string,
    email: string,
    passwordHash: string
  ): Promise<User> {
    return await database.user.create({
      data: { username, email, passwordHash },
    });
  }

  async function getUserByEmail(email: string) {
    return await database.user.findUnique({ where: { email } });
  }

  async function getUserById(id: number) {
    return await database.user.findUnique({ where: { id } });
  }

  return {
    createUser,
    getUserByEmail,
    getUserById,
  };
}
