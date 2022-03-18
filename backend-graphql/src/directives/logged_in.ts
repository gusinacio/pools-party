import { mapSchema, getDirective, MapperKind } from "@graphql-tools/utils";
import { ForbiddenError } from "apollo-server-express";
import { defaultFieldResolver, GraphQLSchema } from "graphql";

export function isLoggedInDirectiveTransformer(schema: GraphQLSchema) {
  const directiveName = "isLoggedin";
  return mapSchema(schema, {
    // Executes once for each object field in the schema
    [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
      // Check whether this field has the specified directive
      const loggedInDirective = getDirective(
        schema,
        fieldConfig,
        directiveName
      )?.[0];

      if (loggedInDirective) {
        const { resolve = defaultFieldResolver } = fieldConfig;

        fieldConfig.resolve = async function (source, args, context, info) {
          if (context.authService.userId != source.id) {
            throw new ForbiddenError("You must be logged in to do that!");
          }
          return await resolve(source, args, context, info);
        };
        return fieldConfig;
      }
    },
  });
}
