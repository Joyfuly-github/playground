import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { fn } from 'storybook/test'

import VButton from '@/components/VButton.vue'
import * as icons from 'lucide-vue-next'

const meta: Meta<typeof VButton> = {
  title: 'Components/Button',
  component: VButton,
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
}

export default meta

type Story = StoryObj<typeof VButton>

export const Playground: Story = {
  args: {
    default: 'Button',
    onClick: fn(),
  },
}

export const Basic: Story = {
  render: () => ({
    components: { VButton },
    template: `
			<VButton>Default</VButton>
			<VButton disabled>Default</VButton>
			<VButton icon="Search">Default</VButton>
			<VButton icon="Search" iconOnly />
    `,
  }),
}

export const Size: Story = {
  render: () => ({
    components: { VButton },
    template: `
			<VButton size="xs">xsmall</VButton>
			<VButton size="sm">small</VButton>
			<VButton>Medium(Default)</VButton>
			<VButton size="lg">large</VButton>
    `,
  }),
}

export const Variants: Story = {
  render: () => ({
    components: { VButton },
    template: `
			<VButton>Default</VButton>
			<VButton variant="primary">Primary</VButton>
			<VButton variant="secondary">Secondary</VButton>
			<VButton variant="danger">Danger</VButton>
			<VButton variant="text">Text</VButton>
    `,
  }),
}
