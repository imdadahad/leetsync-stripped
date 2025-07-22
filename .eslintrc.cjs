module.exports = {
    extends: ["plugin:@typescript-eslint/recommended", "prettier", "plugin:jsx-a11y/recommended"],
    plugins: ["@typescript-eslint", "jsx-a11y"],
    rules: {
        "explicit-function-return-type": "off",
        "no-case-declarations": "off",
        "no-empty": "off",

        /* A11Y */
        "jsx-a11y/alt-text": 2,

        /* NEXT */

        "@next/next/no-img-element": 0,
        "@next/next/no-html-link-for-pages": 0,

        /* TYPESCRIPT */

        "@typescript-eslint/no-unused-vars": "off",
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "@typescript-eslint/no-non-null-assertion": "off",
        "@typescript-eslint/no-empty-interface": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/ban-ts-comment": "off",
        "@typescript-eslint/no-var-requires": 0,
        "@typescript-eslint/no-non-null-asserted-optional-chain": 0,

        /* REACT */

        "react/prop-types": "off",
        "react/jsx-key": "off",
        "react-hooks/exhaustive-deps": "off",
        "react/display-name": [0],
    },
}
