import { Question } from "@prisma/client";
import { GraphQLResolveInfo } from "graphql";
import { AppContext } from "..";
import { QuestionResolvers } from "../../generate/resolvers-types";

export async function creator(
  parent: Question,
  _args: {},
  context: AppContext,
  _info: GraphQLResolveInfo
) {
  return await context.prisma.question
    .findUnique({ where: { id: parent.creatorId } })
    .creator();
}

const Question: QuestionResolvers = {
  creator,
};

export default Question;
