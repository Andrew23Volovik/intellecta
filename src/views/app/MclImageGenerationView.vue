<script setup lang="ts">
import MclInputSearch from '@/components/UI/MclInputSearch.vue';
import IconArrowSearch from '@/components/icons/IconArrowSearch.vue';
import MclHeading from '@/components/UI/MclHeading.vue';
import MclLayout from '@/components/MclLayout.vue';
import MclChatLayout from '@/components/UI/MclChatLayout.vue';

import type { THeadingProps } from '@/types/components/MclHeading';
import type { TImageGenerateMessage, TSearchValidations } from '@/types/types';
import type { Ref } from 'vue';
import { defineAsyncComponent, ref } from 'vue';
import { useForm } from 'vee-validate';
import { object, ObjectSchema, string } from 'yup';
import { useAIStore } from '@/stores/artificialIntelligence';
import MclSelect from '@/components/UI/MclSelect.vue';
import MclCard from '@/components/UI/MclCard.vue';
import MclButton from '@/components/UI/MclButton.vue';

const imageHeadingData: THeadingProps = {
  title: 'Image Generation',
  description: 'Turn your prompt into an image.',
  icon: defineAsyncComponent(() => import('@/components/icons/app/ImageIcon.vue')),
};
const resolutionData = ['256x256', '512x512', '1024x1024'];
const countGenImageData = ['1', '2', '3', '4'];

const resolutionSelect: Ref<'256x256' | '512x512' | '1024x1024'> = ref('256x256');
const countGenImage: Ref<'1' | '2' | '3' | '4'> = ref('1');

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
    const userMessage: TImageGenerateMessage = {
      prompt: prompt.value,
      n: parseInt(countGenImage.value, 10),
      size: resolutionSelect.value,
    };

    store.imageChat.push({
      role: 'user',
      content: prompt.value,
    });

    isLoading.value = true;
    prompt.value = '';
    await store.generateImage(userMessage);
    isLoading.value = false;
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
  store.imageChat = [];
};
</script>

<template>
  <section class="flex flex-col">
    <MclLayout>
      <MclHeading
        :title="imageHeadingData.title"
        :description="imageHeadingData.description"
        :icon="imageHeadingData.icon"
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
      <div class="flex justify-center md:justify-start gap-2 lg:gap-4 mt-4">
        <MclSelect
          label="Resolution"
          title="Choose a resolution"
          :items="resolutionData"
          v-model="resolutionSelect"
          class="w-30 md:w-36 lg:w-42 xl:w-64"
        ></MclSelect>
        <MclSelect
          label="Count"
          title="Choose a quantity"
          :items="countGenImageData"
          v-model="countGenImage"
          class="w-30 md:w-36 lg:w-42 xl:w-64"
        ></MclSelect>
      </div>
      <MclChatLayout
        :messages="store.getImageChat"
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
            class="grid grid-cols-4 gap-4"
            v-else
          >
            <template
              v-for="({ url }, idx) in content"
              :key="idx"
            >
              <MclCard
                custom-class="!bg-truegray-3/50 !dark:bg-truegray-7"
                padding="4"
                class="flex flex-col gap-4 items-center"
              >
                <img
                  :src="url"
                  alt="generated_image"
                  class="object-cover rounded-lg w-full"
                />
                <a
                  :href="typeof url === 'string' ? url : ''"
                  target="_blank"
                >
                  <MclButton> Download </MclButton>
                </a>
              </MclCard>
            </template>
          </div>
        </template>
      </MclChatLayout>
    </MclLayout>
  </section>
</template>
