import { zodResolver } from '@hookform/resolvers/zod'
import { Button, ButtonGroup, Form, FormLayout, Text, TextField } from '@shopify/polaris'
import { color } from '@shopify/polaris-tokens'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

const schema = z.object({
  name: z.string({ required_error: 'Name is required' }),
  capacity: z.number({ required_error: 'Capacity is required' }).min(0),
  description: z.string().optional()
})

export type CreateClassroomFormData = z.infer<typeof schema>

export type CreateClassroomFormErrors = Partial<CreateClassroomFormData>

type CreateClassroomFormProps = {
  loading: boolean
  errors?: CreateClassroomFormErrors
  onSubmit: (data: CreateClassroomFormData) => Promise<void>
}

export const CreateClassroomForm = ({ onSubmit, loading, errors }: CreateClassroomFormProps) => {
  const { control, handleSubmit, formState, reset } = useForm<CreateClassroomFormData>({
    mode: 'onSubmit',
    reValidateMode: 'onBlur',
    resolver: zodResolver(schema)
  })

  return (
    <Form onSubmit={handleSubmit(onSubmit)} preventDefault>
      <FormLayout>
        <Text as="p">
          Please fill out this from with informations to create the new classroom, required fields are marked with
          a&nbsp;
          <span style={{ color: color['color-bg-critical-strong'] }}>*</span>.
        </Text>

        <FormLayout>
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
            name="capacity"
            control={control}
            render={({ field: { onChange, onBlur, value, name } }) => (
              <TextField
                requiredIndicator
                type="number"
                min={0}
                name={name}
                value={value}
                onBlur={onBlur}
                disabled={loading}
                onChange={onChange}
                label="Capacity"
                autoComplete="off"
                placeholder="Specify the classroom capacity"
                error={formState.errors.capacity?.message ?? (errors?.capacity as unknown as string)}
              />
            )}
          />
        </FormLayout>

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
              Create
            </Button>
          </ButtonGroup>
        </div>
      </FormLayout>
    </Form>
  )
}
