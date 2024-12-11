<template>
  <div>
    <div class="space-y-6 p-2">
      <div class="flex items-center gap-2">
        <UIButton
          color="secondary"
          size="small"
          type="button"
          @click="handleBack"
        >
          <Icon
            name="mdi-arrow-left"
            width="25"
            height="20"
            mode="svg"
            class="text-gray-400"
          />
        </UIButton>
        <UIBreadcrumb
          :title="breadcrumbTitle"
          :items="breadcrumbs"
        />
      </div>

      <div class="flex justify-between">
        <div class="general-info w-6/12">
          <h1 class="font-semibold">
            General
          </h1>
          <span class="text-gray-400 text-sm">Please provide the general information for the  {{ type }}</span>
        </div>

        <div class="form w-full">
          <form @submit.prevent="submitForm">
            <!-- Title Field -->
            <div class="mb-4">
              <UIFormInput
                id="title"
                v-model="title"
                label="Title"
                placeholder="Enter pdf title"
              />
            </div>

            <!-- Description Field -->
            <div class="mb-4">
              <UIFormTextarea
                id="description"
                v-model="description"
                label="Description"
                placeholder="Enter pdf description"
              />
            </div>

            <!-- File Upload -->
            <div class="mb-4">
              <label
                for="pdfUpload"
                class="block text-sm font-medium text-gray-700"
              >Upload {{ type.toUpperCase() }}</label>
              <div class="flex items-center space-x-2 justify-between border p-2 rounded">
                <div class="flex space-x-2">
                  <UIButton
                    v-if="fileName"
                    color="secondary"
                    size="small"
                    type="button"
                  >
                    <Icon
                      name="mdi-file"
                      width="20"
                      height="20"
                      mode="svg"
                      class="text-gray-400"
                    />
                  </UIButton>
                  <UIButton
                    v-else
                    color="default"
                    size="small"
                    type="button"
                    class="inline-flex items-center justify-center px-4 py-2 text-sm bg-brand-primary"
                  >
                    <Icon
                      name="mdi-upload"
                      width="20"
                      height="20"
                      mode="svg"
                      class="text-teal-500"
                    />
                  </UIButton>
                  <div class="flex flex-col text-xs">
                    <span>{{ fileName ? fileName : 'Upload File' }}</span>
                    <span class="text-gray-400">{{ type.toUpperCase() }}</span>
                  </div>
                </div>

                <Icon
                  v-if="fileName"
                  name="mdi-delete"
                  width="25"
                  height="20"
                  mode="svg"
                  class="text-gray-400 cursor-pointer"
                  @click="handleDeleteFile"
                />
                <UIButton
                  v-else
                  color="default"
                  variant="outlined"
                  size="small"
                  type="button"
                  class="inline-flex items-center justify-center px-4 py-2 text-sm bg-white border-teal-500 text-teal-500 font-semibold rounded-md"
                  @click="handleFileUpload"
                >
                  <Icon
                    name="mdi-upload"
                    width="25"
                    height="20"
                    mode="svg"
                    class="text-teal-500"
                  />
                  Upload
                </UIButton>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="flex justify-end space-x-4">
              <UIButton
                color="secondary"
                size="small"
                @click="handleCancel"
              >
                Cancel
              </UIButton>
              <UIButton
                color="priamry"
                size="small"
                type="submit"
                class="px-4 py-2 bg-teal-500 text-white font-semibold rounded-md hover:bg-teal-600 focus:outline-none"
              >
                Add {{ type.toUpperCase() }}
              </UIButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useMutation } from '@tanstack/vue-query';
import UIButton from '#ui/components/atoms/button';
import UIBreadcrumb from '#ui/components/atoms/breadcrumb';
import UIFormInput from '#ui/components/atoms/form/input';
import UIFormTextarea from '#ui/components/atoms/form/textarea';
import { createDocument, upload } from '~/layers/document/api/document';

// Page Setup
definePageMeta({
  layout: 'full',
  middleware: ['document'],
});

const title = ref('');
const description = ref('');
const fileName = ref<string | null>(null);
const file = ref<File | null>(null);

const router = useRouter();
const route = useRoute();
const type = route?.params?.type;
const breadcrumbTitle = `Add ${type.toUpperCase()}`;
const swal = useSwal();

// Data
const breadcrumbs = [
  { text: 'Learning Content', href: '' },
  { text: 'Document', href: `/document/${type}` },
  { text: `Add ${type.toUpperCase()}`, href: '', active: true },
];

const handleBack = () => {
  router.push(`/document/${type}`);
};

const handleFileUpload = () => {
  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.accept = type === 'pdf' ? '.pdf' : '.ppt';
  fileInput.addEventListener('change', () => {
    if (fileInput.files && fileInput.files[0]) {
      file.value = fileInput.files[0];
      fileName.value = fileInput.files[0].name;
    }
  });
  fileInput.click();
};

const handleDeleteFile = () => {
  fileName.value = '';
};

const { mutate: handleCreateDocument, isPending: isProcessing } = useMutation({
  mutationKey: ['create-document'],
  mutationFn: async (data) => {
    return await createDocument(data);
  },
  onSuccess: () => {
    swal.fire({
      position: 'top-end',
      title: 'Success',
      icon: 'success',
      timer: 2000,
    });
    router.push(`/document/${type}`);
  },
  onError: (err) => {
    console.error(err);
  },
});

const submitForm = async () => {
  const formData = new FormData();

  const now = new Date();
  const month = now.getMonth() + 1;
  const year = now.getFullYear();

  formData.append('file', file.value);
  formData.append('folder', `content/user-upload/${type}/${year}/${month}`);
  const { data } = await upload(formData);
  const fileUrl = data?.value?.data?.full_path;

  await handleCreateDocument({
    title,
    description,
    file: fileUrl,
    thumbnail: fileUrl,
  });
};
</script>

<style lang="postcss" scoped>

</style>
