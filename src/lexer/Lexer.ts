import { Token, TokenEnum, lookupIdentifier } from "./../token/token";

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

        this.skipWhitespace();

        switch (this.ch) {
            case "=":
                if (this.peekChar() === "=") {
                    this.readChar();
                    tok = { Type: TokenEnum.EQ, Literal: "==" };
                } else {
                    tok = { Type: TokenEnum.ASSIGN, Literal: "=" };
                }
                break;
            case "+":
                tok = { Type: TokenEnum.PLUS, Literal: "+" };
                break;
            case "-":
                tok = { Type: TokenEnum.MINUS, Literal: "-" };
                break;
            case "!":
                if (this.peekChar() === "=") {
                    this.readChar();
                    tok = { Type: TokenEnum.NOT_EQ, Literal: "!=" };
                } else {
                    tok = { Type: TokenEnum.BANG, Literal: "!" };
                }
                break;
            case "/":
                tok = { Type: TokenEnum.SLASH, Literal: "/" };
                break;
            case "*":
                tok = { Type: TokenEnum.ASTERISK, Literal: "*" };
                break;
            case "<":
                tok = { Type: TokenEnum.LT, Literal: "<" };
                break;
            case ">":
                tok = { Type: TokenEnum.GT, Literal: ">" };
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
                if (this.isLetter(this.ch)) {
                    let Literal = this.readIdentifier();
                    let Type = lookupIdentifier(Literal);
                    return { Type, Literal };
                } else if (this.isDigit(this.ch)) {
                    return { Type: TokenEnum.INT, Literal: this.readNumber() };
                } else {
                    tok = { Type: TokenEnum.ILLEGAL, Literal: this.ch };
                }
        }
        this.readChar();
        return tok;
    }

    peekChar(): string {
        if (this.readPosition >= this.input.length) {
            return "\0";
        } else {
            return this.input[this.readPosition];
        }
    }

    readNumber(): string {
        let pos = this.position;
        while (this.isDigit(this.ch)) {
            this.readChar();
        }
        return this.input.slice(pos, this.position);
    }

    isDigit(digit: string): boolean {
        return "0123456789".includes(digit);
    }

    skipWhitespace(): void {
        while (
            this.ch === " " ||
            this.ch === "\t" ||
            this.ch === "\n" ||
            this.ch === "\r"
        ) {
            this.readChar();
        }
    }

    readIdentifier(): string {
        let pos = this.position;
        while (this.isLetter(this.ch)) {
            this.readChar();
        }
        return this.input.slice(pos, this.position);
    }

    isLetter(ch: string): boolean {
        return ch.match(/_|[a-zA-Z]/g)
            ? ch.match(/_|[a-zA-Z]/g)!.length > 0
            : false;
    }
}

export default Lexer;
