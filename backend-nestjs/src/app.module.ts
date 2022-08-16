import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { AuthModule } from './auth/auth.module';
import config from './config';
import { applyDirectives } from './directives';
import { GlobalModule } from './global/global.module';
import { UserModule } from './user/user.module';
import { QuestionsModule } from './questions/questions.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ['../schema.graphql'],
      transformSchema: (schema) => applyDirectives(schema),
    }),
    GlobalModule,
    UserModule,
    AuthModule,
    GlobalModule,
    QuestionsModule,
  ],
})
export class AppModule {}
