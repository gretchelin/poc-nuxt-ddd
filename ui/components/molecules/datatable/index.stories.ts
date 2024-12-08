import { Meta, Story } from '@storybook/vue3';
import DataTable from './index.vue';

export default {
  title: 'Design System/DataTable',
  component: DataTable,
} as Meta<typeof DataTable>;

const Template: Story<typeof DataTable> = (args) => ({
  components: { DataTable },
  setup() {
    return { args };
  },
  template: '<DataTable v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  // Provide default props if needed
};