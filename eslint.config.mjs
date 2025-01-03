// @ts-check
import antfu from '@antfu/eslint-config';
import withNuxt from './.nuxt/eslint.config.mjs';

export default withNuxt(
    antfu({
        stylistic: {
            semi: true
        },
    }),
    {
        rules: {
            'vue/valid-v-slot': 'off',
            'vue/max-attributes-per-line': ['error', {
                singleline: {
                    max: 1,
                },
                multiline: {
                    max: 1,
                },
            }],
            'vue/multi-word-component-names': 'off', // turning this off because nuxt pages may have single-word "component"
            'vue/first-attribute-linebreak': ['error', {
                singleline: 'ignore',
                multiline: 'below',
            }],
            '@typescript-eslint/no-explicit-any': 'off',
            "prefer-const": ["error", {
                "destructuring": "any",
                "ignoreReadBeforeAssign": false
            }],
            "no-var": "error",
            "no-useless-return": "error",
            "curly": "error",
            "default-case": "error",
            "default-case-last": "error"
        },
    }
);
