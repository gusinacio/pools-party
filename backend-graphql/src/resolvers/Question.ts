import { Question } from "@prisma/client";
import { GraphQLResolveInfo } from "graphql";
import { AppContext } from "..";
import { QuestionResolvers } from "../../generate/resolvers-types";

async function creator(
  parent: Question,
  _args: {},
  context: AppContext,
  _info: GraphQLResolveInfo
) {
  const creator = await context.userService.getUserById(parent.creatorId);
  if (!creator) throw new Error("Question creator not found");

  return creator;
}

async function totalVotes(
  parent: Question,
  _args: {},
  context: AppContext,
  _info: GraphQLResolveInfo
) {
  const votes = await context.questionService.getTotalVotes(parent.id);

  return votes;
}

async function alternatives(
  parent: Question,
  _args: {},
  context: AppContext,
  _info: GraphQLResolveInfo
) {
  const alternatives = await context.questionService.getQuestionAlternatives(
    parent.id
  );

  return alternatives;
}

async function userVoted(
  parent: Question,
  _args: {},
  context: AppContext,
  _info: GraphQLResolveInfo
) {
  const userId = context.authService.userId;
  if (!userId) return -1;
  const voted = await context.questionService.checkUserVoted(userId, parent.id);

  return voted;
}

const Question: QuestionResolvers = {
  creator,
  totalVotes,
  alternatives,
  userVoted
};

export default Question;
