import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

interface TokenPayload {
  userId: number;
}

export function validatePassword(password: string, passwordHash: string) {
  return bcrypt.compare(password, passwordHash);
}

export async function getPasswordHash(password: string, salt: number = 10) {
  return await bcrypt.hash(password, salt);
}

// export function getUserId(req: Request, authToken?: string) {
//   if (req) {
//     const authHeader = req.headers.authorization;
//     if (authHeader) {
//       const token = authHeader.replace("Bearer ", "");
//       if (!token) {
//         throw new Error("No token found");
//       }
//       const { userId } = getTokenPayload(token);
//       if (!userId) {
//         throw new Error("No user id found");
//       }
//       return userId;
//     }
//   } else if (authToken) {
//     const { userId } = getTokenPayload(authToken);
//     if (!userId) {
//       throw new Error("No user id found");
//     }
//     return userId;
//   }

//   throw new Error("Not authenticated");
// }