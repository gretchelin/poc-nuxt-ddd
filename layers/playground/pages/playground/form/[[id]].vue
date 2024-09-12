<template>
  <div class="col-span-2 p-2 bg-blue-200 flex gap-2 text-blue-700 rounded m-4">
    <Icon
      name="mdi-info"
      size="24px"
    />
    <div>
      Input and error message used here utilizes component from <code>ui</code> layer!
    </div>
  </div>

  <form
    class="grid grid-cols-2 gap-4 p-4 max-w-[500px] mx-auto"
    @submit="onSubmit"
  >
    <UiFormInput
      v-model="titleValue"
      :label="FieldLabel.TITLE"
      :name="FieldKey.TITLE"
      v-bind="titleField"
    >
      <template #append>
        <ErrorMessage
          :name="FieldKey.TITLE"
          as="UiFormError"
        />
      </template>
    </UiFormInput>

    <UiFormInput
      v-model="iconValue"
      :label="FieldLabel.ICON"
      :name="FieldKey.ICON"
      v-bind="iconField"
      :error="!!formErrors[FieldKey.ICON]"
    >
      <template #append>
        <ErrorMessage
          :name="FieldKey.ICON"
          as="UiFormError"
        />
      </template>
    </UiFormInput>

    <UiFormInput
      v-model="orderValue"
      :label="FieldLabel.ORDER"
      :name="FieldKey.ORDER"
      type="number"
      v-bind="orderField"
    >
      <template #append>
        <ErrorMessage
          :name="FieldKey.ORDER"
          as="UiFormError"
        />
      </template>
    </UiFormInput>

    <div class="col-span-2 flex gap-2">
      <UiButton
        type="reset"
        @click="handleReset"
      >
        Reset
      </UiButton>
      <UiButton type="submit">
        {{ isSubmitting ? 'Loading' : 'Submit' }}
      </UiButton>
    </div>
  </form>

  <section class="border p-4 mt-10 mx-4">
    Try fill up the form above and see how the data is received by <code>vee-validate</code>!
    <h1>Form Data: </h1>
    <pre class="text-xs">{{ form }}</pre>
  </section>
</template>

<script lang="ts">
import { useForm } from 'vee-validate';
import { object, string, number } from 'yup';
import { toTypedSchema } from '@vee-validate/yup';

export default {
  name: 'PlaygroundPageForm',
};
</script>

<script setup lang="ts">
definePageMeta({
  middleware: ['playground'],
});

// types

// const
const FieldLabel: Record<string, string> = {
  TITLE: 'Title',
  ICON: 'Icon',
  ORDER: 'Order',
} as const;

const FieldKey: Record<string, string> = {
  TITLE: 'title',
  ICON: 'icon',
  ORDER: 'order',
} as const;

const ValidationSchema = object().shape({
  [`${FieldKey.TITLE}`]: string().trim().required().label(FieldLabel.TITLE),
  [`${FieldKey.ICON}`]: string().trim().required().label(FieldLabel.ICON),
  [`${FieldKey.ORDER}`]: number()
    .transform(value => ((isNaN(value) || value === '') ? undefined : value))
    .min(0)
    .max(10)
    .required()
    .label(FieldLabel.ORDER),
});

// props

// data
const route = useRoute();
const initialValues = ref({
  [`${FieldKey.TITLE}`]: '',
  [`${FieldKey.ICON}`]: '',
  [`${FieldKey.ORDER}`]: 0,
});

// computed
const isEditMode = computed(() => {
  return !!route?.params?.id;
});

// setup form
const { values: form, errors: formErrors, handleSubmit, handleReset, defineField, isSubmitting } = useForm({
  validationSchema: toTypedSchema(ValidationSchema),
  initialValues: initialValues.value,
});

const [titleValue, titleField] = defineField(FieldKey.TITLE);
const [iconValue, iconField] = defineField(FieldKey.ICON);
const [orderValue, orderField] = defineField(FieldKey.ORDER);

// methods
const onSubmit = handleSubmit((values) => {
  console.log({ submit: values, isEditMode });

  alert('Form Submitted');
});
</script>

<style lang="postcss" scoped>
code {
  @apply bg-neutral-100 px-1 py-0.5 rounded;
}
</style>
