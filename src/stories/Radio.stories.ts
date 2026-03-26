import type { Meta, StoryObj } from '@storybook/vue3-vite'
import Radio from '@/components/Radio.vue'

const meta: Meta<typeof Radio> = {
  title: 'Components/Radio',
  component: Radio,
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

type Story = StoryObj<typeof Radio>

export const Default: Story = {
  args: {
    label: 'Radio',
  },
  render: (args) => ({
    components: { Radio },
    setup() {
      const value = ref(false)
      return { args, value }
    },
    template: `
      <Radio v-model="value" name="fruit" value="apple">
				사과
			</Radio>

			<Radio v-model="value" name="fruit" value="banana">
				바나나
			</Radio>
    `,
  }),
}
