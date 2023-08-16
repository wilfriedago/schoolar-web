import { render, screen } from '@testing-library/react'

import { MainLayout } from '@/layouts'

describe('Main template', () => {
  describe('Render method', () => {
    it('should have 3 menu items', () => {
      render(<MainLayout />)

      const menuItemList = screen.getAllByRole('listitem')

      expect(menuItemList).toHaveLength(4)
    })
  })
})
