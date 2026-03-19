import type { Meta, StoryObj } from '@storybook/vue3-vite'

import Textarea from '@/components/Textarea.vue'

const meta: Meta<typeof Textarea> = {
  title: 'Components/Textarea',
  component: Textarea,
  argTypes: {
    disabled: {
      control: 'boolean',
    },
    readonly: {
      control: 'boolean',
    },
    required: {
      control: 'boolean',
    },
    rows: {
      control: 'number',
    },
    size: {
      options: ['xs', 'sm', 'md', 'lg'],
      control: {
        type: 'radio',
        labels: {
          xs: 'xsmall',
          sm: 'small',
          md: 'medium',
          lg: 'large',
        },
      },
    },
    resize: {
      options: [true, false, 'none', 'both', 'horizontal', 'vertical'],
      control: {
        type: 'radio',
        // labels: {
        //   true, false, 'none(false)', 'both(true)', 'horizontal', 'vertical'
        // },
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof Textarea>

export const Default: Story = {
  args: {
    required: true,
    label: 'Default',
    placeholder: 'Placeholder',
    resize: false,
  },
  render: (args) => ({
    components: { Textarea },
    setup() {
      const value = ref('')
      return { args, value }
    },
    template: `
      <Textarea v-model="value" v-bind="args" />
    `,
  }),
}
