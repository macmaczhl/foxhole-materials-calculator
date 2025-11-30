import nextConfig from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";
import eslintConfigPrettier from "eslint-config-prettier/flat";

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
  ...nextConfig,
  ...nextTypescript,
  eslintConfigPrettier,
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
