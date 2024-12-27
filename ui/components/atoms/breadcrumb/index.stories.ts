import type { Meta, StoryObj } from '@storybook/vue3';

import Breadcrumb from './Breadcrumb.vue';

const meta = {
  title: 'Design System/Breadcrumb',
  component: Breadcrumb,
  tags: ['autodocs'],
} satisfies Meta<typeof Breadcrumb>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Page Title',
    items: [
      { href: '/', text: 'Home' },
      { href: '/products', text: 'Products' },
      { href: '/products/electronics', text: 'Electronics', active: true },
    ],
  },
  render(args) {
    return {
      components: { Breadcrumb },
      setup() {
        return { args };
      },
      template: '<div><Breadcrumb :title="args.title" :items="args.items" /></div>',
    };
  },
};
