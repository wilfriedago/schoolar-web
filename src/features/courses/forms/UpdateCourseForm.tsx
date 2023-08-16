import { zodResolver } from '@hookform/resolvers/zod'
import { Button, ButtonGroup, Form, FormLayout, Select, TextField } from '@shopify/polaris'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

import type { Group } from '@/features/groups'
import type { Subject } from '@/features/subjects'

import type { Course } from '../courses.types'

const schema = z.object({
  id: z.string().uuid(),
  name: z.string({ required_error: 'Name is required' }),
  description: z.string().optional(),
  hours: z.number({ required_error: 'Hours is required' }).min(1, 'Hours must be at least 1'),
  subjectId: z.string({ required_error: 'Subject is required' }),
  groupId: z.string({ required_error: 'Group is required' })
})

export type UpdateCourseFormData = z.infer<typeof schema>

export type UpdateCourseFormErrors = Partial<UpdateCourseFormData>

type UpdateCourseFormProps = {
  loading: boolean
  course: Course
  subjects: Subject[]
  groups: Group[]
  errors?: UpdateCourseFormErrors
  onSubmit: (data: UpdateCourseFormData) => Promise<void>
}

export const UpdateCourseForm = ({ onSubmit, loading, course, subjects, groups, errors }: UpdateCourseFormProps) => {
  const { control, handleSubmit, formState, reset } = useForm<UpdateCourseFormData>({
    mode: 'onSubmit',
    reValidateMode: 'onBlur',
    resolver: zodResolver(schema),
    defaultValues: {
      id: course.id,
      name: course.name,
      description: course.description,
      hours: course.hours,
      subjectId: course.subject.id,
      groupId: course.group.id
    }
  })

  return (
    <Form onSubmit={handleSubmit(onSubmit)} preventDefault>
      <FormLayout>
        {/* Similar text and explanation as in UpdateSubjectForm */}

        <Controller
          name="id"
          control={control}
          render={({ field: { onBlur, value, name } }) => (
            <TextField name={name} value={value} label="ID" onBlur={onBlur} autoComplete="" disabled />
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

        <FormLayout.Group>
          <Controller
            name="subjectId"
            control={control}
            render={({ field: { onChange, onBlur, value, name } }) => (
              <Select
                requiredIndicator
                name={name}
                label="Subject"
                options={subjects.map((subject) => ({ label: subject.name, value: subject.id }))}
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
                options={groups.map((group) => ({ label: group.name, value: group.id }))}
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
