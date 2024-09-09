// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs';

export default withNuxt({
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
    "vue/multi-word-component-names": "off", // turning this off because nuxt pages may have single-word "component"
    // "vue/multi-word-component-names": ["error", {
    //   "ignores": ['index', 'default']
    // }],
    'vue/first-attribute-linebreak': ['error', {
      singleline: 'ignore', multiline: 'below',
    }],
    "@typescript-eslint/no-explicit-any": "off",
  },
});
