module.exports = {
 env: {
  browser: true,
  es2021: true,
  node: true,
 },
 extends: ["standard", "plugin:react/recommended", "prettier"],
 overrides: [
  {
   env: {
    node: true,
   },
   files: [".eslintrc.{js,cjs}"],
   parserOptions: {
    sourceType: "script",
    ecmaFeatures: {
     jsx: true,
    },
   },
  },
 ],
 parserOptions: {
  ecmaVersion: "latest",
  sourceType: "module",
 },
 plugins: ["react", "prettier"],
 settings: {
  react: {
   createClass: "createReactClass",
   pragma: "React",
   fragment: "Fragment",
   version: "detect",
   flowVersion: "0.53",
  },
  propWrapperFunctions: [
   "forbidExtraProps",
   { property: "freeze", object: "Object" },
   { property: "myFavoriteWrapper" },
   { property: "forbidExtraProps", exact: true },
  ],
  componentWrapperFunctions: [
   "observer",
   { property: "styled" },
   { property: "observer", object: "Mobx" },
   { property: "observer", object: "<pragma>" },
  ],
  formComponents: ["CustomForm", { name: "Form", formAttribute: "endpoint" }],
  linkComponents: ["Hyperlink", { name: "Link", linkAttribute: "to" }],
 },
 rules: {
  "react/jsx-uses-react": "error",
  "react/jsx-uses-vars": "error",
  "react/react-in-jsx-scope": "off",
 },
};
