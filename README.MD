
JSON Parser (Custom Implementation in TypeScript)
=================================================

This is a simple JSON parser CLI tool built in TypeScript. It includes a custom tokenizer (lexer) and parser for learning and experimenting with how JSON parsing works under the hood — without relying on JSON.parse().

Features
--------
-  Tokenizes JSON files into meaningful tokens
-  Parses tokens into JavaScript objects/arrays
-  Handles primitive values: string, number, true, false, null
-  Supports nested objects and arrays
-  Provides helpful error messages for malformed JSON
-  CLI with help and file reading support

Usage
-----

1. Build & Link

    `npm run build`

   `npm link`

2. Example

Given data.json:

    {
      "name": "Alice",
      "age": 25,
      "skills": ["JS", "TS"],
      "active": true,
      "address": null
    }

Run:

    json-parser data.json

Output:

    parsed Output:
    {
      name: 'Alice',
      age: 25,
      skills: [ 'JS', 'TS' ],
      active: true,
      address: null
    }

Testing
---------------------

 `npm run test`

 `npm run test --watchAll`

TODOs / Improvements
--------------------
- [ ] Handle escaped characters inside strings (e.g., ", \, )
- [ ] Support Unicode sequences (\uXXXX)
- [ ] Improve error recovery for malformed input
- [ ] Add tests for edge cases
- [ ] Support reading from stdin for piping content
