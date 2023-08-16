import { zodResolver } from '@hookform/resolvers/zod'
import { Button, ButtonGroup, Form, FormLayout, Select, TextField } from '@shopify/polaris'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

import type { Group } from '@/features/groups'
import type { Subject } from '@/features/subjects'

const schema = z.object({
  name: z.string({ required_error: 'Name is required' }),
  description: z.string().optional(),
  hours: z.string({ required_error: 'Hours is required' }).min(1, 'Hours must be at least 1'),
  subjectId: z.string({ required_error: 'Subject is required' }),
  groupId: z.string({ required_error: 'Group is required' })
})

export type CreateCourseFormData = z.infer<typeof schema>

export type CreateCourseFormErrors = Partial<CreateCourseFormData>

type CreateCourseFormProps = {
  loading: boolean
  errors?: CreateCourseFormErrors
  subjects?: Subject[]
  groups?: Group[]
  onSubmit: (data: CreateCourseFormData) => Promise<void>
}

export const CreateCourseForm = ({ onSubmit, loading, errors, subjects, groups }: CreateCourseFormProps) => {
  const { control, handleSubmit, formState, reset } = useForm<CreateCourseFormData>({
    mode: 'onSubmit',
    reValidateMode: 'onBlur',
    resolver: zodResolver(schema)
  })

  return (
    <Form onSubmit={handleSubmit(onSubmit)} preventDefault>
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
              placeholder="Specify a name for the course"
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
              placeholder="Add some additional information about the course..."
              error={formState.errors.description?.message ?? errors?.description}
            />
          )}
        />

        <FormLayout.Group>
          <Controller
            name="subjectId"
            control={control}
            render={({ field: { onChange, onBlur, value, name } }) => (
              <Select
                requiredIndicator
                name={name}
                label="Subject"
                options={subjects?.map((subject) => ({ label: subject.name, value: subject.id }))}
                value={value}
                onBlur={onBlur}
                onChange={onChange}
                placeholder="Select a subject"
                disabled={loading}
                error={formState.errors.subjectId?.message ?? errors?.subjectId}
              />
            )}
          />

          <Controller
            name="groupId"
            control={control}
            render={({ field: { onChange, onBlur, value, name } }) => (
              <Select
                requiredIndicator
                name={name}
                label="Group"
                options={
                  groups?.map((group) => ({
                    label: group.name,
                    value: group.id
                  })) ?? []
                }
                value={value}
                onBlur={onBlur}
                onChange={onChange}
                placeholder="Select a group"
                disabled={loading}
                error={formState.errors.groupId?.message ?? errors?.groupId}
              />
            )}
          />
        </FormLayout.Group>

        <Controller
          name="hours"
          control={control}
          render={({ field: { onChange, onBlur, value, name } }) => (
            <TextField
              requiredIndicator
              name={name}
              type="number"
              value={value}
              onBlur={onBlur}
              onChange={onChange}
              label="Hours"
              autoComplete="hours"
              placeholder="Specify the number of hours"
              disabled={loading}
              error={formState.errors.hours?.message ?? errors?.hours}
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
