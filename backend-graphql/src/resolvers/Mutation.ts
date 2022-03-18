import { GraphQLResolveInfo } from "graphql";
import { AppContext } from "..";
import bcrypt from "bcrypt";
import { BCRYPT_SALT_ROUNDS } from "../config";
import { createToken } from "../utils";
import {
  MutationCreateQuestionArgs,
  MutationLoginArgs,
  MutationResolvers,
  MutationSignupArgs,
} from "../../generate/resolvers-types";

async function signup(
  _parent: {},
  args: MutationSignupArgs,
  context: AppContext,
  _info: GraphQLResolveInfo
) {
  const passwordHash = await bcrypt.hash(args.password, BCRYPT_SALT_ROUNDS);
  const email = args.email.toLowerCase();
  const username = args.username.toLowerCase();

  const user = await context.prisma.user.create({
    data: { username, email, passwordHash },
  });

  const token = createToken(user.id);

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
) {
  const email = args.email.toLowerCase();

  const user = await context.prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    throw new Error("Invalid username or password");
  }

  const valid = await bcrypt.compare(args.password, user.passwordHash);

  if (!valid) {
    throw new Error("Invalid username or password");
  }

  const token = createToken(user.id);

  return {
    token,
    user,
  };
}

async function createQuestion(
  _parent: {},
  args: MutationCreateQuestionArgs,
  context: AppContext,
  _info: GraphQLResolveInfo
) {
  const userId = context.userId;

  if (!userId) {
    throw new Error("Not authenticated");
  }

  const question = await context.prisma.question.create({
    data: {
      title: args.title,
      options: {
        set: args.options,
      },
      expiresAt: args.expiresAt,
      creatorId: userId,
    },
  });

  return question;
}

const Mutation: MutationResolvers = {
  signup,
  login,
  createQuestion,
};

export default Mutation;
