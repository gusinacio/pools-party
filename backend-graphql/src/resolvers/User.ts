import { User } from "@prisma/client";
import { GraphQLResolveInfo } from "graphql";
import { AppContext } from "..";
import { UserResolvers } from "../../generate/resolvers-types";

export async function questions(
  parent: User,
  _args: {},
  context: AppContext,
  _info: GraphQLResolveInfo
) {
  const question = await context.questionService.getUserQuestions(parent.id);
  if (!question) throw new Error("Question creator not found");

  return question;
}

const User: UserResolvers = {
  questions,
};

export default User;
