import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { fn } from 'storybook/test'

import Icon from '@/components/Icon.vue'
import Input from '@/components/Input.vue'

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
    required: true,
    label: 'Default',
    placeholder: 'Placeholder',
    onClear: fn(),
  },
  render: (args) => ({
    components: { Input },
    setup() {
      const value = ref('')
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
    onClear: fn(),
    onSearch: fn(),
  },
  render: (args) => ({
    components: { Input },
    setup() {
      const value = ref()
      return { args, value }
    },
    template: `
      <Input v-model="value" v-bind="args" />
    `,
  }),
}

export const InputGroup: Story = {
  args: {
    label: 'Homepage',
    placeholder: 'example.com',
    onClear: fn(),
  },
  render: (args) => ({
    components: { Input, Icon },
    setup() {
      const value = ref()
      return { args, value }
    },
    template: `
			<Input v-model="value" v-bind="args">
				<template #prefix>https://</template>
				<template #suffix>
					<Icon type="Bookmark"></Icon>
				</template>
			</Input>
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `
<Input label="Homepage" placeholder="example.com">
  <template #prefix>https://</template>
  <template #suffix>
    <Icon type="Bookmark" />
  </template>
</Input>
      `,
      },
    },
  },
}
