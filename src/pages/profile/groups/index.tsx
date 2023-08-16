import { Button, ButtonGroup, Card, EmptyState, IndexTable, Page, Text } from '@shopify/polaris'
import { DeleteMinor, EditMinor, ViewMinor } from '@shopify/polaris-icons'

import {
  CreateGroupForm,
  type CreateGroupFormData,
  type Group,
  UpdateGroupForm,
  type UpdateGroupFormData,
  useCreateGroupMutation,
  useDeleteGroupMutation,
  useGetGroupsQuery,
  useUpdateGroupMutation
} from '@/features/groups'
import { useModal, useToast } from '@/hooks'
import { ProfileLayout } from '@/layouts/ProfileLayout'
import { type NextPageWithLayout } from '@/shared/types'

const GroupsPage: NextPageWithLayout = () => {
  const { data, isLoading } = useGetGroupsQuery()
  const [createGroup, { isLoading: isLoadingCreateGroup }] = useCreateGroupMutation()
  const [updateGroup, { isLoading: isLoadingUpdateGroup }] = useUpdateGroupMutation()
  const [deleteGroup, { isLoading: isLoadingDeleteGroup }] = useDeleteGroupMutation()

  const modal = useModal()
  const toast = useToast()

  const handleCreateGroup = async (payload: CreateGroupFormData) => {
    try {
      await createGroup(payload).unwrap()
      toast.show({ content: 'New group created successfully !' })
    } catch (err) {
      // This toast last longer than regular toast
      toast.show({ error: true, duration: 7000, content: `An error happen while performing the request !` })
    } finally {
      modal.dismiss()
    }
  }

  const handleUpdateGroup = async (payload: UpdateGroupFormData) => {
    try {
      await updateGroup(payload).unwrap()
      toast.show({ content: 'Group updated successfully !' })
    } catch (err) {
      // This toast last longer than regular toast
      toast.show({ error: true, duration: 7000, content: `An error happen while performing the request !` })
    } finally {
      modal.dismiss()
    }
  }

  const handleDeleteGroup = async (id: string) => {
    try {
      await deleteGroup(id).unwrap()
      toast.show({ content: 'The group was deleted successfully !' })
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
        title: 'Create a new group',
        loading: isLoadingCreateGroup
      },
      <CreateGroupForm loading={isLoadingCreateGroup} onSubmit={handleCreateGroup} />
    )
  }

  const showUpdateModal = (group: Group) => {
    modal.show(
      {
        title: `Update ${group.name}`,
        loading: isLoadingUpdateGroup
      },
      <UpdateGroupForm group={group} loading={isLoadingUpdateGroup} onSubmit={handleUpdateGroup} />
    )
  }

  const showViewModal = (group: Group) => {
    modal.show(
      {
        title: group.name
      },
      <>{JSON.stringify(group)}</>
    )
  }

  const showDeleteModal = (group: Group) => {
    modal.show(
      {
        title: `You are about to delete ${group.name}.`,
        loading: isLoadingDeleteGroup,
        primaryAction: {
          content: 'Delete',
          icon: DeleteMinor,
          destructive: true,
          loading: isLoadingDeleteGroup,
          onAction: () => handleDeleteGroup(group.id)
        },
        secondaryActions: [
          {
            content: 'Cancel',
            onAction: () => modal.dismiss()
          }
        ]
      },
      <Text as="h3">
        Deleting a group can sometimes mean, delete every courses, or assessments related to it. Are you sure you want
        to perform this action ?
      </Text>
    )
  }

  return (
    <Page
      divider
      fullWidth
      title="Groups"
      subtitle="On this page you can manage all groups, and performing some crud actions on it."
      primaryAction={{ content: 'Add new group', onAction: showCreateModal }}
    >
      <Card padding="0">
        <IndexTable
          loading={isLoading}
          emptyState={<EmptyState image="" />}
          itemCount={Number(data?.totalElements)}
          resourceName={{ singular: 'group', plural: 'groups' }}
          headings={[
            { title: 'Name' },
            { title: 'Description', tooltipContent: 'The group description' },
            { title: 'Students', alignment: 'center' },
            { title: 'Courses', alignment: 'center' },
            { title: 'Actions', alignment: 'center' }
          ]}
        >
          {data?.content.map((group, index) => (
            <IndexTable.Row id={group.id} key={group.id} position={index}>
              <IndexTable.Cell>
                <Text as="p">{group.name}</Text>
              </IndexTable.Cell>
              <IndexTable.Cell>
                <Text as="p" truncate>
                  {group.description}
                </Text>
              </IndexTable.Cell>
              <IndexTable.Cell>
                <Text as="p" alignment="center">
                  {group.students.length}
                </Text>
              </IndexTable.Cell>
              <IndexTable.Cell>
                <Text as="p" alignment="center">
                  {group.courses.length}
                </Text>
              </IndexTable.Cell>
              <IndexTable.Cell>
                <ButtonGroup noWrap spacing="extraTight" segmented>
                  <Button icon={ViewMinor} size="slim" onClick={() => showViewModal(group)} />
                  <Button icon={EditMinor} size="slim" primary onClick={() => showUpdateModal(group)} />
                  <Button icon={DeleteMinor} size="slim" destructive onClick={() => showDeleteModal(group)} />
                </ButtonGroup>
              </IndexTable.Cell>
            </IndexTable.Row>
          ))}
        </IndexTable>
      </Card>
    </Page>
  )
}

GroupsPage.layout = (page) => <ProfileLayout title="Groups | Schoolar">{page}</ProfileLayout>

export default GroupsPage
