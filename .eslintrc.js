module.exports = {
    root: true,
    env: {
        node: true,
    },
    extends: [
        "plugin:vue/essential",
        "eslint:recommended",
        "@vue/typescript/recommended",
        "@vue/prettier",
        "@vue/prettier/@typescript-eslint",
    ],
    parserOptions: {
        ecmaVersion: 2020,
    },
    rules: {
        "no-console":
            process.env.NODE_ENV === "production" ||
            process.env.NODE_ENV === "staging"
                ? "error"
                : "off",
        "no-debugger":
            process.env.NODE_ENV === "production" ||
            process.env.NODE_ENV === "staging"
                ? "error"
                : "off",

        "prettier/prettier": [
            "warn",
            {
                singleQuote: false,
                semi: false,
                trailingComma: "es5",
                tabWidth: 4,
                arrowParens: "always",
            },
        ],
    },
}
