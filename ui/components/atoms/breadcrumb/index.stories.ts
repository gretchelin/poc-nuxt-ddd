import type { Meta, StoryFn } from '@nuxtjs/storybook';
import Breadcrumb from './index.vue';

export default {
  title: 'Design System/Breadcrumb',
  component: Breadcrumb,
  argTypes: {
    title: { control: 'text' },
    items: {
      control: 'array',
      description: 'Breadcrumb items as an array of objects containing href and text',
    },
  },
} as Meta<typeof Breadcrumb>;

const Template: StoryFn<typeof Breadcrumb> = args => ({
  components: { Breadcrumb },
  setup() {
    return { args };
  },
  template: '<Breadcrumb title="args.title" :items="args.items" />',
});

export const Default = Template.bind({});
Default.args = {
  title: 'Page Title',
  items: [
    { href: '/', text: 'Home' },
    { href: '/products', text: 'Products' },
    { href: '/products/electronics', text: 'Electronics', active: true },
  ],
};
