import type { Meta, StoryObj } from '@storybook/vue3-vite'
import Checkbox from '@/components/Checkbox.vue'

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  argTypes: {
    disabled: {
      control: 'boolean',
    },
    readonly: {
      control: 'boolean',
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
  },
}

export default meta

type Story = StoryObj<typeof Checkbox>

export const Default: Story = {
  args: {
    label: 'Checkbox',
  },
  render: (args) => ({
    components: { Checkbox },
    setup() {
      const value = ref(false)
      return { args, value }
    },
    template: `
      <Checkbox v-model="value" v-bind="args" />
    `,
  }),
}
