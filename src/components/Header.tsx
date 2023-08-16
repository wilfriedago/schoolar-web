import { TopBar } from '@shopify/polaris'
import { LogOutMinor } from '@shopify/polaris-icons'
import { useCallback, useState } from 'react'

export type HeaderProps = {
  onNavigationToggle: () => void
}

export const Header = (props: HeaderProps) => {
  const [searchActive, setSearchActive] = useState(false)
  const [searchValue, setSearchValue] = useState('')

  const handleSearchResultsDismiss = useCallback(() => {
    setSearchActive(false)
    setSearchValue('')
  }, [])

  const handleSearchFieldChange = useCallback((value: string) => {
    setSearchValue(value)
    setSearchActive(value.length > 0)
  }, [])

  const [userMenuActive, setUserMenuActive] = useState(false)

  const toggleUserMenuActive = useCallback(() => setUserMenuActive((val) => !val), [])

  return (
    <TopBar
      key="header"
      showNavigationToggle
      searchResultsOverlayVisible
      userMenu={
        <TopBar.UserMenu
          name="Wilfried AGO"
          initials="WA"
          detail="Administrator"
          open={userMenuActive}
          onToggle={toggleUserMenuActive}
          actions={[
            {
              items: [{ content: 'Logout', icon: LogOutMinor, accessibilityLabel: 'Log out' }]
            }
          ]}
          accessibilityLabel="User menu"
        />
      }
      searchField={
        <TopBar.SearchField
          showFocusBorder
          value={searchValue}
          active={searchActive}
          onChange={handleSearchFieldChange}
          placeholder="Search for anything"
        />
      }
      searchResultsVisible={searchActive}
      onSearchResultsDismiss={handleSearchResultsDismiss}
      onNavigationToggle={props.onNavigationToggle}
    />
  )
}
