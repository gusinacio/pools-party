import { mapSchema, getDirective, MapperKind } from "@graphql-tools/utils";
import { ForbiddenError } from "apollo-server-express";
import { defaultFieldResolver, GraphQLSchema } from "graphql";
import { AppContext } from "..";

export function isFinishedInDirectiveTransformer(schema: GraphQLSchema) {
  const directiveName = "isFinished";
  return mapSchema(schema, {
    // Executes once for each object field in the schema
    [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
      // Check whether this field has the specified directive
      const isFinishedDirective = getDirective(
        schema,
        fieldConfig,
        directiveName
      )?.[0];

      if (isFinishedDirective) {
        const { resolve = defaultFieldResolver } = fieldConfig;

        fieldConfig.resolve = async function (
          source,
          args,
          context: AppContext,
          info
        ) {
          const finished = await context.questionService.checkQuestionFinished(
            source.questionId
          );
          if (!finished) return -1;
          return await resolve(source, args, context, info);
        };
        return fieldConfig;
      }
    },
  });
}
