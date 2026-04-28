import js from '@eslint/js';
import globals from 'globals';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

export default [
  {
    languageOptions: {
      globals: Object.assign({}, globals.browser, globals.amd, globals.node, globals.jest),
    },
  },
  js.configs.recommended,
  { ignores: ['dist/', 'public/', 'tools/', 'doc_build/'] },
  eslintPluginPrettierRecommended,
];
