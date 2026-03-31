import type { Meta, StoryObj } from '@storybook/vue3-vite'
import Radio from '@/components/Radio.vue'
import Fieldset from '@/components/Fieldset.vue'
import FieldGroup from '@/components/FieldGroup.vue'

const meta: Meta<typeof Radio> = {
  title: 'Components/Radio',
  component: Radio,
  argTypes: {
    disabled: {
      control: 'boolean',
    },
    readonly: {
      control: 'boolean',
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
  },
}

export default meta

type Story = StoryObj<typeof Radio>

export const Default: Story = {
  args: {
    label: 'Radio',
  },
  render: (args) => ({
    components: { Radio },
    setup() {
      const value = ref(false)
      return { args, value }
    },
    template: `
      <Radio v-model="value" v-bind="args" />	
    `,
  }),
}

export const RadioGroup: Story = {
  args: {
    vertical: true,
  },
  render: (args) => ({
    components: { Radio, Fieldset, FieldGroup },

    setup() {
      const value = ref()
      const options: { label: string; value: string; disabled: boolean }[] = [
        { label: '옵션 A', value: 'A', disabled: false },
        { label: '옵션 B', value: 'B', disabled: false },
        { label: '옵션 C', value: 'C', disabled: false },
      ]

      return { args, value, options }
    },
    template: `
		<Fieldset legend="Radio Group" description="Select one of the options below.">
      <FieldGroup v-bind="args">
				<Radio v-for="option in options" name="radio-group" :key="option.value" v-model="value" :label="option.label" :value="option.value" :disabled="option.disabled" />				
			</FieldGroup>
		 </Fieldset>
    `,
  }),
}
