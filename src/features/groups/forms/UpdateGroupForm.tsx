import { zodResolver } from '@hookform/resolvers/zod'
import { Button, ButtonGroup, Form, FormLayout, Text, TextField } from '@shopify/polaris'
import { color } from '@shopify/polaris-tokens'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

import type { Group } from '../groups.types'

const schema = z.object({
  id: z.string().uuid(),
  name: z.string({ required_error: 'Name is required' }),
  description: z.string().optional()
})

export type UpdateGroupFormData = z.infer<typeof schema>

export type UpdateGroupFormErrors = Partial<UpdateGroupFormData>

type UpdateGroupFormProps = {
  loading: boolean
  group: Group
  errors?: UpdateGroupFormErrors
  onSubmit: (data: UpdateGroupFormData) => Promise<void>
}

export const UpdateGroupForm = ({ onSubmit, loading, errors, group }: UpdateGroupFormProps) => {
  const { control, handleSubmit, formState, reset } = useForm<UpdateGroupFormData>({
    mode: 'onSubmit',
    reValidateMode: 'onBlur',
    resolver: zodResolver(schema),
    defaultValues: {
      id: group.id,
      name: group.name,
      description: group.description
    }
  })

  return (
    <Form onSubmit={handleSubmit(onSubmit)} preventDefault>
      <FormLayout>
        <Text as="p">
          Please fill out this from with informations to update the new group, required fields are marked with a&nbsp;
          <span style={{ color: color['color-bg-critical-strong'] }}>*</span>.
        </Text>

        <Controller
          name="id"
          control={control}
          render={({ field: { onBlur, value, name } }) => (
            <TextField name={name} value={value} label onBlur={onBlur} autoComplete="" disabled />
          )}
        />

        <Controller
          name="name"
          control={control}
          render={({ field: { onChange, onBlur, value, name } }) => (
            <TextField
              requiredIndicator
              name={name}
              value={value}
              onBlur={onBlur}
              onChange={onChange}
              label="Name"
              autoComplete="name"
              placeholder="Specify a name for the group"
              disabled={loading}
              error={formState.errors.name?.message ?? errors?.name}
            />
          )}
        />

        <Controller
          name="description"
          control={control}
          render={({ field: { onChange, onBlur, value, name } }) => (
            <TextField
              name={name}
              multiline={4}
              value={value}
              onBlur={onBlur}
              disabled={loading}
              onChange={onChange}
              label="Description"
              autoComplete="description"
              placeholder="Add some additional information about the group..."
              error={formState.errors.description?.message ?? errors?.description}
            />
          )}
        />

        <div style={{ display: 'flex', justifyContent: 'end' }}>
          <ButtonGroup noWrap>
            <Button onClick={reset} disabled={loading}>
              Reset
            </Button>
            <Button submit size="medium" loading={loading} disabled={loading} primary>
              Update
            </Button>
          </ButtonGroup>
        </div>
      </FormLayout>
    </Form>
  )
}
