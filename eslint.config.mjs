// @ts-check
import antfu from '@antfu/eslint-config';
import withNuxt from './.nuxt/eslint.config.mjs';

export default withNuxt(
    antfu({
        stylistic: true,
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
            "default-case-last": "error",
            '@stylistic/semi': ["error", "always"], // requires semicolon at end of statement
            'node/prefer-global/process': "off", // allow usage of process.env

            // Deprecated since 8.53.0

            // The rules below are superseded by `@stylistic/semi`,
            // but may clash with stylistic rules if not disabled
            "semi": "off",
            "semi-spacing": "off",
            "semi-style": "off",
            "style/semi": "off", // this should be `semi-style`, but it seemed that there is also a `style/semi` --which handles the same stuff-- and will clash will stylistic rule
            "no-extra-semi": "off",
        },
    }
);
