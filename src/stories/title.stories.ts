import type { Meta, StoryObj } from '@storybook/vue3-vite'

import Title from '@/components/Title.vue'

const meta: Meta<typeof Title> = {
  title: 'Typography/Title',
  component: Title,
  argTypes: {
    variant: {
      options: ['h1', 'h2', 'h3', 'h4', 'h5'],
      control: {
        type: 'radio',
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof Title>

export const Default: Story = {
  args: {
    title: 'Exploring the Quiet Shape of Everyday Moments',
    description:
      'In the soft rhythm of ordinary days, small details often go unnoticed. This simple placeholder text exists only to fill the space, giving structure and balance while real content finds its way here later.',
  },
}
