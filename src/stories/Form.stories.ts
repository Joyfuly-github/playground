import type { Meta, StoryObj } from '@storybook/vue3-vite'

import Form from '@/components/Form.vue'
import Title from '@/components/Title.vue'
import Button from '@/components/Button.vue'
import Fieldset from '@/components/Fieldset.vue'
import Field from '@/components/Field.vue'
import Input from '@/components/Input.vue'
import Select from '@/components/Select.vue'
import Checkbox from '@/components/Checkbox.vue'
import Textarea from '@/components/Textarea.vue'
import Option from '@/components/Option.vue'
import FieldGroup from '@/components/FieldGroup.vue'

const meta: Meta<typeof Form> = {
  title: 'Components/Form',
  component: Form,
  argTypes: {
    // type: {
    //   control: 'select',
    //   options: Object.keys(icons),
    // },
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

type Story = StoryObj<typeof Form>

interface SelectOption {
  label: string
  value: string
  disabled: boolean
}

export const Default: Story = {
  render: () => ({
    components: {
      Form,
      Fieldset,
      Title,
      Field,
      FieldGroup,
      Input,
      Select,
      Option,
      Checkbox,
      Textarea,
      Button,
    },
    setup() {
      const inputvalue = ref('')
      const checkValue = ref(false)

      const selectValue = ref<SelectOption | null>(null)

      const options: SelectOption[] = [
        { label: '옵션 A', value: 'A', disabled: false },
        { label: '옵션 B', value: 'B', disabled: true },
        { label: '옵션 C', value: 'C', disabled: false },
      ]

      return { inputvalue, checkValue, selectValue, options }
    },
    template: `
			<Form>
				<Fieldset legend="Payment Method" description="All transactions are secure and encrypted">
					<Field label="Name" required>
						<FieldGroup>
							<Input placeholder="First Name" v-model="inputvalue" />
							<Input placeholder="Last Name" v-model="inputvalue" />
						</FieldGroup>
					</Field>

					<Field>
						<Input label="Card Number" v-model="inputvalue" />
					</Field>

					<FieldGroup>
						<Field>
							<Select v-model="selectValue" label="Month">
								<template v-for="option in options" :key="option.value">
									<Option :value="option.value" :label="option.label" :disabled="option.disabled">
										<div class="flex gap-8 w-full h-full items-center">
											{{ option.label }}
										</div>
									</Option>
								</template>
							</Select>
						</Field>
						
						<Field>
							<Select v-model="selectValue" :options="options" label="Year">
								<template v-for="option in options" :key="option.value">
									<Option :value="option.value" :label="option.label" :disabled="option.disabled">
										<div class="flex gap-8 w-full h-full items-center">
											{{ option.label }}
										</div>
									</Option>
								</template>
							</Select>
						</Field>
						<Field>
							<Input label="CVC" v-model="inputvalue" />
						</Field>
					</FieldGroup>
				</Fieldset>

				<Fieldset legend="Billing Address" description="Select the address you want to use or enter a new one.">
					<Field label="address" required>
						<FieldGroup vertical>
							<Input v-model="inputvalue" />
							<Input v-model="inputvalue" />
						</FieldGroup>
					</Field>

					<Field>
						<Checkbox label="Use my shipping address" v-model="checkValue" />
					</Field>

					<Field>
						<Textarea label="Comments" placeholder="add comments" v-model="inputvalue"></Textarea>
					</Field>
				</Fieldset>
 
				<template #buttons>
					<Button>Cancel</Button>
					<Button variant="primary">Submit</Button>
				</template>
			</Form>
    `,
  }),
}
