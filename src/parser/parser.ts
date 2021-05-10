import { Program, LetStatement, tokenLiteral } from "./../ast/ast";
import { Token } from "./../token/token";

export interface IParser {
  tokens: Token[];
  curToken: Token | undefined;
  peekToken: Token | undefined;
  nextToken: () => void;
}

export class Parser implements IParser {
  public curToken: Token | undefined;
  public peekToken: Token | undefined;
  constructor(public tokens: Token[]) {
    this.nextToken();
    this.nextToken();
  }
  nextToken() {
    this.curToken = this.peekToken;
    this.peekToken = this.tokens.shift();
  }
  parseStatement() {
    switch (this.curToken?.Type) {
      case "LET":
        return this.parseLetStatement();
      default:
        return null;
    }
  }
  parseLetStatement() {
    let stmt: LetStatement = {
      token: this.curToken,
      name: undefined,
      value: undefined,
      statementNode: () => {},
      tokenLiteral: this.curToken?.Literal,
    };
    if (!this.expectPeek("IDENT")) {
      return null;
    }

    stmt.name = this.curToken?.Literal;

    if (!this.expectPeek("=")) {
      return null;
    }

    if (this.curTokenIs(";")) {
      this.nextToken();
    }

    return stmt;
  }
  curTokenIs(tokenType: string) {
    return this.curToken?.Type === tokenType;
  }
  peekTokenIs(tokenType: string) {
    return this.peekToken?.Type === tokenType;
  }
  expectPeek(tokenType: string) {
    if (this.peekTokenIs(tokenType)) {
      this.nextToken();
      return true;
    }
    return false;
  }
  parseProgram(): Program | null {
    let program: Program = {
      statements: [],
    };

    while (this.curToken?.Type !== "EOF") {
      let stmt = this.parseStatement();
      if (stmt) {
        program.statements.push(stmt);
      }
      this.nextToken();
    }
    return program;
  }
}
