import { PrismaClient, User } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { UserService } from ".";

export function PrismaUserService(database: PrismaClient): UserService {
  async function createUser(
    username: string,
    email: string,
    passwordHash: string
  ): Promise<User> {
    try {
      return await database.user.create({
        data: { username, email, passwordHash },
      });
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        if (e.code === "P2002") {
          throw new Error("Username or email already taken");
        }
      }
      console.error(e);
      throw new Error("Unknown error");
    }
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
