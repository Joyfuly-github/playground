import '@assets/scss/base/font.css'
import '@assets/scss/main.scss'

import type { Preview } from '@storybook/vue3-vite'

const preview: Preview = {
  parameters: {
    backgrounds: { disable: true },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo',
    },
  },
  decorators: [
    (story) => ({
      components: { story },
      template: '<div class="w-full h-hull flex-center gap-8 flex-wrap"><story /></div>',
    }),
  ],
}

export default preview
