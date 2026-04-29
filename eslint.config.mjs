import globals from 'globals';
import {defineConfig} from 'eslint/config';

export default defineConfig([
    {
        files: ['**/*.{js,mjs,cjs}'],
        extends: ['js/recommended'],
        languageOptions: {
            globals: globals.browser,
        },
    },

    {
        files: ['**/*.{ts,mts,cts}'],
        extends: ['plugin:@typescript-eslint/recommended'],
        languageOptions: {
            parser: '@typescript-eslint/parser',
            parserOptions: {
                project: './tsconfig.json',
            },
            globals: globals.browser,
        },
        rules: {
            '@typescript-eslint/no-explicit-any': 'error',
        },
    },
]);
