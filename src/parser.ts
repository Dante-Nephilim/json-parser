import { Token, TokenType } from "./tokenizer";

export function parser(tokens: Token[]): any {
  let current = 0;

  function peak() {
    return tokens[current];
  }

  function consume() {
    return tokens[current++];
  }

  function parseObject(): any {
    const obj: any = {};
    consume();

    while (peak().type !== TokenType.RightBrace) {
      const keyToken = consume();
      if (keyToken.type !== TokenType.String) {
        throw new Error(`Expected string key but got: ${JSON.stringify(keyToken)}`);
      }

      if (consume().type !== TokenType.Colon) {
        throw new Error(`Expected colon`);
      }

      const value = parseValue();
      obj[keyToken.value as string] = value;

      if (peak().type === TokenType.Comma) {
        consume();
      } else {
        break;
      }
    }
    if (consume().type !== TokenType.RightBrace) {
      throw new Error("Expected closing brace");
    }
    return obj;
  }

  function parseArray(): any[] {
    const arr: any[] = [];
    consume();

    while (peak().type !== TokenType.RightBracket) {
      arr.push(parseValue());

      if (peak().type === TokenType.Comma) {
        consume();
      } else {
        break;
      }
    }
    if (consume().type !== TokenType.RightBracket) {
      throw new Error("Error missing closing bracket");
    }
    return arr;
  }

  function parseValue(): any {
    const token = peak();

    switch (token.type) {
      case TokenType.String:
      case TokenType.Number:
      case TokenType.True:
      case TokenType.False:
      case TokenType.Null:
        return consume().value;

      case TokenType.LeftBrace:
        return parseObject();

      case TokenType.LeftBracket:
        return parseArray();

      default:
        throw new Error(`Unexpected token: ${JSON.stringify(token)}`);
    }
  }
  return parseValue();
}
