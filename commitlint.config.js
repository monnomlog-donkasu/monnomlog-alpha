/** @type {import('@commitlint/types').UserConfig} */
const CommitLintConfiguration = {
  extends: ["@commitlint/config-conventional"],
  // add your own scope here if needed
  // "scope-enum": [2, "always", ["components", "pages", "utils"]],
  "scope-case": [2, "always", "kebab-case"],
  parserPreset: {
    parserOpts: {
      commentChar: ";",
    },
  },
  rules: {
    "body-max-line-length": [2, "always", Infinity],
    "footer-max-line-length": [2, "always", Infinity],
  },
};

module.exports = CommitLintConfiguration;
