import type { StoreDefinition } from 'pinia';
import type { TModalState, TModalGetters, TModalActions } from '@/types/types';
import { defineStore } from 'pinia';

export const useModal: StoreDefinition<'modal', TModalState, TModalGetters, TModalActions> = defineStore('modal', {
  state(): TModalState {
    return {
      isOpen: false,
    };
  },
  actions: {
    onClose(): void {
      this.isOpen = false;
    },
    onOpen(): void {
      this.isOpen = true;
    },
  },
});
