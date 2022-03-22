import { GraphQLSchema } from "graphql";
import { isFinishedInDirectiveTransformer } from "./is_finished";
import { isLoggedInDirectiveTransformer } from "./logged_in";

export function applyDirectives(schema: GraphQLSchema): GraphQLSchema {
  schema = isLoggedInDirectiveTransformer(schema);
  schema = isFinishedInDirectiveTransformer(schema);
  return schema;
}
