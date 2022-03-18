import { PrismaClient, Question } from "@prisma/client";
import { QuestionService } from ".";

export default function PrismaQuestionService(
  database: PrismaClient
): QuestionService {
  async function createQuestion(
    creatorId: number,
    title: string,
    options: string[],
    expiresAt: Date
  ) {
    return await database.question.create({
      data: {
        title: title,
        options: {
          set: options,
        },
        expiresAt: expiresAt,
        creatorId: creatorId,
      },
    });
  }

  async function getQuestions(): Promise<Question[]> {
    return await database.question.findMany();
  }

  async function getUserQuestions(userId: number): Promise<Question[]> {
    return await database.question.findMany({
      where: {
        creatorId: userId,
      },
    });
  }

  return {
    createQuestion,
    getQuestions,
    getUserQuestions,
  };
}
