import Lexer from "./../lexer/Lexer";
import {Token} from "./../token/token"

export const lex = (input: string): Token[] => {
    const lexer = new Lexer(input);
    let token = lexer.nextToken();
    let tokens: Token[] = [token];
    
    while(token.Type !== "EOF") {
        token = lexer.nextToken();
        tokens.push(token);
    }
    return tokens;
}