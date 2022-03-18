import { GraphQLResolveInfo } from "graphql";
import { AppContext } from "..";
import { QueryResolvers, Question } from "../../generate/resolvers-types";

async function allQuestions(
  _parent: {},
  _args: {},
  context: AppContext,
  _info: GraphQLResolveInfo
) {
  return await context.prisma.question.findMany();
}

const Query: QueryResolvers = {
  allQuestions,
};

export default Query;
