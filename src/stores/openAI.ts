import type {
  AIStoreState,
  AIStoreGetters,
  AIStoreActions,
  TChatMessage,
  TImageGenerateMessage,
  TChatImage,
} from '@/types/types';
import type { StoreDefinition } from 'pinia';
import { defineStore } from 'pinia';
import { openAI } from '@/lib/open.ai';
import fetch from 'cross-fetch';
import { isBaseError } from '@/types/types';

const baseConversationInstruction: TChatMessage<string> = {
  role: 'system',
  content: 'You must answer only in markdown.',
};

export const useOpenAIStore: StoreDefinition<'AI', AIStoreState, AIStoreGetters, AIStoreActions> = defineStore('AI', {
  state(): AIStoreState {
    return {
      conversationChat: [],
      imageChat: [],
      videoChat: [],
      init: false,
    };
  },
  getters: {
    getConversationChat: (state: AIStoreState): TChatMessage<string>[] => state.conversationChat,
    getImageChat: (state: AIStoreState): TChatMessage<TChatImage[] | string>[] => state.imageChat,
    getVideoChat: (state: AIStoreState) => state.videoChat,
  },
  actions: {
    async generateConversation(message: TChatMessage<string>): Promise<void> {
      try {
        const completion = await openAI.chat.completions.create({
          model: 'gpt-3.5-turbo',
          messages: [baseConversationInstruction, message],
          stream: true,
        });

        this.conversationChat.push({
          role: 'assistant',
          content: '',
        });

        for await (const chunk of completion) {
          const currObj: TChatMessage<string> = this.conversationChat[this.conversationChat.length - 1];
          currObj.content = currObj.content + chunk.choices[0].delta.content;
        }
      } catch (e) {
        console.log(e);
      }
    },
    async generateImage(message: TImageGenerateMessage): Promise<void> {
      try {
        const { data } = await openAI.images.generate({ ...message });
        this.imageChat.push({
          role: 'assistant',
          content: data,
        });
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
    ],
  },
});
