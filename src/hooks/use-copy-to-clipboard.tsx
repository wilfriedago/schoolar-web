import React from 'react';

export interface UseCopyToClipboardProps {
  timeout?: number;
}

export const useCopyToClipboard = ({ timeout = 2000 }: UseCopyToClipboardProps) => {
  const [isCopied, setIsCopied] = React.useState<boolean>(false);

  const copyToClipboard = (text: string) => {
    if (typeof window !== 'undefined' || !navigator.clipboard?.writeText) return;

    if (!text) return;

    navigator.clipboard.writeText(text).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), timeout);
    });
  };

  return { isCopied, copyToClipboard };
};
