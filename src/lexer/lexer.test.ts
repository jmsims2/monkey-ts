import { Token, TokenEnum } from "./../token/token";
import Lexer from "./Lexer";

test("read chars", () => {
    const input = "=+(){},;";

    let tests = [
        { expectedType: TokenEnum.ASSIGN, expectedLiteral: "=" },
        { expectedType: TokenEnum.PLUS, expectedLiteral: "+" },
        { expectedType: TokenEnum.LPAREN, expectedLiteral: "(" },
        { expectedType: TokenEnum.RPAREN, expectedLiteral: ")" },
        { expectedType: TokenEnum.LBRACE, expectedLiteral: "{" },
        { expectedType: TokenEnum.RBRACE, expectedLiteral: "}" },
        { expectedType: TokenEnum.COMMA, expectedLiteral: "," },
        { expectedType: TokenEnum.SEMICOLON, expectedLiteral: ";" },
    ];

    let l = new Lexer(input);
    tests.forEach((tt) => {
        let tok = l.nextToken();
        expect(tok.Type).toBe(tt.expectedType);
        expect(tok.Literal).toBe(tt.expectedLiteral);
    });
});
