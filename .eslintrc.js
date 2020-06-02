module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:vue/essential", "eslint:recommended", "@vue/prettier"],
  parserOptions: {
    parser: "babel-eslint"
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    'prettier/prettier': [
      'error',
      // https://prettier.io/docs/en/options.html
      {
        singleQuote: true,
        semi: false,
        // useTabs: false,
        // // tabWidth: 2,
        // trailingComma: 'all',
        printWidth: 120, // 줄바꿈 간격
        // bracketSpacing: true,
        // arrowParens: 'avoid',
        // "endOfLine":"auto"
      },
    ],
  },
  overrides: [
    {
      files: [
        "**/__tests__/*.{j,t}s?(x)",
        "**/tests/unit/**/*.spec.{j,t}s?(x)"
      ],
      env: {
        jest: true
      }
    }
  ]
};