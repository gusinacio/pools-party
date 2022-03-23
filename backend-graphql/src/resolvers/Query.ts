import { GraphQLResolveInfo } from "graphql";
import { AppContext } from "..";
import {
  QueryQuestionsArgs,
  QueryResolvers,
  Question,
} from "../../generate/resolvers-types";

async function questions(
  _parent: {},
  args: QueryQuestionsArgs,
  context: AppContext,
  _info: GraphQLResolveInfo
) {
  const limit = args.paginationInput.limit ? args.paginationInput.limit : 4;
  const offset = args.paginationInput.offset ? args.paginationInput.offset : 0;

  const results = await context.questionService.getQuestions(offset, limit);
  return results;
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
  questions,
  user,
};

export default Query;
