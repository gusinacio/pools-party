import { GraphQLSchema } from "graphql";
import { isLoggedInDirectiveTransformer } from "./logged_in";

export function applyDirectives(schema: GraphQLSchema): GraphQLSchema {
  schema = isLoggedInDirectiveTransformer(schema);
  return schema;
}
