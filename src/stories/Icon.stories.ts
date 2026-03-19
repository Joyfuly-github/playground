import type { Meta, StoryObj } from '@storybook/vue3-vite'
import Icon from '@/components/Icon.vue'
import * as icons from 'lucide-vue-next'

const meta: Meta<typeof Icon> = {
  title: 'Components/Icon',
  component: Icon,
  argTypes: {
    type: {
      control: 'select',
      options: Object.keys(icons),
    },

    // size: {
    //   control: 'radio',
    //   options: ['xs', 'sm', 'md', 'lg'],
    //   labels: {
    //     xs: 'xsmall',
    //     sm: 'small',
    //     md: 'medium',
    //     lg: 'large',
    //   },
    // },
  },
}

export default meta

type Story = StoryObj<typeof Icon>

export const Default: Story = {
  args: {
    type: 'Home',
    // size: 'md',
  },
}
