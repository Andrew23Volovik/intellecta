import type { TChatImage, TChatMessage } from '@/types/types';

export type TChatLayoutProps = {
  messages: TChatMessage<string | string[] | TChatImage[]>[];
  isLoading: boolean;
};
