import type { Meta, StoryObj } from '@storybook/vue3-vite'
import VIcon from '@/components/VIcon.vue'
import * as icons from 'lucide-vue-next'

const meta: Meta<typeof VIcon> = {
  title: 'Components/Icon',
  component: VIcon,
  argTypes: {
    name: {
      control: 'select',
      options: Object.keys(icons),
    },

    size: {
      control: 'radio',
      options: ['xs', 'sm', 'md', 'lg'],
      labels: {
        xs: 'xsmall',
        sm: 'small',
        md: 'medium',
        lg: 'large',
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof VIcon>

export const Default: Story = {
  args: {
    name: 'Home',
    size: 'md',
  },
}
