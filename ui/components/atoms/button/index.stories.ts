import { Meta, Story } from '@storybook/vue3';
import Button from './index.vue';

export default {
  title: 'Design System/Button',
  component: Button,
  argTypes: {
    size: {
      control: {
        type: 'radio',
        options: ['small', 'medium', 'large'],
      },
      description: 'Button size',
    },
    color: {
      control: {
        type: 'radio',
        options: ['primary', 'secondary', 'success', 'info', 'warning', 'error'],
      },
      description: 'Button color',
    },
    variant: {
      control: {
        type: 'radio',
        options: ['solid', 'outlined', 'soft', 'transparent'],
      },
      description: 'Button variant style',
    },
    loading: {
      control: 'boolean',
      description: 'Show loading spinner inside the button',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the button',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Make the button span the full width of its container',
    },
    icon: {
      control: 'boolean',
      description: 'Display an icon inside the button',
    },
  },
} as Meta<typeof Button>;

const Template: Story<typeof Button> = (args) => ({
  components: { Button },
  setup() {
    return { args };
  },
  template: '<Button v-bind="args">Button Label</Button>',
});

export const Default = Template.bind({});
Default.args = {
  size: 'medium',
  color: 'primary',
  variant: 'solid',
  loading: false,
  disabled: false,
  fullWidth: false,
  icon: false,
};

export const Small = Template.bind({});
Small.args = {
  size: 'small',
  color: 'primary',
  variant: 'solid',
  loading: false,
  disabled: false,
  fullWidth: false,
  icon: false,
};

export const Large = Template.bind({});
Large.args = {
  size: 'large',
  color: 'primary',
  variant: 'solid',
  loading: false,
  disabled: false,
  fullWidth: false,
  icon: false,
};

export const Loading = Template.bind({});
Loading.args = {
  size: 'medium',
  color: 'primary',
  variant: 'solid',
  loading: true,
  disabled: false,
  fullWidth: false,
  icon: false,
};

export const Disabled = Template.bind({});
Disabled.args = {
  size: 'medium',
  color: 'primary',
  variant: 'solid',
  loading: false,
  disabled: true,
  fullWidth: false,
  icon: false,
};

export const WithIcon = Template.bind({});
WithIcon.args = {
  size: 'medium',
  color: 'primary',
  variant: 'solid',
  loading: false,
  disabled: false,
  fullWidth: false,
  icon: true,
};

export const FullWidth = Template.bind({});
FullWidth.args = {
  size: 'medium',
  color: 'primary',
  variant: 'solid',
  loading: false,
  disabled: false,
  fullWidth: true,
  icon: false,
};

export const Outlined = Template.bind({});
Outlined.args = {
  size: 'medium',
  color: 'primary',
  variant: 'outlined',
  loading: false,
  disabled: false,
  fullWidth: false,
  icon: false,
};

export const Soft = Template.bind({});
Soft.args = {
  size: 'medium',
  color: 'primary',
  variant: 'soft',
  loading: false,
  disabled: false,
  fullWidth: false,
  icon: false,
};

export const Transparent = Template.bind({});
Transparent.args = {
  size: 'medium',
  color: 'primary',
  variant: 'transparent',
  loading: false,
  disabled: false,
  fullWidth: false,
  icon: false,
};
