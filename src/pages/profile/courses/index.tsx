import { Button, ButtonGroup, Card, EmptyState, IndexTable, Page, Text } from '@shopify/polaris'
import { DeleteMinor, EditMinor, ViewMinor } from '@shopify/polaris-icons'

import {
  type Course,
  CreateCourseForm,
  type CreateCourseFormData,
  UpdateCourseForm,
  type UpdateCourseFormData,
  useCreateCourseMutation,
  useDeleteCourseMutation,
  useGetCoursesQuery,
  useUpdateCourseMutation
} from '@/features/courses'
import { useGetGroupsQuery } from '@/features/groups'
import { useGetSubjectsQuery } from '@/features/subjects'
import { useModal, useToast } from '@/hooks'
import { ProfileLayout } from '@/layouts/ProfileLayout'
import { type NextPageWithLayout } from '@/shared/types'

const CoursesPage: NextPageWithLayout = () => {
  const { data, isLoading } = useGetCoursesQuery()
  const { data: subjectsData } = useGetSubjectsQuery()
  const { data: groupsData } = useGetGroupsQuery()
  const [createCourse, { isLoading: isLoadingCreateCourse }] = useCreateCourseMutation()
  const [updateCourse, { isLoading: isLoadingUpdateCourse }] = useUpdateCourseMutation()
  const [deleteCourse, { isLoading: isLoadingDeleteCourse }] = useDeleteCourseMutation()

  const modal = useModal()
  const toast = useToast()

  const handleCreateCourse = async (payload: CreateCourseFormData) => {
    try {
      await createCourse(payload).unwrap()
      toast.show({ content: 'New course created successfully !' })
    } catch (err) {
      // This toast last longer than regular toast
      toast.show({ error: true, duration: 7000, content: `An error happen while performing the request !` })
    } finally {
      modal.dismiss()
    }
  }

  const handleUpdateCourse = async (payload: UpdateCourseFormData) => {
    try {
      await updateCourse(payload).unwrap()
      toast.show({ content: 'Course updated successfully !' })
    } catch (err) {
      // This toast last longer than regular toast
      toast.show({ error: true, duration: 7000, content: `An error happen while performing the request !` })
    } finally {
      modal.dismiss()
    }
  }

  const handleDeleteCourse = async (id: string) => {
    try {
      await deleteCourse(id).unwrap()
      toast.show({ content: 'The course was deleted successfully !' })
    } catch (err) {
      // This toast last longer than regular toast
      toast.show({ error: true, duration: 7000, content: `An error happen while performing the request !` })
    } finally {
      modal.dismiss()
    }
  }

  const showCreateModal = () => {
    modal.show(
      {
        title: 'Create a new course',
        loading: isLoadingCreateCourse
      },
      <CreateCourseForm
        loading={isLoadingCreateCourse}
        onSubmit={handleCreateCourse}
        subjects={subjectsData?.content}
        groups={groupsData?.content}
      />
    )
  }

  const showUpdateModal = (course: Course) => {
    modal.show(
      {
        title: `Update ${course.name}`,
        loading: isLoadingUpdateCourse
      },
      <UpdateCourseForm
        course={course}
        loading={isLoadingUpdateCourse}
        onSubmit={handleUpdateCourse}
        subjects={subjectsData?.content}
        groups={groupsData?.content}
      />
    )
  }

  const showViewModal = (course: Course) => {
    modal.show(
      {
        title: course.name
      },
      <>{JSON.stringify(course)}</>
    )
  }

  const showDeleteModal = (course: Course) => {
    modal.show(
      {
        title: `You are about to delete ${course.name}.`,
        loading: isLoadingDeleteCourse,
        primaryAction: {
          content: 'Delete',
          icon: DeleteMinor,
          destructive: true,
          loading: isLoadingDeleteCourse,
          onAction: () => handleDeleteCourse(course.id)
        },
        secondaryActions: [
          {
            content: 'Cancel',
            onAction: () => modal.dismiss()
          }
        ]
      },
      <Text as="h3">
        Deleting a course can sometimes mean, delete every courses, or assessments related to it. Are you sure you want
        to perform this action ?
      </Text>
    )
  }

  return (
    <Page
      divider
      fullWidth
      title="Courses"
      subtitle="On this page you can manage all courses, and performing some crud actions on it."
      primaryAction={{ content: 'Add new course', onAction: showCreateModal }}
    >
      <Card padding="0">
        <IndexTable
          loading={isLoading}
          emptyState={<EmptyState image="" />}
          itemCount={Number(data?.totalElements)}
          resourceName={{ singular: 'course', plural: 'courses' }}
          headings={[
            { title: 'Name' },
            { title: 'Description', tooltipContent: 'The course description' },
            { title: 'Hours', alignment: 'center' },
            { title: 'Subject', alignment: 'center' },
            { title: 'Groups', alignment: 'center' },
            { title: 'Sessions', alignment: 'center' },
            { title: 'Actions', alignment: 'center' }
          ]}
        >
          {data?.content.map((course, index) => (
            <IndexTable.Row id={course.id} key={course.id} position={index}>
              <IndexTable.Cell>
                <Text as="p">{course.name}</Text>
              </IndexTable.Cell>
              <IndexTable.Cell>
                <Text as="p" truncate>
                  {course.description}
                </Text>
              </IndexTable.Cell>
              <IndexTable.Cell>
                <Text as="p" truncate>
                  {course.hours}
                </Text>
              </IndexTable.Cell>
              <IndexTable.Cell>
                <Text as="p" alignment="center">
                  {course.subject.name}
                </Text>
              </IndexTable.Cell>
              <IndexTable.Cell>
                <Text as="p" alignment="center">
                  {course.group.name}
                </Text>
              </IndexTable.Cell>
              <IndexTable.Cell>
                <Text as="p" alignment="center">
                  {course.sessions.length}
                </Text>
              </IndexTable.Cell>
              <IndexTable.Cell>
                <ButtonGroup noWrap spacing="extraTight" segmented>
                  <Button icon={ViewMinor} size="slim" onClick={() => showViewModal(course)} />
                  <Button icon={EditMinor} size="slim" primary onClick={() => showUpdateModal(course)} />
                  <Button icon={DeleteMinor} size="slim" destructive onClick={() => showDeleteModal(course)} />
                </ButtonGroup>
              </IndexTable.Cell>
            </IndexTable.Row>
          ))}
        </IndexTable>
      </Card>
    </Page>
  )
}

CoursesPage.layout = (page) => <ProfileLayout title="Courses | Schoolar">{page}</ProfileLayout>

export default CoursesPage
