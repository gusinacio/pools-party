import { GraphQLResolveInfo } from "graphql";
import { AppContext } from "..";
import { QueryResolvers, Question } from "../../generate/resolvers-types";

async function allQuestions(
  _parent: {},
  _args: {},
  context: AppContext,
  _info: GraphQLResolveInfo
) {
  return await context.questionService.getQuestions();
}

async function user(
  _parent: {},
  _args: {},
  context: AppContext,
  _info: GraphQLResolveInfo
) {
  const userId = context.authService.userId;
  if (!userId) {
    throw new Error("Not authenticated");
  }

  return await context.userService.getUserById(userId);
}

const Query: QueryResolvers = {
  allQuestions,
  user,
};

export default Query;
