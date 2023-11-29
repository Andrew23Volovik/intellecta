import type { TChatImage, TChatMessage, TChatMusic } from '@/types/types';

export type TChatLayoutProps = {
  messages: TChatMessage<string | string[] | TChatImage[] | TChatMusic>[];
  isLoading: boolean;
};
