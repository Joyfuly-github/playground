import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { fn } from 'storybook/test'

import VInput from '@/components/VInput.vue'
import VIcon from '@/components/VIcon.vue'

const meta: Meta<typeof VInput> = {
  title: 'Components/Input',
  component: VInput,
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

type Story = StoryObj<typeof VInput>

export const Default: Story = {
  args: {
    label: 'Default',
    placeholder: 'Placeholder',
    modelValue: 'Value',
  },
  render: (args) => ({
    components: { VInput },
    setup() {
      const value = ref(args.modelValue)
      return { args, value }
    },
    template: `
      <VInput v-model="value" v-bind="args" />
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
    components: { VInput, VIcon },
    template: `
			<VInput size="md">
				<template #prefix>https://</template>
				<template #suffix>
					<VIcon size="md" name="Bookmark"></VIcon>
				</template>
			</VInput>
    `,
  }),
}
