import type { TChatMessage } from '@/types/types';

export type TChatLayoutProps = {
  messages: TChatMessage[];
  isLoading: boolean;
};
