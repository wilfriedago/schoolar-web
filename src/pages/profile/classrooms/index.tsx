import { Button, ButtonGroup, Card, EmptyState, IndexTable, Page, Text } from '@shopify/polaris'
import { DeleteMinor, EditMinor, ViewMinor } from '@shopify/polaris-icons'

import {
  type Classroom,
  CreateClassroomForm,
  type CreateClassroomFormData,
  UpdateClassroomForm,
  type UpdateClassroomFormData,
  useCreateClassroomMutation,
  useDeleteClassroomMutation,
  useGetClassroomsQuery,
  useUpdateClassroomMutation
} from '@/features/classrooms'
import { useModal, useToast } from '@/hooks'
import { ProfileLayout } from '@/layouts/ProfileLayout'
import { type NextPageWithLayout } from '@/shared/types'

const ClassroomsPage: NextPageWithLayout = () => {
  const { data, isLoading } = useGetClassroomsQuery()
  const [createClassroom, { isLoading: isLoadingCreateClassroom }] = useCreateClassroomMutation()
  const [updateClassroom, { isLoading: isLoadingUpdateClassroom }] = useUpdateClassroomMutation()
  const [deleteClassroom, { isLoading: isLoadingDeleteClassroom }] = useDeleteClassroomMutation()

  const modal = useModal()
  const toast = useToast()

  const handleCreateClassroom = async (payload: CreateClassroomFormData) => {
    try {
      await createClassroom(payload).unwrap()
      toast.show({ content: 'New classroom created successfully !' })
    } catch (err) {
      // This toast last longer than regular toast
      toast.show({ error: true, duration: 7000, content: `An error happen while performing the request !` })
    } finally {
      modal.dismiss()
    }
  }

  const handleUpdateClassroom = async (payload: UpdateClassroomFormData) => {
    try {
      await updateClassroom(payload).unwrap()
      toast.show({ content: 'Classroom updated successfully !' })
    } catch (err) {
      // This toast last longer than regular toast
      toast.show({ error: true, duration: 7000, content: `An error happen while performing the request !` })
    } finally {
      modal.dismiss()
    }
  }

  const handleDeleteClassroom = async (id: string) => {
    try {
      await deleteClassroom(id).unwrap()
      toast.show({ content: 'The classroom was deleted successfully !' })
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
        title: 'Create a new classroom',
        loading: isLoadingCreateClassroom
      },
      <CreateClassroomForm loading={isLoadingCreateClassroom} onSubmit={handleCreateClassroom} />
    )
  }

  const showUpdateModal = (classroom: Classroom) => {
    modal.show(
      {
        title: `Update ${classroom.name}`,
        loading: isLoadingUpdateClassroom
      },
      <UpdateClassroomForm classroom={classroom} loading={isLoadingUpdateClassroom} onSubmit={handleUpdateClassroom} />
    )
  }

  const showViewModal = (classroom: Classroom) => {
    modal.show(
      {
        title: classroom.name
      },
      <>{JSON.stringify(classroom)}</>
    )
  }

  const showDeleteModal = (classroom: Classroom) => {
    modal.show(
      {
        title: `You are about to delete ${classroom.name}.`,
        loading: isLoadingDeleteClassroom,
        primaryAction: {
          content: 'Delete',
          icon: DeleteMinor,
          destructive: true,
          loading: isLoadingDeleteClassroom,
          onAction: () => handleDeleteClassroom(classroom.id)
        },
        secondaryActions: [
          {
            content: 'Cancel',
            onAction: () => modal.dismiss()
          }
        ]
      },
      <Text as="h3">
        Deleting a classroom can sometimes mean, delete every sessions, or assessments related to it. Are you sure you
        want to perform this action ?
      </Text>
    )
  }

  return (
    <Page
      divider
      fullWidth
      title="Classrooms"
      subtitle="On this page you can manage all classrooms, and performing some crud actions on it."
      primaryAction={{ content: 'Add new classroom', onAction: showCreateModal }}
    >
      <Card padding="0">
        <IndexTable
          loading={isLoading}
          emptyState={<EmptyState image="" />}
          itemCount={Number(data?.totalElements)}
          resourceName={{ singular: 'classroom', plural: 'classrooms' }}
          headings={[
            { title: 'Name' },
            { title: 'Description', tooltipContent: 'The classroom description' },
            { title: 'Capacity', alignment: 'center' },
            { title: 'Actions', alignment: 'center' }
          ]}
        >
          {data?.content.map((classroom, index) => (
            <IndexTable.Row id={classroom.id} key={classroom.id} position={index}>
              <IndexTable.Cell>
                <Text as="p">{classroom.name}</Text>
              </IndexTable.Cell>
              <IndexTable.Cell>
                <Text as="p" truncate>
                  {classroom.description}
                </Text>
              </IndexTable.Cell>
              <IndexTable.Cell>
                <Text as="p" alignment="center">
                  {classroom.capacity}
                </Text>
              </IndexTable.Cell>
              <IndexTable.Cell>
                <ButtonGroup noWrap spacing="extraTight" segmented>
                  <Button icon={ViewMinor} size="slim" onClick={() => showViewModal(classroom)} />
                  <Button icon={EditMinor} size="slim" primary onClick={() => showUpdateModal(classroom)} />
                  <Button icon={DeleteMinor} size="slim" destructive onClick={() => showDeleteModal(classroom)} />
                </ButtonGroup>
              </IndexTable.Cell>
            </IndexTable.Row>
          ))}
        </IndexTable>
      </Card>
    </Page>
  )
}

ClassroomsPage.layout = (page) => <ProfileLayout title="Classrooms | Schoolar">{page}</ProfileLayout>

export default ClassroomsPage
