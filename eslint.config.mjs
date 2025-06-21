// eslint.config.js (at the root of your project)
import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    // Basic ESLint recommended rules
    ...pluginJs.configs.recommended,
  },
  {
    // TypeScript-specific configurations
    files: ["**/*.ts"], // Apply these configs only to .ts files
    extends: [
      ...tseslint.configs.recommended, // Recommended TypeScript rules
      // ...tseslint.configs.stylistic, // Optional: for stylistic rules
    ],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        project: "./tsconfig.json", // IMPORTANT: For type-aware linting
      },
      globals: {
        ...globals.node, // Node.js global variables
        // Add any other specific globals if needed, e.g., ...globals.browser
      },
    },
    rules: {
      // Custom rules or overrides go here.
      // Examples (same as before):
      "no-console": "warn", // Warn about console.log statements
      "@typescript-eslint/no-unused-vars": "warn",
      "indent": ["error", 2], // Enforce 2-space indentation
      "quotes": ["error", "double"], // Enforce double quotes
      "semi": ["error", "always"], // Enforce semicolons
      // "@typescript-eslint/explicit-module-boundary-types": "off"
    },
  },
  {
    // Ignore patterns (similar to .eslintignore)
    ignores: [
      "node_modules/",
      "build/",
    ]
  }
);