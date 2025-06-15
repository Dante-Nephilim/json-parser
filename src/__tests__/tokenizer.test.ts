import { tokenize, TokenType } from "../tokenizer";

describe("Tokenizer", () => {
  test("should tokenize empty object '{}'", () => {
    const input = "{}";
    const tokens = tokenize(input);
    expect(tokens).toEqual([{ type: TokenType.LeftBrace }, { type: TokenType.RightBrace }]);
  });

  test("should tokenize empty string", () => {
    const input = "";
    const tokens = tokenize(input);
    expect(tokens).toEqual([]);
  });

  test("should tokenize a string key-value pair", () => {
    const input = '{"key":"value"}';
    const tokens = tokenize(input);
    expect(tokens).toEqual([
      { type: TokenType.LeftBrace },
      { type: TokenType.String, value: "key" },
      { type: TokenType.Colon },
      { type: TokenType.String, value: "value" },
      { type: TokenType.RightBrace },
    ]);
  });

  test("should tokenize a number key-value pair", () => {
    const input = '{"key":-55.3}';
    const tokens = tokenize(input);
    expect(tokens).toEqual([
      { type: TokenType.LeftBrace },
      { type: TokenType.String, value: "key" },
      { type: TokenType.Colon },
      { type: TokenType.Number, value: -55.3 },
      { type: TokenType.RightBrace },
    ]);
  });

  test("should tokenize a boolean true key-value pair", () => {
    const input = '{"key":true}';
    const tokens = tokenize(input);
    expect(tokens).toEqual([
      { type: TokenType.LeftBrace },
      { type: TokenType.String, value: "key" },
      { type: TokenType.Colon },
      { type: TokenType.True, value: true },
      { type: TokenType.RightBrace },
    ]);
  });

  test("should tokenize a boolean false key-value pair", () => {
    const input = '{"key":false}';
    const tokens = tokenize(input);
    expect(tokens).toEqual([
      { type: TokenType.LeftBrace },
      { type: TokenType.String, value: "key" },
      { type: TokenType.Colon },
      { type: TokenType.False, value: false },
      { type: TokenType.RightBrace },
    ]);
  });

  test("should tokenize a null key-value pair", () => {
    const input = '{"key":null}';
    const tokens = tokenize(input);
    expect(tokens).toEqual([
      { type: TokenType.LeftBrace },
      { type: TokenType.String, value: "key" },
      { type: TokenType.Colon },
      { type: TokenType.Null, value: null },
      { type: TokenType.RightBrace },
    ]);
  });

  test("should tokenize a boolean true key-value pair with invalid value", () => {
    const input = '{"key":truely}';
    const tokens = tokenize(input);
    expect(tokens).toEqual([
      { type: TokenType.LeftBrace },
      { type: TokenType.String, value: "key" },
      { type: TokenType.Colon },
      { type: TokenType.Invalid, value: "truely" },
      { type: TokenType.RightBrace },
    ]);
  });

  test("should tokenize a boolean false key-value pair with invalid value", () => {
    const input = '{"key":falsey}';
    const tokens = tokenize(input);
    expect(tokens).toEqual([
      { type: TokenType.LeftBrace },
      { type: TokenType.String, value: "key" },
      { type: TokenType.Colon },
      { type: TokenType.Invalid, value: "falsey" },
      { type: TokenType.RightBrace },
    ]);
  });

  test("should tokenize a null key-value pair with invalid value", () => {
    const input = '{"key":nully}';
    const tokens = tokenize(input);
    expect(tokens).toEqual([
      { type: TokenType.LeftBrace },
      { type: TokenType.String, value: "key" },
      { type: TokenType.Colon },
      { type: TokenType.Invalid, value: "nully" },
      { type: TokenType.RightBrace },
    ]);
  });

  test("should tokenize a multiple key value pairs", () => {
    const input = '{"key1":"string1","key2":-24.5,"key3":true,"key4":false,"key5":null,"key6":nully}';
    const tokens = tokenize(input);
    expect(tokens).toEqual([
      { type: TokenType.LeftBrace },
      { type: TokenType.String, value: "key1" },
      { type: TokenType.Colon },
      { type: TokenType.String, value: "string1" },
      { type: TokenType.Comma },
      { type: TokenType.String, value: "key2" },
      { type: TokenType.Colon },
      { type: TokenType.Number, value: -24.5 },
      { type: TokenType.Comma },
      { type: TokenType.String, value: "key3" },
      { type: TokenType.Colon },
      { type: TokenType.True, value: true },
      { type: TokenType.Comma },
      { type: TokenType.String, value: "key4" },
      { type: TokenType.Colon },
      { type: TokenType.False, value: false },
      { type: TokenType.Comma },
      { type: TokenType.String, value: "key5" },
      { type: TokenType.Colon },
      { type: TokenType.Null, value: null },
      { type: TokenType.Comma },
      { type: TokenType.String, value: "key6" },
      { type: TokenType.Colon },
      { type: TokenType.Invalid, value: "nully" },
      { type: TokenType.RightBrace },
    ]);
  });

  test("should tokenize an array value", () => {
    const input = '{"charKey":["a","b","c"],"boolKey":[true,false,truely],"numKey":[1,2,3]}';
    const tokens = tokenize(input);
    expect(tokens).toEqual([
      { type: TokenType.LeftBrace },

      { type: TokenType.String, value: "charKey" },
      { type: TokenType.Colon },

      { type: TokenType.LeftBracket },
      { type: TokenType.String, value: "a" },
      { type: TokenType.Comma },
      { type: TokenType.String, value: "b" },
      { type: TokenType.Comma },
      { type: TokenType.String, value: "c" },
      { type: TokenType.RightBracket },

      { type: TokenType.Comma },

      { type: TokenType.String, value: "boolKey" },
      { type: TokenType.Colon },

      { type: TokenType.LeftBracket },
      { type: TokenType.True, value: true },
      { type: TokenType.Comma },
      { type: TokenType.False, value: false },
      { type: TokenType.Comma },
      { type: TokenType.Invalid, value: "truely" },
      { type: TokenType.RightBracket },

      { type: TokenType.Comma },

      { type: TokenType.String, value: "numKey" },
      { type: TokenType.Colon },

      { type: TokenType.LeftBracket },
      { type: TokenType.Number, value: 1 },
      { type: TokenType.Comma },
      { type: TokenType.Number, value: 2 },
      { type: TokenType.Comma },
      { type: TokenType.Number, value: 3 },
      { type: TokenType.RightBracket },

      { type: TokenType.RightBrace },
    ]);
  });
  test("should tokenize an nested object", () => {
    const input = '{"charKey":["a","b","c"],"nestedJson":{"boolKey":[true,false,truely],"numKey":[1,2,3]}}';
    const tokens = tokenize(input);
    expect(tokens).toEqual([
      { type: TokenType.LeftBrace },

      { type: TokenType.String, value: "charKey" },
      { type: TokenType.Colon },

      { type: TokenType.LeftBracket },
      { type: TokenType.String, value: "a" },
      { type: TokenType.Comma },
      { type: TokenType.String, value: "b" },
      { type: TokenType.Comma },
      { type: TokenType.String, value: "c" },
      { type: TokenType.RightBracket },

      { type: TokenType.Comma },

      { type: TokenType.String, value: "nestedJson" },
      { type: TokenType.Colon },

      { type: TokenType.LeftBrace },
      
      { type: TokenType.String, value: "boolKey" },
      { type: TokenType.Colon },

      { type: TokenType.LeftBracket },
      { type: TokenType.True, value: true },
      { type: TokenType.Comma },
      { type: TokenType.False, value: false },
      { type: TokenType.Comma },
      { type: TokenType.Invalid, value: "truely" },
      { type: TokenType.RightBracket },

      { type: TokenType.Comma },

      { type: TokenType.String, value: "numKey" },
      { type: TokenType.Colon },

      { type: TokenType.LeftBracket },
      { type: TokenType.Number, value: 1 },
      { type: TokenType.Comma },
      { type: TokenType.Number, value: 2 },
      { type: TokenType.Comma },
      { type: TokenType.Number, value: 3 },
      { type: TokenType.RightBracket },

      { type: TokenType.RightBrace },

      { type: TokenType.RightBrace },


    ])
  });
});
