<script setup lang="ts">
import MclInputSearch from '@/components/UI/MclInputSearch.vue';
import IconArrowSearch from '@/components/icons/IconArrowSearch.vue';
import MclHeading from '@/components/UI/MclHeading.vue';
import MclLayout from '@/components/MclLayout.vue';
import MclChatLayout from '@/components/UI/MclChatLayout.vue';
import type { THeadingProps } from '@/types/components/MclHeading';
import type { TChatMessage, TSearchValidations } from '@/types/types';
import type { Ref } from 'vue';
import { defineAsyncComponent, ref } from 'vue';
import { useForm } from 'vee-validate';
import { object, ObjectSchema, string } from 'yup';
import { useAIStore } from '@/stores/artificialIntelligence';

const videoHeadingData: THeadingProps = {
  title: 'Video Generation',
  description: 'Turn your prompt into an video.',
  icon: defineAsyncComponent(() => import('@/components/icons/app/VideoIcon.vue')),
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
const isLoading = ref(false);
const onSuccess = async () => {
  try {
    const userMessage: TChatMessage<string> = {
      role: 'user',
      content: prompt.value,
    };

    store.videoChat.push({
      role: 'user',
      content: prompt.value,
    });

    isLoading.value = true;
    prompt.value = '';
    const data = await store.generateVideo(userMessage);
    isLoading.value = false;

    if (data instanceof Error) {
      throw new Error(data.message);
    }
  } catch (e) {
    if (e instanceof Error) {
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
  store.videoChat = [];
};

function isStringArray(x: unknown): x is string[] {
  if (Array.isArray(x)) {
    return x.every((i) => typeof i === 'string');
  }
  return false;
}
</script>

<template>
  <section class="flex flex-col">
    <MclLayout>
      <MclHeading
        :title="videoHeadingData.title"
        :description="videoHeadingData.description"
        :icon="videoHeadingData.icon"
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
        :messages="store.getVideoChat"
        :is-loading="isLoading"
        @clear-chat="clearStore"
      >
        <template #default="{ content }">
          <div
            v-if="typeof content === 'string'"
            class="markdown max-w-none grid text-sm lg:text-base dark:text-light-6 text-truegray-6 text-justify"
            v-html="$mdRender.render(content)"
          />
          <video
            v-else-if="isStringArray(content)"
            controls
            class="w-full aspect-video"
          >
            <source :src="content[0]" />
          </video>
        </template>
      </MclChatLayout>
    </MclLayout>
  </section>
</template>
