import { readFileSync } from "fs";
import { resolve } from "path";

type TsConfig = {
  compilerOptions?: { types?: string[] };
  exclude?: string[];
};

const readJson = (relativePath: string): TsConfig =>
  JSON.parse(readFileSync(resolve(process.cwd(), relativePath), "utf8"));

describe("TypeScript 6 ambient types", () => {
  test("app tsconfig includes node types and excludes tests from production typecheck", () => {
    const tsconfig = readJson("tsconfig.json");

    expect(tsconfig.compilerOptions?.types).toEqual(
      expect.arrayContaining(["node"])
    );
    expect(tsconfig.exclude).toEqual(
      expect.arrayContaining(["src/__tests__", "e2e"])
    );
  });

  test("test tsconfig includes jest and testing-library types", () => {
    const tsconfig = readJson("src/__tests__/tsconfig.json");

    expect(tsconfig.compilerOptions?.types).toEqual(
      expect.arrayContaining(["jest", "@testing-library/jest-dom"])
    );
  });
});
