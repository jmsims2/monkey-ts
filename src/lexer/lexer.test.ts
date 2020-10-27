import { Token, TokenEnum } from "./../token/token";
import Lexer from "./Lexer";

describe("lexer tests", () => {
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

    test("valid program", () => {
        const input = `let five = 5;
        let ten = 10;


        let add = fn(x, y) {
            x + y;
        };
        
        let result = add(five, ten);
        `;
        let tests = [
            { expectedType: TokenEnum.LET, expectedLiteral: "let" },
            { expectedType: TokenEnum.IDENT, expectedLiteral: "five" },
            { expectedType: TokenEnum.ASSIGN, expectedLiteral: "=" },
            { expectedType: TokenEnum.INT, expectedLiteral: "5" },
            { expectedType: TokenEnum.SEMICOLON, expectedLiteral: ";" },
            { expectedType: TokenEnum.LET, expectedLiteral: "let" },
            { expectedType: TokenEnum.IDENT, expectedLiteral: "ten" },
            { expectedType: TokenEnum.ASSIGN, expectedLiteral: "=" },
            { expectedType: TokenEnum.INT, expectedLiteral: "10" },
            { expectedType: TokenEnum.SEMICOLON, expectedLiteral: ";" },
            { expectedType: TokenEnum.LET, expectedLiteral: "let" },
            { expectedType: TokenEnum.IDENT, expectedLiteral: "add" },
            { expectedType: TokenEnum.ASSIGN, expectedLiteral: "=" },
            { expectedType: TokenEnum.FUNCTION, expectedLiteral: "fn" },
            { expectedType: TokenEnum.LPAREN, expectedLiteral: "(" },
            { expectedType: TokenEnum.IDENT, expectedLiteral: "x" },
            { expectedType: TokenEnum.COMMA, expectedLiteral: "," },
            { expectedType: TokenEnum.IDENT, expectedLiteral: "y" },
            { expectedType: TokenEnum.RPAREN, expectedLiteral: ")" },
            { expectedType: TokenEnum.LBRACE, expectedLiteral: "{" },
            { expectedType: TokenEnum.IDENT, expectedLiteral: "x" },
            { expectedType: TokenEnum.PLUS, expectedLiteral: "+" },
            { expectedType: TokenEnum.IDENT, expectedLiteral: "y" },
            { expectedType: TokenEnum.SEMICOLON, expectedLiteral: ";" },
            { expectedType: TokenEnum.RBRACE, expectedLiteral: "}" },
            { expectedType: TokenEnum.SEMICOLON, expectedLiteral: ";" },
            { expectedType: TokenEnum.LET, expectedLiteral: "let" },
            { expectedType: TokenEnum.IDENT, expectedLiteral: "result" },
            { expectedType: TokenEnum.ASSIGN, expectedLiteral: "=" },
            { expectedType: TokenEnum.IDENT, expectedLiteral: "add" },
            { expectedType: TokenEnum.LPAREN, expectedLiteral: "(" },
            { expectedType: TokenEnum.IDENT, expectedLiteral: "five" },
            { expectedType: TokenEnum.COMMA, expectedLiteral: "," },
            { expectedType: TokenEnum.IDENT, expectedLiteral: "ten" },
            { expectedType: TokenEnum.RPAREN, expectedLiteral: ")" },
            { expectedType: TokenEnum.SEMICOLON, expectedLiteral: ";" },
            { expectedType: TokenEnum.EOF, expectedLiteral: "\0" },
        ];

        let l = new Lexer(input);
        tests.forEach((tt, index) => {
            let tok = l.nextToken();
            expect(tok.Type).toBe(tt.expectedType);
            expect(tok.Literal).toBe(tt.expectedLiteral);
        });
    });
});
