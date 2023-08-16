import { HorizontalStack, Text } from '@shopify/polaris';

type Props = {
  label?: string;
  height?: string;
  width?: string;
  showBorder?: boolean;
};

export const Placeholder = ({ label = '', height = 'auto', width = 'auto', showBorder = false }: Props) => {
  return (
    <div
      style={{
        display: 'inherit',
        background: 'var(--p-color-text-info)',
        height: height ?? undefined,
        width: width ?? undefined,
        borderInlineStart: showBorder ? '1px dashed var(--p-color-bg-success-subdued)' : 'none'
      }}
    >
      <HorizontalStack gap="4" align="center" blockAlign="center">
        <div
          style={{
            color: 'var(--p-color-text-on-color)',
            width: width ?? undefined
          }}
        >
          <Text as="h2" variant="bodyMd" fontWeight="medium" alignment="center">
            {label}
          </Text>
        </div>
      </HorizontalStack>
    </div>
  );
};
