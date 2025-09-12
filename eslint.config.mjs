import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
  },
  ...compat.extends("next/core-web-vitals", "next/typescript", "prettier"),
  {
    rules: {
      // Enforce consistent linebreak style
      "linebreak-style": ["error", "unix"],
      // Require newline at end of file
      "eol-last": ["error", "always"],
      // Disallow trailing whitespace at the end of lines
      "no-trailing-spaces": "error",
      // Disable problematic indent rule that causes stack overflow
      // Using @typescript-eslint/indent instead via next/typescript config
      indent: "off",
      // Disable formatting rules that conflict with Prettier
      quotes: "off",
      semi: "off",
      "comma-dangle": "off",
    },
  },
];

export default eslintConfig;
