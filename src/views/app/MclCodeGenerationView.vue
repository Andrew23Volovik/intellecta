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
import { useModal } from '@/stores/modal';
import { BaseError, isBaseError } from '@/types/types';

const codeHeadingData: THeadingProps = {
  title: 'Code Generation',
  description: 'Generate code using descriptive text.',
  icon: defineAsyncComponent(() => import('@/components/icons/app/CodeIcon.vue')),
};

const prompt: Ref<string> = ref('');
const schema: ObjectSchema<TSearchValidations> = object({
  prompt: string().required('Please enter valid prompt. It must not be empty'),
});
const { defineComponentBinds, handleSubmit, errors, setErrors } = useForm({
  validationSchema: schema,
});
const searchValidation = defineComponentBinds('prompt');

const store = useAIStore();
const modalStore = useModal();
const isLoading = ref(false);
const onSuccess = async () => {
  try {
    const userMessage: TChatMessage<string> = {
      role: 'user',
      content: prompt.value,
    };

    store.codeChat.push(userMessage);
    isLoading.value = true;
    prompt.value = '';
    const data = await store.generateCode(userMessage);
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
  store.codeChat = [];
};
</script>

<template>
  <section class="flex flex-col">
    <MclLayout>
      <MclHeading
        :title="codeHeadingData.title"
        :description="codeHeadingData.description"
        :icon="codeHeadingData.icon"
      />
      <MclInputSearch
        @submit.capture.prevent="onSubmit"
        v-bind="searchValidation"
        v-model="prompt"
        :error="errors.prompt"
      >
        <template #default>
          <IconArrowSearch class="w-6 h-6" />
        </template>
      </MclInputSearch>
      <MclChatLayout
        :messages="store.getCodeChat"
        :is-loading="isLoading"
        @clear-chat="clearStore"
      >
        <template #default="{ content }">
          <div
            v-if="content"
            class="markdown max-w-none grid text-sm lg:text-base dark:text-light-6 text-truegray-6 text-justify"
            v-html="$mdRender.render(typeof content === 'string' ? content : '')"
          />
        </template>
      </MclChatLayout>
    </MclLayout>
  </section>
</template>
