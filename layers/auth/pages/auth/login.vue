<template>
  <div class="flex h-screen overflow-hidden">
    <div
      class="bg-orange-700 flex-1 bg-cover"
      :style="`background-image: url('${loginBg}')`"
    />

    <div class="flex-1 flex justify-center items-center">
      <form
        class="min-h-[1px] w-10/12 p-4 rounded-xl shadow space-y-4"
        @submit="onSubmit"
      >
        <UiFormInput
          v-model="usernameVal"
          :label="FieldLabel.USERNAME"
          :name="FieldKey.USERNAME"
          v-bind="usernameAttrs"
          :error="!!formErrors[FieldKey.USERNAME]"
        >
          <template #append>
            <div class="text-xs text-neutral-400">
              You can use <code class="text-neutral-300">appleblossom@mail.test</code>, <code class="text-neutral-300">runningyak@mail.test</code>, <code class="text-neutral-300">antsyfeet@mail.test</code> or <code class="text-neutral-300">jackinabox@mail.test</code> to login
            </div>
            <ErrorMessage
              class="text-xs text-red-500"
              :name="FieldKey.USERNAME"
            />
          </template>
        </UiFormInput>
        <UiFormInput
          v-model="passVal"
          :label="FieldLabel.PASSWORD"
          type="password"
          :name="FieldKey.PASSWORD"
          v-bind="passAttrs"
          :error="!!formErrors[FieldKey.PASSWORD]"
        >
          <template #append>
            <ErrorMessage
              class="text-xs text-red-500"
              :name="FieldKey.PASSWORD"
            />
          </template>
        </UiFormInput>

        <UiButton
          type="submit"
          class="w-full !bg-primary-600 text-white"
          :disabled="!meta?.dirty || isProcessing"
        >
          {{ isProcessing ? 'Logging you in...' : 'Login' }}
        </UiButton>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useForm, ErrorMessage } from 'vee-validate';
import { object, string } from 'yup';
import { useMutation } from '@tanstack/vue-query';
import loginBg from '#auth/assets/graphic/login-bg.jpg';

definePageMeta({
  layout: 'auth',
  middleware: 'auth',
  auth: { unauthenticatedOnly: true, navigateAuthenticatedTo: '/' },
});

const FieldKey = {
  USERNAME: 'email',
  PASSWORD: 'pass',
};

const FieldLabel = {
  USERNAME: 'Email',
  PASSWORD: 'Password',
};

const ValidationSchema = object().shape({
  [`${FieldKey.USERNAME}`]: string().trim().email().required().label(FieldLabel.USERNAME),
  [`${FieldKey.PASSWORD}`]: string().trim().min(6).required().label(FieldLabel.PASSWORD),
});

// data
const { signIn } = useAuth();

// setup form
const { defineField, handleSubmit, errors: formErrors, meta } = useForm({
  validationSchema: toTypedSchema(ValidationSchema),
});
const [usernameVal, usernameAttrs] = defineField(FieldKey.USERNAME);
const [passVal, passAttrs] = defineField(FieldKey.PASSWORD);

// fetch
const { mutate: postLoginMutate, isPending: isProcessing } = useMutation({
  mutationKey: ['auth-loading'],
  mutationFn: async (data: { email: string; password: string }) => {
    return await signIn(data, {
      callbackUrl: '/',
    });
  },
  onSuccess: () => {
    alert('Logged in!');
  },
  onError: (err) => {
    alert(`Failed to log in: ${err?.data?.statusMessage}`);
  },
});

// methods
const onSubmit = handleSubmit((values) => {
  postLoginMutate({
    email: values[FieldKey.USERNAME]?.trim(),
    password: values[FieldKey.PASSWORD]?.trim(),
  });
});
</script>
