import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [{
  ignores: ["node_modules/**", ".next/**", "out/**", "build/**", "next-env.d.ts"]
}, ...compat.extends("next/core-web-vitals", "next/typescript"), {
  rules: {
    // Enforce consistent linebreak style
    "linebreak-style": ["error", "unix"],
    // Require newline at end of file
    "eol-last": ["error", "always"],
    // Disallow trailing whitespace at the end of lines
    'no-trailing-spaces': 'error',
  },
}];

export default eslintConfig;
