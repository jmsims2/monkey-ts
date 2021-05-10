import { lex } from "./../utils/helpers";
import { Parser } from "./../parser/parser";
import { LetStatement } from "./../ast/ast";

describe("Parsing Tests", () => {
  it("should parse let statements", () => {
    const input = `
        let x = 5;
        let y = 10;
        let foobar = 838383;
        `;

    const tokens = lex(input);
    let parser = new Parser(tokens);
    let program = parser.parseProgram();
    expect(program).not.toBeNull();
    expect(program?.statements?.length).toBe(3);
    ["x", "y", "foobar"].forEach((identifier, index) => {
      let statement = program?.statements[index] as LetStatement;
      expect(statement?.tokenLiteral).toBe("let");
      expect(statement?.name).toBe(identifier);
    });
  });
});
