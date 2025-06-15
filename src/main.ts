import { promises as fs } from "fs";
import path from "path";
import { tokenize } from "./tokenizer";
import { parser } from "./parser";

export async function parseArgumentsAndRun(): Promise<void> {
  const args = process.argv.slice(2);

  if (args.length === 0 || args.includes("--help") || args.includes("-h")) {
    const helpMessage = `json-parser - used to parse json files
    Usage:
    json-parser <filename.extension>`;
    console.log(helpMessage);
    process.exit(0);
  }
  const filePath = args[0];
  if (!filePath.includes(".")) {
    const missingExtensionErrorMessage = `Missing file extension.
    Usage:
    json-parser <filename.extension>`;
    console.error(missingExtensionErrorMessage);
    process.exit(1);
  }
  try {
    const resolvedPath = path.resolve(process.cwd(), filePath);
    const content = await fs.readFile(resolvedPath, "utf-8");
    const tokens = tokenize(content);
    const parsedJson = parser(tokens);

    console.log("parsed Output:");
    console.dir(parsedJson, { depth: null, colors: true });
  } catch (err) {
    console.error(`Error reading file: ${filePath}`);
    console.error(err);
    process.exit(1);
  }
}
