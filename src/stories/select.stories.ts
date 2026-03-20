import type { Meta, StoryObj } from '@storybook/vue3'
import Select from '@/components/Select.vue'

interface SelectOption {
  label: string
  value: string
}

const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  component: Select,
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

type Story = StoryObj<typeof Select>

export const Default: Story = {
  args: {
    placeholder: '선택하세요',
  },
  render: (args) => ({
    components: { Select },
    setup() {
      const value = ref<SelectOption | null>(null)

      const options: SelectOption[] = [
        { label: '옵션 A', value: 'A' },
        { label: '옵션 B', value: 'B' },
        { label: '옵션 C', value: 'C' },
      ]

      return { args, value, options }
    },
    template: `
			<Select
				v-bind="args"
				v-model="value"
			>
				{{ options }}
			</Select>
    `,
  }),
}
