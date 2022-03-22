import { Alternative, Answer, Question, User } from "@prisma/client";

export interface AuthService {
  createToken: (user: User) => string;
  validatePassword: (password: string, passwordHash: string) => Promise<any>;
  userId: number | null;
}

export interface QuestionService {
  answerQuestion: (
    userId: number,
    qustionId: number,
    choosedOption: number
  ) => Promise<Answer>;
  createQuestion: (
    creatorId: number,
    title: string,
    options: string[],
    expiresAt: Date
  ) => Promise<Question>;
  getQuestions: () => Promise<Question[]>;
  getUserQuestions: (userId: number) => Promise<Question[]>;
  checkUserVoted: (userId: number, questionId: number) => Promise<number>;
  getTotalVotes: (questionId: number) => Promise<number>;
  getQuestionAlternatives: (questionId: number) => Promise<Alternative[]>;
  checkQuestionFinished: (questionId: number) => Promise<boolean>;
}

export interface UserService {
  createUser: (
    username: string,
    email: string,
    passwordHash: string
  ) => Promise<User>;
  getUserByEmail: (email: string) => Promise<User | null>;
  getUserById: (id: number) => Promise<User | null>;
}
