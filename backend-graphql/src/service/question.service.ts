import { Alternative, Answer, PrismaClient, Question } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
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
    if (expiresAt < new Date()) {
      throw new Error("The expiration date must be in the future");
    }

    return await database.question.create({
      data: {
        title: title,
        alternatives: {
          createMany: {
            data: options.map((opt, index) => ({
              text: opt,
              alternativeId: index + 1,
            })),
          },
        },
        expiresAt: expiresAt,
        creatorId: creatorId,
      },
    });
  }

  async function getQuestions(): Promise<Question[]> {
    return await database.question.findMany();
  }

  async function getTotalVotes(questionId: number): Promise<number> {
    const totalVotes = await database.answer.count({
      where: {
        questionId: questionId,
      },
    });
    return totalVotes;
  }

  async function getUserQuestions(userId: number): Promise<Question[]> {
    return await database.question.findMany({
      where: {
        creatorId: userId,
      },
    });
  }

  async function getQuestionAlternatives(questionId: number) {
    const alternatives = await database.question
      .findFirst({
        where: {
          id: questionId,
        },
      })
      .alternatives({
        include: {
          _count: {
            select: {
              Answer: true,
            },
          },
        },
      });
    return alternatives.map((alt) => {
      const votes = alt._count?.Answer;
      return {
        ...alt,
        votes,
      };
    });
  }

  async function checkUserVoted(
    userId: number,
    questionId: number
  ): Promise<number> {
    const voted = await database.answer.findFirst({
      where: {
        userId: userId,
        questionId: questionId,
      },
    });
    return voted ? voted.alternativeId : -1;
  }

  async function answerQuestion(
    userId: number,
    questionId: number,
    choosedOption: number
  ) {
    const question = await database.question.findFirst({
      where: {
        id: questionId,
      },
    });

    if (!question) throw new Error("Question not found");

    if (question.expiresAt < new Date()) throw new Error("Question expired");

    try {
      return await database.answer.create({
        data: {
          userId: userId,
          questionId: questionId,
          alternativeId: choosedOption,
        },
        include: {
          question: true,
        },
      });
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        if (e.code === "P2002") {
          throw new Error("You already voted");
        }
        if (e.code === "P2003") {
          throw new Error("Alternative doesn't exists");
        }
      }
      console.error(e);
      throw new Error("Unknown error");
    }
  }

  async function checkQuestionFinished(questionId: number): Promise<boolean> {
    const question = await database.question.findFirst({
      where: {
        id: questionId,
      },
    });
    if (!question) return false;
    return question.expiresAt < new Date();
  }

  return {
    createQuestion,
    getQuestions,
    getUserQuestions,
    getTotalVotes,
    getQuestionAlternatives,
    checkUserVoted,
    answerQuestion,
    checkQuestionFinished,
  };
}
