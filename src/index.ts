import repl from "repl";
import Lexer from "./lexer/Lexer";
import {lex} from "./utils/helpers";


const interpret = (input: string, context: any, filename: any, callback: any): void => {
    let tokens = lex(input);
    
    callback(null, tokens);
} 
console.log("Welcome to the Monkey Language");
repl.start({prompt: "> ", eval: interpret});