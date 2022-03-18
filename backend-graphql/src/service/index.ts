import { Question, User } from "@prisma/client";

export interface AuthService {
  createToken: (user: User) => string;
  validatePassword: (password: string, passwordHash: string) => Promise<any>;
  userId: number | null;
}

export interface QuestionService {
  createQuestion: (
    creatorId: number,
    title: string,
    options: string[],
    expiresAt: Date
  ) => Promise<Question>;
  getQuestions: () => Promise<Question[]>;
  getUserQuestions: (userId: number) => Promise<Question[]>;
}

export interface UserService {
  createUser: (
    username: string,
    email: string,
    passwordHash: string
  ) => Promise<User>;
  getUserByEmail: (email: string) => Promise<any>;
  getUserById: (id: number) => Promise<any>;
}
