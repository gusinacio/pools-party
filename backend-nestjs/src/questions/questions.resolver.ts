import { UseGuards } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Question } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CurrentUserId } from 'src/decorators/current-user';
import { QuestionsService } from './questions.service';

@Resolver('Question')
export class QuestionsResolver {
  constructor(private questionService: QuestionsService) {}

  @Query('questions')
  async questions() {
    const questions = await this.questionService.getQuestions();

    return questions;
  }

  @ResolveField()
  async creator(@Parent() question: Question) {
    const creator = await this.questionService.getCreator(question.id);
    return creator;
  }

  @ResolveField()
  async totalVotes(@Parent() question: Question) {
    const totalVotes = await this.questionService.getTotalVotes(question.id);

    return totalVotes;
  }

  @ResolveField()
  async alternatives(@Parent() question: Question) {
    const alternatives = await this.questionService.getQuestionAlternatives(
      question.id,
    );

    return alternatives;
  }

  @UseGuards(JwtAuthGuard)
  @ResolveField()
  async userVoted(
    @CurrentUserId() userId: number,
    @Parent() question: Question,
  ) {
    const userVoted = await this.questionService.checkUserVoted(
      userId,
      question.id,
    );

    return userVoted;
  }

  @UseGuards(JwtAuthGuard)
  @Mutation('createQuestion')
  async createQuestion(
    @CurrentUserId() userId: number,
    @Args('title') title: string,
    @Args('alternatives') alternatives: string[],
    @Args('expiresAt') expiresAt: Date,
  ) {
    const question = await this.questionService.createQuestion(
      userId,
      title,
      alternatives,
      expiresAt,
    );

    return question;
  }

  @UseGuards(JwtAuthGuard)
  @Mutation('answerQuestion')
  async answerQuestion(
    @CurrentUserId() userId: number,
    @Args('qustionId') qustionId: number,
    @Args('choosedAlt') choosedAlt: number,
  ) {
    const answer = await this.questionService.answerQuestion(
      userId,
      qustionId,
      choosedAlt,
    );

    return answer;
  }
}
