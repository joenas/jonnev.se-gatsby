module.exports = {
    parser: "babel-eslint",
    parserOptions: {
        ecmaVersion: 6,
        ecmaFeatures: {
            jsx: true,
            experimentalObjectRestSpread: true
        }
    },
    plugins: ["ghost", "react", "prettier"],
    extends: [
        "plugin:ghost/node",
        "plugin:ghost/ember",
        "plugin:react/recommended",
        "standard",
        "plugin:prettier/recommended"
    ],
    settings: {
        react: {
            createClass: "createReactClass",
            pragma: "React",
            version: "16.0",
            flowVersion: "0.53"
        },
        propWrapperFunctions: ["forbidExtraProps"]
    },
    rules: {
        "ghost/sort-imports-es6-autofix/sort-imports-es6": "off",
        "ghost/ember/use-ember-get-and-set": "off",
        "no-console": "off",
        "no-inner-declarations": "off",
        "valid-jsdoc": "off",
        "require-jsdoc": "off",
        "consistent-return": ["error"],

        "jsx-quotes": ["error", "prefer-double"],
        "object-curly-spacing": ["error", "always"],

        "react/prop-types": [
            "error",
            {
                ignore: ["children"]
            }
        ]
    }
};
