import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { fn } from 'storybook/test'

import Badge from '@/components/Badge.vue'
import * as icons from 'lucide-vue-next'

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  argTypes: {
    variant: {
      options: [undefined, 'primary', 'secondary', 'success', 'info', 'warning', 'danger'],
      control: {
        type: 'radio',
        labels: {
          undefined: 'default',
          primary: 'Primary',
          secondary: 'Secondary',
          success: 'Success',
          info: 'Info',
          warning: 'Warning',
          danger: 'Danger',
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
      template: '<div class="w-full h-full flex-center gap-8 flex-wrap"><story /></div>',
    }),
  ],
}

export default meta

type Story = StoryObj<typeof Badge>

export const Playground: Story = {
  args: {
    default: 'Badge',
  },
}

export const Size: Story = {
  render: () => ({
    components: { Badge },
    template: `
			<Badge size="xs">xsmall</Badge>
			<Badge size="sm">small</Badge>
			<Badge size="md">medium</Badge>
			<Badge size="lg">large</Badge>
    `,
  }),
}

export const Variants: Story = {
  render: () => ({
    components: { Badge },
    template: `
			<Badge>Default</Badge>
			<Badge variant="primary">Primary</Badge>
			<Badge variant="secondary">Secondary</Badge>
			<Badge variant="success">Success</Badge>
			<Badge variant="info">Info</Badge>
			<Badge variant="warning">Warning</Badge>
			<Badge variant="danger">Danger</Badge>
			<Badge variant="ghost">Ghost</Badge>
			<Badge variant="link">link</Badge>
    `,
  }),
}

export const WithIcons: Story = {
  render: () => ({
    components: { Badge },
    template: `
			<Badge icon="Search">Default</Badge>
			<Badge variant="primary" icon="Check">Primary</Badge>
			<Badge variant="secondary" icon="X">Secondary</Badge>
			<Badge variant="success" icon="CheckCircle">Success</Badge>
    `,
  }),
}
