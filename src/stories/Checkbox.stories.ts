import type { Meta, StoryObj } from '@storybook/vue3-vite'
import Checkbox from '@/components/Checkbox.vue'
import Fieldset from '@/components/Fieldset.vue'
import FieldGroup from '@/components/FieldGroup.vue'

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
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

type Story = StoryObj<typeof Checkbox>

export const Default: Story = {
  args: {
    label: 'Checkbox',
  },
  render: (args) => ({
    components: { Checkbox },
    setup() {
      const value = ref(false)
      return { args, value }
    },
    template: `
      <Checkbox v-model="value" v-bind="args" />
    `,
  }),
}

export const CheckboxGroup: Story = {
  render: () => ({
    components: { Checkbox, Fieldset, FieldGroup },

    setup() {
      const selectedValue = ref([])
      const options: { label: string; value: string; name: string; disabled: boolean }[] = [
        { label: '옵션 A', value: 'A', name: 'options', disabled: false },
        { label: '옵션 B', value: 'B', name: 'options', disabled: true },
        { label: '옵션 D', value: 'C', name: 'options', disabled: false },
      ]

      return { selectedValue, options }
    },
    template: `
      <Fieldset legend="Checkbox Group" description="Select one of the options below.">
        <FieldGroup vertical>
          <Checkbox v-for="option in options" :key="option.value" v-model="selectedValue" :name="option.name" :id="option.value" :label="option.label" :value="option.value" :disabled="option.disabled" />
        </FieldGroup>
      </Fieldset>

  {{ selectedValue }}
    `,
  }),
}
