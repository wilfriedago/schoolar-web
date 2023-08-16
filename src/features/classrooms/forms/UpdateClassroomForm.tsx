import { zodResolver } from '@hookform/resolvers/zod'
import { Button, ButtonGroup, Form, FormLayout, Text, TextField } from '@shopify/polaris'
import { color } from '@shopify/polaris-tokens'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

import type { Classroom } from '../classrooms.types'

const schema = z.object({
  id: z.string().uuid(),
  name: z.string({ required_error: 'Name is required' }),
  capacity: z.number({ required_error: 'Capacity is required' }).min(0),
  description: z.string().optional()
})

export type UpdateClassroomFormData = z.infer<typeof schema>

export type UpdateClassroomFormErrors = Partial<UpdateClassroomFormData>

type UpdateClassroomFormProps = {
  loading: boolean
  classroom: Classroom
  errors?: UpdateClassroomFormErrors
  onSubmit: (data: UpdateClassroomFormData) => Promise<void>
}

export const UpdateClassroomForm = ({ onSubmit, loading, errors, classroom }: UpdateClassroomFormProps) => {
  const { control, handleSubmit, formState, reset } = useForm<UpdateClassroomFormData>({
    mode: 'onSubmit',
    reValidateMode: 'onBlur',
    resolver: zodResolver(schema),
    defaultValues: {
      id: classroom.id,
      name: classroom.name,
      capacity: classroom.capacity,
      description: classroom.description
    }
  })

  return (
    <Form onSubmit={handleSubmit(onSubmit)} preventDefault>
      <FormLayout>
        <Text as="p">
          Please fill out this from with informations to update the new classroom, required fields are marked with
          a&nbsp;
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
              placeholder="Specify a name for the classroom"
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
              placeholder="Add some additional information about the classroom..."
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
