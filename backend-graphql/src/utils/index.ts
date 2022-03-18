import { Request } from "express";
import jwt from "jsonwebtoken";
import { APP_SECRET } from "../config";

interface TokenPayload {
  userId: number;
}

export function createToken(userId: number) {
  return jwt.sign({ userId }, APP_SECRET);
}

export function getTokenPayload(token: string): TokenPayload {
  return jwt.verify(token, APP_SECRET) as TokenPayload;
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
      return userId;
    }
  } else if (authToken) {
    const { userId } = getTokenPayload(authToken);
    return userId;
  }

  throw new Error("Not authenticated");
}
