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
  const question = await context.userService.getUserById(parent.creatorId);
  if (!question) throw new Error("Question creator not found");

  return question;
}

const Question: QuestionResolvers = {
  creator,
};

export default Question;
