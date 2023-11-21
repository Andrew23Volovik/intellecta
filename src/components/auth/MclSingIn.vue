<script setup lang="ts">
import IconEmail from '@/components/icons/IconEmail.vue';
import IconGitHub from '@/components/icons/IconGitHub.vue';
import MclInput from '@/components/UI/MclInput.vue';
import MclButton from '@/components/UI/MclButton.vue';
import IconGoogle from '@/components/icons/IconGoogle.vue';
import MclDivider from '@/components/UI/MclDivider.vue';
import type { Ref } from 'vue';
import type { TFormFieldValidations } from '@/types/types';
import { ref } from 'vue';
import { object, ObjectSchema, string } from 'yup';
import { useForm } from 'vee-validate';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';

const email: Ref<string> = ref('');
const password: Ref<string> = ref('');

const schema: ObjectSchema<Omit<TFormFieldValidations, 'lastName' | 'firstName'>> = object({
  email: string().email('Email must be a valid').required(),
  password: string().min(6, 'Password must be at least 6 characters').required(),
});

const { defineComponentBinds, handleSubmit, errors, setErrors } = useForm({
  validationSchema: schema,
});

const emailValidation = defineComponentBinds('email');
const passwordValidation = defineComponentBinds('password');

const { supabaseUserSingIn, supabaseUserSingInWithOAuth } = useAuthStore();
const router = useRouter();
const singUpWithGitHubOrGoogle = async (typeAuth: 'github' | 'google') => {
  try {
    const error = await supabaseUserSingInWithOAuth(typeAuth);
    if (error) {
      throw new Error(error.message);
    }
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
};

const onSuccess = async () => {
  console.log('success');
  const authUserData = {
    email: email.value,
    password: password.value,
  };

  try {
    const error = await supabaseUserSingIn(authUserData);
    if (error) {
      throw new Error(error.message);
    }
    await router.push({ name: 'Dashboard' });
  } catch (error) {
    if (error instanceof Error) {
      setErrors({
        email: error.message,
        password: error.message,
      });
      console.log(error.message);
    }
  }
};

const onInvalidSubmit = () => {
  console.log('invalid');
};

const onSubmit = handleSubmit(onSuccess, onInvalidSubmit);
</script>

<template>
  <form
    class="flex flex-col gap-5 my-2"
    id="form-sing-up"
    @submit.prevent="onSubmit"
  >
    <MclButton @click="singUpWithGitHubOrGoogle('github')">
      <template #icon-left>
        <IconGitHub class="h-5 w-5 mr-2" />
      </template>
      Continue with GitHub
    </MclButton>
    <MclButton @click="singUpWithGitHubOrGoogle('google')">
      <template #icon-left>
        <IconGoogle class="h-5 w-5 mr-2" />
      </template>
      Continue with Google
    </MclButton>
    <MclDivider class="mt-4"> or </MclDivider>
    <MclInput
      type="email"
      label="Email address"
      placeholder="intellecta@gmail.com"
      v-bind="emailValidation"
      v-model="email"
      :error="errors.email"
    >
      <template #leftIcon>
        <IconEmail class="text-truegray-5 w-5 h-5" />
      </template>
    </MclInput>
    <MclInput
      type="password"
      label="Enter password"
      placeholder="•••••••••"
      v-bind="passwordValidation"
      v-model="password"
      :error="errors.password"
    />
    <MclButton
      class="mb-2"
      form="form-sing-up"
      type="submit"
    >
      Sing In
    </MclButton>
  </form>
</template>

<style scoped></style>
