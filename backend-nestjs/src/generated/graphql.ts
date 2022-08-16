
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class PaginationInput {
    limit?: Nullable<number>;
    offset?: Nullable<number>;
}

export interface PaginatedResponse {
    total: number;
}

export class User {
    id: string;
    username: string;
    email: string;
    createdAt: Date;
    questions: Question[];
}

export class Question {
    id: string;
    title: string;
    alternatives: Alternative[];
    creator: User;
    createdAt: Date;
    expiresAt: Date;
    totalVotes: number;
    userVoted: number;
}

export class Alternative {
    alternativeId: number;
    text: string;
    votes: number;
}

export class Answer {
    question: Question;
    alternativeId: number;
}

export class PaginatedQuestions implements PaginatedResponse {
    results: Question[];
    total: number;
}

export class AuthPayload {
    token: string;
    user: User;
}

export abstract class IQuery {
    abstract questions(paginationInput: PaginationInput): PaginatedQuestions | Promise<PaginatedQuestions>;

    abstract user(): Nullable<User> | Promise<Nullable<User>>;
}

export abstract class IMutation {
    abstract signup(email: string, password: string, username: string): AuthPayload | Promise<AuthPayload>;

    abstract login(email: string, password: string): AuthPayload | Promise<AuthPayload>;

    abstract createQuestion(title: string, alternatives: string[], expiresAt: Date): Question | Promise<Question>;

    abstract answerQuestion(qustionId: number, choosedAlt: number): Answer | Promise<Answer>;
}

type Nullable<T> = T | null;
