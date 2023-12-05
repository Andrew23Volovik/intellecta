<script setup lang="ts">
import MclInputSearch from '@/components/UI/MclInputSearch.vue';
import IconArrowSearch from '@/components/icons/IconArrowSearch.vue';
import MclHeading from '@/components/UI/MclHeading.vue';
import MclLayout from '@/components/MclLayout.vue';
import MclChatLayout from '@/components/UI/MclChatLayout.vue';

import type { THeadingProps } from '@/types/components/MclHeading';
import type { TChatMessage, TChatMusic, TSearchValidations } from '@/types/types';
import type { Ref } from 'vue';

import { defineAsyncComponent, ref } from 'vue';
import { useForm } from 'vee-validate';
import { object, ObjectSchema, string } from 'yup';
import { useAIStore } from '@/stores/artificialIntelligence';
import { BaseError, isBaseError } from '@/server/types';
import { useModal } from '@/stores/modal';

const musicHeadingData: THeadingProps = {
  title: 'Music Generation',
  description: 'Turn your prompt into music.',
  icon: defineAsyncComponent(() => import('@/components/icons/app/MusicIcon.vue')),
};

const prompt: Ref<string> = ref('');
const schema: ObjectSchema<TSearchValidations> = object({
  prompt: string().required('Please enter valid prompt. It must not be empty'),
});
const { defineComponentBinds, handleSubmit, errors, setErrors } = useForm({
  validationSchema: schema,
});
const promptValidation = defineComponentBinds('prompt');

const store = useAIStore();
const modalStore = useModal();
const isLoading = ref(false);
const onSuccess = async () => {
  try {
    const userMessage: TChatMessage<string> = {
      role: 'user',
      content: prompt.value,
    };

    store.musicChat.push({
      role: 'user',
      content: prompt.value,
    });

    isLoading.value = true;
    prompt.value = '';
    const data = await store.generateMusic(userMessage);
    isLoading.value = false;

    if (isBaseError(data)) throw new BaseError(data.statusCode, data.message);
  } catch (e) {
    if (e instanceof BaseError) {
      if (e.statusCode === 403) modalStore.onOpen();
      setErrors({
        prompt: e.message,
      });
    }
  }
};
const onInvalid = () => {
  console.log('invalid');
};

const onSubmit = handleSubmit(onSuccess, onInvalid);

const clearStore = () => {
  store.musicChat = [];
};

function isArrayChatMusic(obj: unknown): obj is TChatMusic {
  if (typeof obj === 'object' && obj !== null) {
    return 'audio' in obj && 'spectrogram' in obj;
  }
  return false;
}
</script>

<template>
  <section class="flex flex-col">
    <MclLayout>
      <MclHeading
        :title="musicHeadingData.title"
        :description="musicHeadingData.description"
        :icon="musicHeadingData.icon"
      />
      <MclInputSearch
        @submit.capture.prevent="onSubmit"
        v-bind="promptValidation"
        v-model="prompt"
        :error="errors.prompt"
      >
        <template #default>
          <IconArrowSearch class="w-6 h-6" />
        </template>
      </MclInputSearch>
      <MclChatLayout
        :messages="store.getMusicChat"
        :is-loading="isLoading"
        @clear-chat="clearStore"
      >
        <template #default="{ content }">
          <div
            v-if="typeof content === 'string'"
            class="markdown max-w-none grid text-sm lg:text-base dark:text-light-6 text-truegray-6 text-justify"
            v-html="$mdRender.render(content)"
          />
          <div
            v-else-if="isArrayChatMusic(content)"
            class="flex flex-col gap-4"
          >
            <img
              :src="content.spectrogram"
              alt="spectrogram"
              class="w-full object-contain h-96 rounded-lg"
            />
            <audio
              controls
              class="w-full"
            >
              <source :src="content.audio" />
            </audio>
          </div>
        </template>
      </MclChatLayout>
    </MclLayout>
  </section>
</template>
