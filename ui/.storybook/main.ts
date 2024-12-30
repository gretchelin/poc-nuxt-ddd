/** @type { import('storybook-vue').StorybookConfig } */
const config = {
  stories: [
    '../components/atoms/**/*.stories.@(js|jsx|ts|tsx|mdx)',
    '../components/molecules/**/*.stories.@(js|jsx|ts|tsx|mdx)',
    '../components/organisms/**/*.stories.@(js|jsx|ts|tsx|mdx)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@chromatic-com/storybook',
  ],
  framework: {
    name: '@storybook-vue/nuxt',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
};
export default config;
