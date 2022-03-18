import Mutation from "./Mutation";
import Query from "./Query";
import Question from "./Question";
import { dateScalar as Date } from "./Date";
import { Resolvers } from "../../generate/resolvers-types";
import { AppContext } from "..";

export const resolvers: Resolvers<AppContext> = {
  Mutation,
  Query,
  Date,
  Question
};
