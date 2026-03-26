import type { Meta, StoryObj } from '@storybook/vue3'
import Select from '@/components/Select.vue'
import Option from '@/components/Option.vue'
import Button from '@/components/Button.vue'

interface SelectOption {
  label: string
  value: string
  disabled: boolean
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
    label: 'Select',
    placeholder: '선택하세요',
    required: true,
  },
  render: (args) => ({
    components: { Select, Option, Button },
    setup() {
      const value = ref<SelectOption | null>(null)

      const options: SelectOption[] = [
        { label: '옵션 A', value: 'A', disabled: false },
        { label: '옵션 B', value: 'B', disabled: true },
        { label: '옵션 C', value: 'C', disabled: false },
      ]

      return { args, value, options }
    },
    template: `
			<Select
				v-bind="args"
				v-model="value"
			>
				<template v-for="(option, index) in options" :key="option.value">
					<Option :value="option.value" :label="option.label" :index="index" :disabled="option.disabled">
						<div class="flex gap-8 w-full h-full items-center">
							<div class="pt-8 pb-8  h-full">
								<img src="https://placehold.co/600x400" />
							</div>
							{{ option.label }}
						</div>
					</Option>
				</template>
			</Select>

			<Button>Default</Button>

			<Button>Default</Button>

			<Button>Default</Button>
    `,
  }),
}
