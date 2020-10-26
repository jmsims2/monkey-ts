import { Token, TokenEnum } from "./../token/token";

class Lexer {
    constructor(
        public input: string,
        public position: number = 0,
        public readPosition: number = 0,
        public ch: string = ""
    ) {
        this.readChar();
    }

    readChar(): void {
        if (this.readPosition >= this.input.length) {
            this.ch = "\0";
        } else {
            this.ch = this.input[this.readPosition];
        }
        this.position = this.readPosition;
        this.readPosition += 1;
    }

    nextToken(): Token {
        let tok: Token;
        switch (this.ch) {
            case "=":
                tok = { Type: TokenEnum.ASSIGN, Literal: "=" };
                break;
            case ";":
                tok = { Type: TokenEnum.SEMICOLON, Literal: ";" };
                break;
            case "(":
                tok = { Type: TokenEnum.LPAREN, Literal: "(" };
                break;
            case ")":
                tok = { Type: TokenEnum.RPAREN, Literal: ")" };
                break;
            case ",":
                tok = { Type: TokenEnum.COMMA, Literal: "," };
                break;
            case "+":
                tok = { Type: TokenEnum.PLUS, Literal: "+" };
                break;
            case "{":
                tok = { Type: TokenEnum.LBRACE, Literal: "{" };
                break;
            case "}":
                tok = { Type: TokenEnum.RBRACE, Literal: "}" };
                break;
            case "\0":
                tok = { Type: TokenEnum.EOF, Literal: "\0" };
                break;
            default:
                tok = { Type: TokenEnum.EOF, Literal: "\0" };
        }
        this.readChar();
        return tok;
    }
}

export default Lexer;
