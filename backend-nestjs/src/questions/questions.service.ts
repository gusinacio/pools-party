import { Injectable } from '@nestjs/common';
import { Question, User } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaService } from 'src/global/prisma.service';

@Injectable()
export class QuestionsService {
  constructor(private database: PrismaService) {}
  async getQuestions(offset: number = 0, limit: number = 6) {
    const [total, results] = await this.database.$transaction([
      this.database.question.count(),
      this.database.question.findMany({
        skip: offset,
        take: limit,
        orderBy: {
          id: 'desc',
        },
      }),
    ]);

    return {
      total,
      results,
    };
  }

  async createQuestion(
    creatorId: number,
    title: string,
    options: string[],
    expiresAt: Date,
  ) {
    if (expiresAt < new Date()) {
      throw new Error('The expiration date must be in the future');
    }

    return await this.database.question.create({
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
  async answerQuestion(
    userId: number,
    questionId: number,
    choosedOption: number,
  ) {
    const question = await this.database.question.findFirst({
      where: {
        id: questionId,
      },
    });

    if (!question) throw new Error('Question not found');

    if (question.expiresAt < new Date()) throw new Error('Question expired');

    try {
      return await this.database.answer.create({
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
        if (e.code === 'P2002') {
          throw new Error('You already voted');
        }
        if (e.code === 'P2003') {
          throw new Error("Alternative doesn't exists");
        }
      }
      console.error(e);
      throw new Error('Unknown error');
    }
  }

  async getTotalVotes(questionId: number): Promise<number> {
    const totalVotes = await this.database.answer.count({
      where: {
        questionId: questionId,
      },
    });
    return totalVotes;
  }

  async getCreator(questionId: number): Promise<User> {
    const creator = await this.database.question.findFirst({
      where: {
        id: questionId,
      },
      include: {
        creator: true,
      },
    });
    return creator.creator;
  }

  async getUserQuestions(userId: number): Promise<Question[]> {
    return await this.database.question.findMany({
      where: {
        creatorId: userId,
      },
    });
  }

  async getQuestionAlternatives(questionId: number) {
    const alternatives = await this.database.question
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

  async checkUserVoted(userId: number, questionId: number): Promise<number> {
    const voted = await this.database.answer.findFirst({
      where: {
        userId: userId,
        questionId: questionId,
      },
    });
    return voted ? voted.alternativeId : -1;
  }
}
