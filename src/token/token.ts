export interface Token {
    Type?: TokenEnum;
    Literal?: string;
}

export const enum TokenEnum {
    ILLEGAL = "ILLEGAL",
    EOF = "EOF",
    IDENT = "IDENT",
    INT = "INT",
    ASSIGN = "=",
    PLUS = "+",
    MINUS = "-",
    BANG = "!",
    ASTERISK = "*",
    SLASH = "/",
    LT = "<",
    GT = ">",
    EQ = "==",
    NOT_EQ = "!=",
    COMMA = ",",
    SEMICOLON = ";",
    LPAREN = "(",
    RPAREN = ")",
    LBRACE = "{",
    RBRACE = "}",
    FUNCTION = "FUNCTION",
    LET = "LET",
    TRUE = "TRUE",
    FALSE = "FALSE",
    IF = "IF",
    ELSE = "ELSE",
    RETURN = "RETURN",
}

const keywords: Map<string, TokenEnum> = new Map([
    ["fn", TokenEnum.FUNCTION],
    ["let", TokenEnum.LET],
    ["true", TokenEnum.TRUE],
    ["false", TokenEnum.FALSE],
    ["if", TokenEnum.IF],
    ["else", TokenEnum.ELSE],
    ["return", TokenEnum.RETURN],
]);

export const lookupIdentifier = (ident: string): TokenEnum => {
    return keywords.get(ident) ?? TokenEnum.IDENT;
};
