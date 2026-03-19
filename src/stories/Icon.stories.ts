import type { Meta, StoryObj } from '@storybook/vue3-vite'
import BaseIcon from '@/components/BaseIcon.vue'
import * as icons from 'lucide-vue-next'

const meta: Meta<typeof BaseIcon> = {
  title: 'Components/BaseIcon',
  component: BaseIcon,
  argTypes: {
    type: {
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

type Story = StoryObj<typeof BaseIcon>

export const Default: Story = {
  args: {
    type: 'Home',
    size: 'md',
  },
}
