import { Navigation as PolarisNavigation } from '@shopify/polaris'
import { SettingsMajor } from '@shopify/polaris-icons'
import { useRouter } from 'next/router'

import { AppConstants } from '@/shared/constants'

import { AccountGroup, BookEducationOutline, Classroom, EventAvailable, Home, SquareRootBox } from './icons'

export const Navigation = () => {
  const { push, pathname } = useRouter()

  return (
    <PolarisNavigation location={AppConstants.pages.protected.profile}>
      <PolarisNavigation.Section
        title="Menu"
        items={[
          {
            label: 'Home',
            icon: Home,
            selected: pathname === AppConstants.pages.protected.profile,
            onClick: () => {
              push(AppConstants.pages.protected.profile)
            }
          },
          {
            label: 'Events',
            icon: EventAvailable,
            selected: pathname === AppConstants.pages.protected.events,
            onClick: () => {
              push(AppConstants.pages.protected.events)
            }
          },
          {
            label: 'Groups',
            icon: AccountGroup,
            selected: pathname === AppConstants.pages.protected.groups,
            onClick: () => {
              push(AppConstants.pages.protected.groups)
            }
          },
          {
            label: 'Classrooms',
            icon: Classroom,
            selected: pathname === AppConstants.pages.protected.classrooms,
            onClick: () => {
              push(AppConstants.pages.protected.classrooms)
            }
          },
          {
            label: 'Subjects',
            icon: SquareRootBox,
            selected: pathname === AppConstants.pages.protected.subjects,
            onClick: () => {
              push(AppConstants.pages.protected.subjects)
            }
          },
          {
            label: 'Courses',
            icon: BookEducationOutline,
            selected: pathname === AppConstants.pages.protected.courses,
            onClick: () => {
              push(AppConstants.pages.protected.courses)
            }
          }
        ]}
      />
      <PolarisNavigation.Section
        fill
        title="Management"
        items={[
          {
            label: 'Users',
            icon: AccountGroup,
            selected: pathname === AppConstants.pages.protected.users,
            onClick: () => {
              push(AppConstants.pages.protected.users)
            }
          }
        ]}
      />
      <PolarisNavigation.Section
        items={[
          {
            icon: SettingsMajor,
            label: 'Settings',
            onClick: () => {
              push(AppConstants.pages.protected.settings)
            }
          }
        ]}
      />
    </PolarisNavigation>
  )
}
