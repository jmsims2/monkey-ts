import { Token, TokenEnum } from "./../token/token";

export interface Node {
  tokenLiteral: string | undefined;
}

export interface Statement extends Node {
  statementNode: () => void;
}

export interface Expression extends Node {
  expressionNode: () => void;
}

export interface Program {
  statements: Statement[];
}

export interface LetStatement extends Statement {
  token: Token | undefined;
  name: string | undefined;
  value: Expression | undefined;
}

export class Let implements LetStatement {
  constructor(
    public token: Token,
    public name: string | undefined,
    public value: Expression
  ) {}

  statementNode() {}
  tokenLiteral() {
    return this.token.Literal;
  }
}

export interface Identifier extends Expression {
  token: Token;
  value: string;
}

export class Ident implements Identifier {
  constructor(public token: Token, public value: string) {}
  expressionNode() {}
  tokenLiteral() {
    return this.token.Literal;
  }
}

export function tokenLiteral(p: Program): string | undefined {
  if (p.statements.length > 0) {
    return p.statements[0].tokenLiteral();
  }
  return "";
}
