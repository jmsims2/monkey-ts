import repl from "repl";
import Lexer from "./lexer/Lexer";


const interpret = (input: string, context: any, filename: any, callback: any): void => {
    
    const lexer = new Lexer(input);
    let token = lexer.nextToken();
    let tokens = [token];
    
    while(token.Type !== "EOF") {
        token = lexer.nextToken();
        tokens.push(token);
    }
    callback(null, tokens);
} 
console.log("Welcome to the Monkey Language");
repl.start({prompt: "> ", eval: interpret});