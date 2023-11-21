import type { OpenAIStoreState, OpenAIStoreGetters, OpenAIStoreActions, TChatMessage } from '@/types/types';
import type { StoreDefinition } from 'pinia';
import { defineStore } from 'pinia';
import { openAI } from '@/lib/open.ai';

const baseInstruction: TChatMessage = {
  role: 'system',
  content: 'You must answer only in markdown.',
};

export const useOpenAIStore: StoreDefinition<'openAI', OpenAIStoreState, OpenAIStoreGetters, OpenAIStoreActions> =
  defineStore('openAI', {
    state(): OpenAIStoreState {
      return {
        conversationChat: [],
        init: false,
      };
    },
    getters: {
      getOpenAIConversationChat: (state: OpenAIStoreState): TChatMessage[] => state.conversationChat,
    },
    actions: {
      async openAIConversation(message: TChatMessage): Promise<void> {
        try {
          const completion = await openAI.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [baseInstruction, message],
            stream: true,
          });

          this.conversationChat.push({
            role: 'assistant',
            content: '',
          });

          for await (const chunk of completion) {
            const currObj: TChatMessage = this.conversationChat[this.conversationChat.length - 1];
            currObj.content = currObj.content + chunk.choices[0].delta.content;
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
      ],
    },
  });
