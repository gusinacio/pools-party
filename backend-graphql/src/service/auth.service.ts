import { User } from "@prisma/client";
import {
  getUserId,
  createJWTToken,
  validatePassword as validate,
} from "../utils";
import { Request } from "express";
import { AuthService } from ".";

export default function JWTAuthService(req: Request): AuthService {
  function createToken(user: User) {
    return createJWTToken(user.id);
  }

  async function validatePassword(password: string, passwordHash: string) {
    return await validate(password, passwordHash);
  }

  const userId = req && req.headers.authorization ? getUserId(req) : null;
  return {
    createToken,
    validatePassword,
    userId,
  };
}
