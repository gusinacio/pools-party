import express from "express";
import { ApolloServer } from "apollo-server-express";
import { resolvers } from "./resolvers";
import { PrismaClient, User } from "@prisma/client";
import { getUserId } from "./utils";
import { readFileSync } from "fs";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { applyDirectives } from "./directives";

export interface AppContext {
  prisma: PrismaClient;
  userId: number | null;
  getUser: () => Promise<User | null>;
}

async function main() {
  const prisma = new PrismaClient();
  const typeDefs = readFileSync("../schema.graphql").toString("utf-8");
  let schema = makeExecutableSchema({ typeDefs, resolvers });
  schema = applyDirectives(schema);
  const server = new ApolloServer({
    schema,
    context: ({ req }) => {
      return {
        prisma,
        userId: req && req.headers.authorization ? getUserId(req) : null,
        getUser: () => {
          const id = req && req.headers.authorization ? getUserId(req) : null;
          if (id) {
            return prisma.user.findUnique({ where: { id } });
          }
        },
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
