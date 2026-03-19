import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { fn } from 'storybook/test'

import BaseButton from '@/components/BaseButton.vue'
import * as icons from 'lucide-vue-next'

const meta: Meta<typeof BaseButton> = {
  title: 'Components/BaseButton',
  component: BaseButton,
  argTypes: {
    disabled: {
      control: 'boolean',
    },
    variant: {
      options: [undefined, 'primary', 'secondary', 'danger', 'text'],
      control: {
        type: 'radio',
        labels: {
          undefined: 'default',
          primary: 'Primary',
          secondary: 'Secondary',
          danger: 'Danger',
          text: 'Only text',
        },
      },
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
    icon: {
      control: 'select',
      options: Object.keys(icons),
    },
  },
  decorators: [
    (story) => ({
      components: { story },
      template: '<div class="w-full h-full flex gap-8 flex-wrap"><story /></div>',
    }),
  ],
}

export default meta

type Story = StoryObj<typeof BaseButton>

export const Playground: Story = {
  args: {
    default: 'BaseButton',
    onClick: fn(),
  },
}

export const Basic: Story = {
  render: () => ({
    components: { BaseButton },
    template: `
			<BaseButton>Default</BaseButton>
			<BaseButton disabled>Default</BaseButton>
			<BaseButton icon="Search">Default</BaseButton>
			<BaseButton icon="Search" iconOnly />
    `,
  }),
}

export const Size: Story = {
  render: () => ({
    components: { BaseButton },
    template: `
			<BaseButton size="xs">xsmall</BaseButton>
			<BaseButton size="sm">small</BaseButton>
			<BaseButton>Medium(Default)</BaseButton>
			<BaseButton size="lg">large</BaseButton>
    `,
  }),
}

export const Variants: Story = {
  render: () => ({
    components: { BaseButton },
    template: `
			<BaseButton>Default</BaseButton>
			<BaseButton variant="primary">Primary</BaseButton>
			<BaseButton variant="secondary">Secondary</BaseButton>
			<BaseButton variant="danger">Danger</BaseButton>
			<BaseButton variant="text">Text</BaseButton>
    `,
  }),
}
