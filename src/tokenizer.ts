export enum TokenType {
  LeftBrace = "LeftBrace", // {
  RightBrace = "RightBrace", // }
  LeftBracket = "LeftBracket", // [
  RightBracket = "RightBracket", // ]
  Colon = "Colon", // :
  Comma = "Comma", // ,
  String = "String", // "hello"
  Number = "Number", // 123, -5.4
  True = "True", // true
  False = "False", // false
  Null = "Null", // null
  Invalid = "Invalid",
}

export interface Token {
  type: TokenType;
  value?: string | number | boolean | null;
}

function isDigit(char: string): boolean {
  return !isNaN(parseInt(char));
}

function isAlphabet(char: string): boolean {
  const regex = /^[a-zA-Z]$/;
  return regex.test(char);
}

export function tokenize(input: string): Token[] {
  if (input.length === 0) {
    return [];
  } else {
    const tokens: Token[] = [];

    let i = 0;

    while (i < input.length) {
      const char = input[i];

      if (char === "{") {
        tokens.push({ type: TokenType.LeftBrace });
        i++;
        continue;
      }
      if (char === ":") {
        tokens.push({ type: TokenType.Colon });
        i++;
        continue;
      }
      if (char === "}") {
        tokens.push({ type: TokenType.RightBrace });
        i++;
        continue;
      }
      if (char === ",") {
        tokens.push({ type: TokenType.Comma });
        i++;
        continue;
      }
      if (char === "[") {
        tokens.push({ type: TokenType.LeftBracket });
        i++;
        continue;
      }
      if (char === "]") {
        tokens.push({ type: TokenType.RightBracket });
        i++;
        continue;
      }
      

      //Strings

      if (char === '"') {
        let j = i + 1;
        while (input[j] !== '"') {
          j++;
        }
        const value = input.slice(i + 1, j);
        tokens.push({ type: TokenType.String, value });
        i = j + 1;
        continue;
      }

      //Numbers

      if (char === "-" || isDigit(char)) {
        let j = i;
        if (input[j] === "-") {
          j++;
        }
        while (isDigit(input[j])) {
          j++;
        }
        if (input[j] === ".") {
          j++;
          while (isDigit(input[j])) {
            j++;
          }
        }
        const value = input.slice(i, j);
        tokens.push({ type: TokenType.Number, value: parseFloat(value) });
        i = j;
        continue;
      }

      //Boolean

      if (char === "t" || char === "f") {
        if (char === "t") {
          let j = i;
          while (isAlphabet(input[j])) {
            j++;
          }
          const value = input.slice(i, j);
          if (value === "true") {
            tokens.push({ type: TokenType.True, value: true });
          } else {
            tokens.push({ type: TokenType.Invalid, value });
          }
          i = j;
          continue;
        } else if (char === "f") {
          let j = i;
          while (isAlphabet(input[j])) {
            j++;
          }
          const value = input.slice(i, j);
          if (value === "false") {
            tokens.push({ type: TokenType.False, value: false });
          } else {
            tokens.push({ type: TokenType.Invalid, value });
          }
          i = j;
          continue;
        }
      }

      // Null

      if (char === "n") {
        let j = i;
        while (isAlphabet(input[j])) {
          j++;
        }
        const value = input.slice(i, j);
        if (value === "null") {
          tokens.push({ type: TokenType.Null, value: null });
        } else {
          tokens.push({ type: TokenType.Invalid, value });
        }
        i = j;
        continue;
        ``;
      }

      i++;
    }

    return tokens;
  }
}
