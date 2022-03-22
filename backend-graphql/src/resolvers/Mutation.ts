import { GraphQLResolveInfo } from "graphql";
import { AppContext } from "..";
import {
  MutationAnswerQuestionArgs,
  MutationCreateQuestionArgs,
  MutationLoginArgs,
  MutationResolvers,
  MutationSignupArgs,
  ResolversTypes,
} from "../../generate/resolvers-types";
import { getPasswordHash } from "../utils";

async function signup(
  _parent: {},
  args: MutationSignupArgs,
  context: AppContext,
  _info: GraphQLResolveInfo
): Promise<ResolversTypes["AuthPayload"]> {
  const email = args.email.toLowerCase();
  const username = args.username.toLowerCase();
  const passwordHash = await getPasswordHash(args.password);

  const user = await context.userService.createUser(
    username,
    email,
    passwordHash
  );

  const token = context.authService.createToken(user);

  return {
    token,
    user,
  };
}

async function login(
  _parent: {},
  args: MutationLoginArgs,
  context: AppContext,
  _info: GraphQLResolveInfo
): Promise<ResolversTypes["AuthPayload"]> {
  const email = args.email.toLowerCase();

  const user = await context.userService.getUserByEmail(email);

  if (!user) {
    throw new Error("Invalid username or password");
  }

  const valid = await context.authService.validatePassword(
    args.password,
    user.passwordHash
  );

  if (!valid) {
    throw new Error("Invalid username or password");
  }

  const token = context.authService.createToken(user);

  return { token, user };
}

async function createQuestion(
  _parent: {},
  args: MutationCreateQuestionArgs,
  context: AppContext,
  _info: GraphQLResolveInfo
) {
  const userId = context.authService.userId;

  if (!userId) {
    throw new Error("Not authenticated");
  }

  const question = await context.questionService.createQuestion(
    userId,
    args.title,
    args.options,
    args.expiresAt
  );

  return question;
}

async function answerQuestion(
  _parent: {},
  args: MutationAnswerQuestionArgs,
  context: AppContext,
  _info: GraphQLResolveInfo
) {
  const userId = context.authService.userId;

  if (!userId) {
    throw new Error("Not authenticated");
  }

  const answer = await context.questionService.answerQuestion(
    userId,
    args.qustionId,
    args.choosedOption
  );

  return answer;
}

const Mutation: MutationResolvers = {
  signup,
  login,
  createQuestion,
  answerQuestion
};

export default Mutation;
