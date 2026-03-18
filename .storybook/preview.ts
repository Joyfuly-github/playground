import '@assets/scss/base/font.css'
import '@assets/scss/main.scss'
import type { Preview } from '@storybook/vue3-vite'
// import * as React from 'react'
// import {
//   Title,
//   Subtitle,
//   Description,
//   Primary,
//   Controls,
//   Stories,
// } from '@storybook/addon-docs/blocks'

const preview: Preview = {
  parameters: {
    backgrounds: { disable: true },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    // 사용 시 .tsx로 변경 후 사용
    // docs: {
    //   page: () => (
    //     <>
    //       <Title />
    //       <Subtitle />
    //       <Description />
    //       <Primary />
    //       <Controls />
    //       <Stories />
    //     </>
    //   ),
    // },

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
      template: '<div class="w-full h-full flex-center gap-8 flex-wrap"><story /></div>',
    }),
  ],
  tags: ['autodocs'],
}

export default preview
