import { AppProvider as PolarisAppProvider } from '@shopify/polaris'
import enTranslations from '@shopify/polaris/locales/en.json'
import type { PropsWithChildren } from 'react'

export const AppProvider = ({ children }: PropsWithChildren) => {
  return <PolarisAppProvider i18n={enTranslations}>{children}</PolarisAppProvider>
}
