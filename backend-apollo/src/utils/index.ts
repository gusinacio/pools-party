import { Request } from "express";
import jwt from "jsonwebtoken";
import { APP_SECRET, BCRYPT_SALT_ROUNDS } from "../config";
import bcrypt from "bcrypt";

interface TokenPayload {
  userId: number;
}

export function createJWTToken(userId: number) {
  return jwt.sign({ userId }, APP_SECRET);
}

export function getTokenPayload(token: string): TokenPayload {
  return jwt.verify(token, APP_SECRET) as TokenPayload;
}

export function getPasswordHash(password: string) {
  return bcrypt.hash(password, BCRYPT_SALT_ROUNDS);
}

export function validatePassword(password: string, passwordHash: string) {
  return bcrypt.compare(password, passwordHash);
}

export function getUserId(req: Request, authToken?: string) {
  if (req) {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.replace("Bearer ", "");
      if (!token) {
        throw new Error("No token found");
      }
      const { userId } = getTokenPayload(token);
      if (!userId) {
        throw new Error("No user id found");
      }
      return userId;
    }
  } else if (authToken) {
    const { userId } = getTokenPayload(authToken);
    if (!userId) {
      throw new Error("No user id found");
    }
    return userId;
  }

  throw new Error("Not authenticated");
}
