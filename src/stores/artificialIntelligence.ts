import type {
  TAIStoreState,
  TAIStoreGetters,
  TAIStoreActions,
  TChatMessage,
  TImageGenerateMessage,
  TChatImage,
  TChatMusic,
} from '@/types/types';
import type { StoreDefinition } from 'pinia';
import { defineStore } from 'pinia';
import { isBaseError } from '@/types/types';

export const useAIStore: StoreDefinition<'AI', TAIStoreState, TAIStoreGetters, TAIStoreActions> = defineStore('AI', {
  state(): TAIStoreState {
    return {
      conversationChat: [],
      imageChat: [],
      videoChat: [],
      musicChat: [],
      codeChat: [],
      init: false,
    };
  },
  getters: {
    getConversationChat: (state: TAIStoreState): TChatMessage<string>[] => state.conversationChat,
    getImageChat: (state: TAIStoreState): TChatMessage<TChatImage[] | string>[] => state.imageChat,
    getVideoChat: (state: TAIStoreState): TChatMessage<string[] | string>[] => state.videoChat,
    getMusicChat: (state: TAIStoreState): TChatMessage<TChatMusic | string>[] => state.musicChat,
    getCodeChat: (state: TAIStoreState): TChatMessage<string>[] => state.codeChat,
  },
  actions: {
    async generateConversation(message: TChatMessage<string>): Promise<Error | undefined> {
      try {
        const response = await fetch('http://localhost:3000/api/conversation', {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify({
            prompt: message.content,
          }),
        });

        if (response.headers.get('content-type')?.includes('application/json')) {
          const data = await response.json();
          if (isBaseError(data)) {
            return new Error(data.error);
          }
        }

        this.conversationChat.push({
          role: 'assistant',
          content: '',
        });

        const reader = response.body?.pipeThrough(new TextDecoderStream()).getReader();
        if (!reader) return;
        let loop: boolean = true;
        while (loop) {
          const { value, done } = await reader.read();
          if (done) {
            loop = false;
            break;
          }
          const currObj = this.conversationChat[this.conversationChat.length - 1];
          currObj.content += value;
        }
      } catch (e) {
        console.log(e);
      }
    },
    async generateImage(message: TImageGenerateMessage): Promise<Error | undefined> {
      try {
        const response = await fetch('http://localhost:3000/api/images', {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify({
            prompt: message,
          }),
        });

        const data = await response.json();
        if (isBaseError(data)) {
          return new Error(data.error);
        }

        this.imageChat.push(data as TChatMessage<TChatImage[]>);
      } catch (e) {
        console.log(e);
      }
    },
    async generateVideo(message: TChatMessage<string>): Promise<Error | undefined> {
      try {
        const response = await fetch('http://localhost:3000/api/video', {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify({
            prompt: message.content,
          }),
        });

        const data = await response.json();
        if (isBaseError(data)) {
          return new Error(data.error);
        }

        this.videoChat.push(data as TChatMessage<string[]>);
      } catch (e) {
        console.log(e);
      }
    },
    async generateMusic(message: TChatMessage<string>): Promise<Error | undefined> {
      try {
        const response = await fetch('http://localhost:3000/api/music', {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify({
            prompt: message.content,
          }),
        });

        const data = await response.json();
        if (isBaseError(data)) {
          return new Error(data.error);
        }

        this.musicChat.push(data as TChatMessage<TChatMusic>);
      } catch (e) {
        console.log(e);
      }
    },
    async generateCode(message: TChatMessage<string>): Promise<Error | undefined> {
      try {
        const response = await fetch('http://localhost:3000/api/code', {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify({
            prompt: message.content,
          }),
        });

        if (response.headers.get('content-type')?.includes('application/json')) {
          const data = await response.json();
          if (isBaseError(data)) {
            return new Error(data.error);
          }
        }

        this.codeChat.push({
          role: 'assistant',
          content: '',
        });

        const reader = response.body?.pipeThrough(new TextDecoderStream()).getReader();
        if (!reader) return;
        let loop: boolean = true;
        while (loop) {
          const { value, done } = await reader.read();
          if (done) {
            loop = false;
            break;
          }
          const currObj = this.codeChat[this.codeChat.length - 1];
          currObj.content += value;
        }
      } catch (e) {
        console.log(e);
      }
    },
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'conversationChat',
        paths: ['conversationChat'],
      },
      {
        key: 'imageChat',
        paths: ['imageChat'],
      },
      {
        key: 'videoChat',
        paths: ['videoChat'],
      },
      {
        key: 'musicChat',
        paths: ['musicChat'],
      },
      {
        key: 'codeChat',
        paths: ['codeChat'],
      },
    ],
  },
});