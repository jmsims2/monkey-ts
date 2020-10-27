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
    COMMA = ",",
    SEMICOLON = ";",
    LPAREN = "(",
    RPAREN = ")",
    LBRACE = "{",
    RBRACE = "}",
    FUNCTION = "FUNCTION",
    LET = "LET",
}

const keywords: Map<string, TokenEnum> = new Map([
    ["fn", TokenEnum.FUNCTION],
    ["let", TokenEnum.LET],
]);

export const lookupIdentifier = (ident: string): TokenEnum => {
    return keywords.get(ident) ?? TokenEnum.IDENT;
};
