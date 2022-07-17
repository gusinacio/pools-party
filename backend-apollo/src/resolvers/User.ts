import { User } from "@prisma/client";
import { GraphQLResolveInfo } from "graphql";
import { AppContext } from "..";
import { UserResolvers } from "../../generate/resolvers-types";

async function questions(
  parent: User,
  _args: {},
  context: AppContext,
  _info: GraphQLResolveInfo
) {
  const question = await context.questionService.getUserQuestions(parent.id);

  return question;
}

const User: UserResolvers = {
  questions,
};

export default User;
