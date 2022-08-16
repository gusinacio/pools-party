import { GraphQLDefinitionsFactory } from '@nestjs/graphql';
import { join } from 'path';

const definitionsFactory = new GraphQLDefinitionsFactory();
definitionsFactory.generate({
  typePaths: ['../schema.graphql'],
  path: join(process.cwd(), 'src/generated/graphql.ts'),
  outputAs: 'class',
});