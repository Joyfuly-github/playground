import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { fn } from 'storybook/test'

import Input from '@/components/Input.vue'
import Icon from '@/components/Icon.vue'

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  argTypes: {
    type: {
      options: ['text', 'password'],
      control: {
        type: 'radio',
      },
    },
    disabled: {
      control: 'boolean',
    },
    readonly: {
      control: 'boolean',
    },
    required: {
      control: 'boolean',
    },
    search: {
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

type Story = StoryObj<typeof Input>

export const Default: Story = {
  args: {
    label: 'Default',
    placeholder: 'Placeholder',
    modelValue: 'Value',
  },
  render: (args) => ({
    components: { Input },
    setup() {
      const value = ref(args.modelValue)
      return { args, value }
    },
    template: `
      <Input v-model="value" v-bind="args" />
    `,
  }),
}

export const Search: Story = {
  args: {
    label: 'Search',
    search: true,
    onSearch: fn(),
  },
}

export const Icon: Story = {
  args: {
    label: 'Homepage',
    placeholder: 'example.com',
  },
  render: () => ({
    components: { Input, Icon },
    template: `
			<Input size="md">
				<template #prefix>https://</template>
				<template #suffix>
					<Icon size="md" type="Bookmark"></Icon>
				</template>
			</Input>
    `,
  }),
}
