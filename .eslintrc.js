module.exports = {
    plugins: ["jsdoc"],
    extends: ["@lusito/eslint-config", "plugin:jsdoc/recommended"],
    rules: {
        "no-bitwise": "off",
        "lines-between-class-members": ["error", "always", { exceptAfterSingleLine: true }],
        "@typescript-eslint/explicit-member-accessibility": ["error"],
        "jsdoc/require-param-type": "off",
        "jsdoc/require-returns-type": "off",
        "jsdoc/no-types": "warn",
        "jsdoc/require-asterisk-prefix": "warn",
        "jsdoc/require-throws": "warn",
        "jsdoc/require-jsdoc": [
            "warn",
            {
                publicOnly: {
                    ancestorsOnly: true,
                    esm: true,
                    cjs: true,
                    window: false,
                },
                require: {
                    ArrowFunctionExpression: true,
                    ClassDeclaration: true,
                    ClassExpression: true,
                    FunctionDeclaration: true,
                    FunctionExpression: true,
                    MethodDefinition: false,
                },
                contexts: ['MethodDefinition:not([accessibility="private"]):not([override=true]) > FunctionExpression'],
            },
        ],
        "jsdoc/check-tag-names": ["warn", { definedTags: ["internal"] }],
        "jsdoc/require-description-complete-sentence": ["warn", { tags: ["template"], abbreviations: ["i.e."] }],
    },
    settings: {
        jsdoc: {
            ignorePrivate: true,
        },
    },
};
