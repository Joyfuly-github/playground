import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { fn } from 'storybook/test'

import Button from '@/components/Button.vue'
import * as icons from 'lucide-vue-next'

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
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

type Story = StoryObj<typeof Button>

export const Playground: Story = {
  args: {
    default: 'Button',
    onClick: fn(),
  },
}

export const Basic: Story = {
  render: () => ({
    components: { Button },
    template: `
			<Button>Default</Button>
			<Button disabled>Default</Button>
			<Button icon="Search">Default</Button>
			<Button icon="Search" iconOnly />
    `,
  }),
}

export const Size: Story = {
  render: () => ({
    components: { Button },
    template: `
			<Button size="xs">xsmall</Button>
			<Button size="sm">small</Button>
			<Button>Medium</Button>
			<Button size="lg">large</Button>
    `,
  }),
}

export const Variants: Story = {
  render: () => ({
    components: { Button },
    template: `
			<Button>Default</Button>
			<Button variant="primary">Primary</Button>
			<Button variant="secondary">Secondary</Button>
			<Button variant="danger">Danger</Button>
			<Button variant="text">Text</Button>
    `,
  }),
}
