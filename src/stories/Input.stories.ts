import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { fn } from 'storybook/test'

import BaseInput from '@/components/BaseInput.vue'
import BaseIcon from '@/components/BaseIcon.vue'

const meta: Meta<typeof BaseInput> = {
  title: 'Components/BaseInput',
  component: BaseInput,
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

type Story = StoryObj<typeof BaseInput>

export const Default: Story = {
  args: {
    label: 'Default',
    placeholder: 'Placeholder',
    modelValue: 'Value',
  },
  render: (args) => ({
    components: { BaseInput },
    setup() {
      const value = ref(args.modelValue)
      return { args, value }
    },
    template: `
      <BaseInput v-model="value" v-bind="args" />
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

export const SlotInput: Story = {
  args: {
    label: 'Homepage',
    placeholder: 'example.com',
  },
  render: () => ({
    components: { BaseInput, BaseIcon },
    template: `
			<BaseInput size="md">
				<template #prefix>https://</template>
				<template #suffix>
					<BaseIcon size="md" type="Bookmark"></BaseIcon>
				</template>
			</BaseInput>
    `,
  }),
}
