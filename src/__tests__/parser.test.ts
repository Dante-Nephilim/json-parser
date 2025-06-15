import { parser } from "../parser";
import { Token, TokenType } from "../tokenizer";

describe("Parser", () => {
  test("should parse an empty object", () => {
    const tokens: Token[] = [
      { type: TokenType.LeftBrace },
      { type: TokenType.RightBrace }
    ];
    expect(parser(tokens)).toEqual({});
  });

  test("should parse a simple key-value pair", () => {
    const tokens: Token[] = [
      { type: TokenType.LeftBrace },
      { type: TokenType.String, value: "name" },
      { type: TokenType.Colon },
      { type: TokenType.String, value: "Alice" },
      { type: TokenType.RightBrace }
    ];
    expect(parser(tokens)).toEqual({ name: "Alice" });
  });

  test("should parse multiple key-value pairs", () => {
    const tokens: Token[] = [
      { type: TokenType.LeftBrace },
      { type: TokenType.String, value: "name" },
      { type: TokenType.Colon },
      { type: TokenType.String, value: "Bob" },
      { type: TokenType.Comma },
      { type: TokenType.String, value: "age" },
      { type: TokenType.Colon },
      { type: TokenType.Number, value: 25 },
      { type: TokenType.RightBrace }
    ];
    expect(parser(tokens)).toEqual({ name: "Bob", age: 25 });
  });

  test("should parse boolean and null values", () => {
    const tokens: Token[] = [
      { type: TokenType.LeftBrace },
      { type: TokenType.String, value: "isStudent" },
      { type: TokenType.Colon },
      { type: TokenType.True, value: true },
      { type: TokenType.Comma },
      { type: TokenType.String, value: "middleName" },
      { type: TokenType.Colon },
      { type: TokenType.Null, value: null },
      { type: TokenType.RightBrace }
    ];
    expect(parser(tokens)).toEqual({ isStudent: true, middleName: null });
  });

  test("should parse an array of strings", () => {
    const tokens: Token[] = [
      { type: TokenType.LeftBrace },
      { type: TokenType.String, value: "fruits" },
      { type: TokenType.Colon },
      { type: TokenType.LeftBracket },
      { type: TokenType.String, value: "apple" },
      { type: TokenType.Comma },
      { type: TokenType.String, value: "banana" },
      { type: TokenType.Comma },
      { type: TokenType.String, value: "cherry" },
      { type: TokenType.RightBracket },
      { type: TokenType.RightBrace }
    ];
    expect(parser(tokens)).toEqual({ fruits: ["apple", "banana", "cherry"] });
  });

  test("should parse nested objects", () => {
    const tokens: Token[] = [
      { type: TokenType.LeftBrace },
      { type: TokenType.String, value: "person" },
      { type: TokenType.Colon },
      { type: TokenType.LeftBrace },
      { type: TokenType.String, value: "name" },
      { type: TokenType.Colon },
      { type: TokenType.String, value: "Charlie" },
      { type: TokenType.RightBrace },
      { type: TokenType.RightBrace }
    ];
    expect(parser(tokens)).toEqual({
      person: {
        name: "Charlie"
      }
    });
  });

  test("should parse an array of numbers", () => {
    const tokens: Token[] = [
      { type: TokenType.LeftBrace },
      { type: TokenType.String, value: "scores" },
      { type: TokenType.Colon },
      { type: TokenType.LeftBracket },
      { type: TokenType.Number, value: 100 },
      { type: TokenType.Comma },
      { type: TokenType.Number, value: 95 },
      { type: TokenType.Comma },
      { type: TokenType.Number, value: 87 },
      { type: TokenType.RightBracket },
      { type: TokenType.RightBrace }
    ];
    expect(parser(tokens)).toEqual({
      scores: [100, 95, 87]
    });
  });
});
