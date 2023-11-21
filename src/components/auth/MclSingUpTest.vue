<script setup lang="ts">
import IconGitHub from '@/components/icons/IconGitHub.vue';
import MclButton from '@/components/UI/MclButton.vue';
import IconGoogle from '@/components/icons/IconGoogle.vue';
import MclDivider from '@/components/UI/MclDivider.vue';
import IconEmail from '@/components/icons/IconEmail.vue';
import MclInput from '@/components/UI/MclInput.vue';
import type { Ref } from 'vue';
import { ref } from 'vue';
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { supabase } from '@/lib/supabase';

const singMethod: Ref<'SingUp' | 'SingIn'> = ref('SingIn');
const email: Ref<string> = ref('');
const password: Ref<string> = ref('');

const schema = yup.object({
  email: yup.string().email('Email must be a valid').required(),
  password: yup.string().min(6, 'Password must be at least 6 characters').required(),
});

const { defineComponentBinds, handleSubmit, errors, setErrors } = useForm({
  validationSchema: schema,
});

const emailValidation = defineComponentBinds('email');
const passwordValidation = defineComponentBinds('password');

const router = useRouter();
const { supabaseUserSingUp, supabaseUserSingIn } = useAuthStore();
const onSuccess = async () => {
  const payloadData = {
    email: email.value,
    password: password.value,
  };

  try {
    if (singMethod.value === 'SingUp') {
      const error = await supabaseUserSingUp(payloadData);
      if (error) {
        throw new Error(error.message);
      }

      singMethod.value = 'SingIn';
    }

    if (singMethod.value === 'SingIn') {
      const error = await supabaseUserSingIn(payloadData);
      if (error) {
        throw new Error(error.message);
      }

      await router.push({ name: 'Dashboard' });
    }
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
const onInvalidSubmit = ({ errors }: any) => {
  console.log('error', errors);
};

const onSubmit = handleSubmit(onSuccess, onInvalidSubmit);

const authWithGithub = async () => {
  try {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: 'http://localhost:5173/app/dashboard',
      },
    });
    if (error) throw new Error(error.message);
  } catch (e) {
    if (e instanceof Error) {
      console.log(e.message);
    }
  }
};

const authWithGoogle = async () => {
  try {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: 'http://localhost:5173/app/dashboard',
      },
    });
    if (error) throw new Error(error.message);
  } catch (e) {
    if (e instanceof Error) {
      console.log(e.message);
    }
  }
};

const test = () => {
  supabase.auth.signOut();
};
</script>

<template>
  <form
    class="flex flex-col gap-6 mb-2"
    id="form-sing-up"
    @submit.prevent="onSubmit"
  >
    <div>
      <MclButton
        class="mb-4"
        @click="authWithGithub"
      >
        <template #icon-left>
          <IconGitHub class="h-5 w-5 mr-2" />
        </template>
        Continue with GitHub
      </MclButton>
      <MclButton
        class="mb-4"
        @click="authWithGoogle"
      >
        <template #icon-left>
          <IconGoogle class="h-5 w-5 mr-2" />
        </template>
        Continue with Google
      </MclButton>
    </div>
    <MclDivider> or </MclDivider>
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
    <Transition
      name="slide-up"
      mode="out-in"
    >
      <MclButton
        class="mb-2"
        form="form-sing-up"
        type="submit"
        v-if="singMethod === 'SingUp'"
      >
        Sing Up
      </MclButton>
      <MclButton
        class="mb-2"
        form="form-sing-up"
        type="submit"
        v-else
      >
        Sing In
      </MclButton>
    </Transition>
  </form>
  <button @click="test">Log out</button>
</template>

<style scoped lang="scss">
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.25s ease-out;
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}
</style>
