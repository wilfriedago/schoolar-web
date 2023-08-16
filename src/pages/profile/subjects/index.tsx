import { Button, ButtonGroup, Card, EmptyState, IndexTable, Page, Text } from '@shopify/polaris'
import { DeleteMinor, EditMinor, ViewMinor } from '@shopify/polaris-icons'

import {
  CreateSubjectForm,
  type CreateSubjectFormData,
  type Subject,
  UpdateSubjectForm,
  type UpdateSubjectFormData,
  useCreateSubjectMutation,
  useDeleteSubjectMutation,
  useGetSubjectsQuery,
  useUpdateSubjectMutation
} from '@/features/subjects'
import { useModal, useToast } from '@/hooks'
import { ProfileLayout } from '@/layouts/ProfileLayout'
import { type NextPageWithLayout } from '@/shared/types'

const SubjectsPage: NextPageWithLayout = () => {
  const { data, isLoading } = useGetSubjectsQuery()
  const [createSubject, { isLoading: isLoadingCreateSubject }] = useCreateSubjectMutation()
  const [updateSubject, { isLoading: isLoadingUpdateSubject }] = useUpdateSubjectMutation()
  const [deleteSubject, { isLoading: isLoadingDeleteSubject }] = useDeleteSubjectMutation()

  const modal = useModal()
  const toast = useToast()

  const handleCreateSubject = async (payload: CreateSubjectFormData) => {
    try {
      await createSubject(payload).unwrap()
      toast.show({ content: 'New subject created successfully !' })
    } catch (err) {
      // This toast last longer than regular toast
      toast.show({ error: true, duration: 7000, content: `An error happen while performing the request !` })
    } finally {
      modal.dismiss()
    }
  }

  const handleUpdateSubject = async (payload: UpdateSubjectFormData) => {
    try {
      await updateSubject(payload).unwrap()
      toast.show({ content: 'Subject updated successfully !' })
    } catch (err) {
      // This toast last longer than regular toast
      toast.show({ error: true, duration: 7000, content: `An error happen while performing the request !` })
    } finally {
      modal.dismiss()
    }
  }

  const handleDeleteSubject = async (id: string) => {
    try {
      await deleteSubject(id).unwrap()
      toast.show({ content: 'The subject was deleted successfully !' })
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
        title: 'Create a new subject',
        loading: isLoadingCreateSubject
      },
      <CreateSubjectForm loading={isLoadingCreateSubject} onSubmit={handleCreateSubject} />
    )
  }

  const showUpdateModal = (subject: Subject) => {
    modal.show(
      {
        title: `Update ${subject.name}`,
        loading: isLoadingUpdateSubject
      },
      <UpdateSubjectForm subject={subject} loading={isLoadingUpdateSubject} onSubmit={handleUpdateSubject} />
    )
  }

  const showViewModal = (subject: Subject) => {
    modal.show(
      {
        title: subject.name
      },
      <>{JSON.stringify(subject)}</>
    )
  }

  const showDeleteModal = (subject: Subject) => {
    modal.show(
      {
        title: `You are about to delete ${subject.name}.`,
        loading: isLoadingDeleteSubject,
        primaryAction: {
          content: 'Delete',
          icon: DeleteMinor,
          destructive: true,
          loading: isLoadingDeleteSubject,
          onAction: () => handleDeleteSubject(subject.id)
        },
        secondaryActions: [
          {
            content: 'Cancel',
            onAction: () => modal.dismiss()
          }
        ]
      },
      <Text as="h3">
        Deleting a subject can sometimes mean, delete every courses, or assessments related to it. Are you sure you want
        to perform this action ?
      </Text>
    )
  }

  return (
    <Page
      divider
      fullWidth
      title="Subjects"
      subtitle="On this page you can manage all subjects, and performing some crud actions on it."
      primaryAction={{ content: 'Add new subject', onAction: showCreateModal }}
    >
      <Card padding="0">
        <IndexTable
          loading={isLoading}
          emptyState={<EmptyState image="" />}
          itemCount={Number(data?.totalElements)}
          resourceName={{ singular: 'subject', plural: 'subjects' }}
          headings={[
            { title: 'Name' },
            { title: 'Description', tooltipContent: 'The subject description' },
            { title: 'Courses', alignment: 'center' },
            { title: 'Actions', alignment: 'center' }
          ]}
        >
          {data?.content.map((subject, index) => (
            <IndexTable.Row id={subject.id} key={subject.id} position={index}>
              <IndexTable.Cell>
                <Text as="p">{subject.name}</Text>
              </IndexTable.Cell>
              <IndexTable.Cell>
                <Text as="p" truncate>
                  {subject.description}
                </Text>
              </IndexTable.Cell>
              <IndexTable.Cell>
                <Text as="p" alignment="center">
                  {subject.courses.length}
                </Text>
              </IndexTable.Cell>
              <IndexTable.Cell>
                <ButtonGroup noWrap spacing="extraTight" segmented>
                  <Button icon={ViewMinor} size="slim" onClick={() => showViewModal(subject)} />
                  <Button icon={EditMinor} size="slim" primary onClick={() => showUpdateModal(subject)} />
                  <Button icon={DeleteMinor} size="slim" destructive onClick={() => showDeleteModal(subject)} />
                </ButtonGroup>
              </IndexTable.Cell>
            </IndexTable.Row>
          ))}
        </IndexTable>
      </Card>
    </Page>
  )
}

SubjectsPage.layout = (page) => <ProfileLayout title="Subjects | Schoolar">{page}</ProfileLayout>

export default SubjectsPage
