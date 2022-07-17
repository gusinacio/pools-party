import express from "express";
import { ApolloServer } from "apollo-server-express";
import { resolvers } from "./resolvers";
import { PrismaClient, User } from "@prisma/client";
import { getUserId } from "./utils";
import { readFileSync } from "fs";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { applyDirectives } from "./directives";
import { PrismaUserService } from "./service/user.service";
import JWTAuthService from "./service/auth.service";
import { AuthService, QuestionService, UserService } from "./service";
import PrismaQuestionService from "./service/question.service";

export interface AppContext {
  prisma: PrismaClient;
  userService: UserService;
  authService: AuthService;
  questionService: QuestionService;
  userId: number | null;
}

async function main() {
  // Database
  const prisma = new PrismaClient();

  // Services
  const userService = PrismaUserService(prisma);
  const questionService = PrismaQuestionService(prisma);

  // Schema
  const typeDefs = readFileSync("../schema.graphql").toString("utf-8");
  let schema = makeExecutableSchema({ typeDefs, resolvers });
  schema = applyDirectives(schema);

  // Server
  const server = new ApolloServer({
    schema,
    context: ({ req }) => {
      return {
        userService,
        questionService,
        authService: JWTAuthService(req),
      };
    },
  });
  await server.start();
  const app = express();
  server.applyMiddleware({ app });

  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );
}

main();
