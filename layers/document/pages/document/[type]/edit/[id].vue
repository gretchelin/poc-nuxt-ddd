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
            <UIFileUploadCompact
              class="mb-4"
              :for="file-upload-compact"
              :value="fileName"
              :label="uploadLabel"
              :file-type="fileType"
              :handle-file-upload="handleFileUpload"
              :accept="accept"
            />

            <!-- Action Buttons -->
            <div class="flex justify-end space-x-4">
              <UIButton
                color="priamry"
                size="small"
                type="submit"
                class="px-4 py-2 bg-teal-500 text-white font-semibold rounded-md hover:bg-teal-600 focus:outline-none"
              >
                Save
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
import { useMutation, useQuery } from '@tanstack/vue-query';
import UIButton from '#ui/components/atoms/button';
import UIBreadcrumb from '#ui/components/atoms/breadcrumb';
import UIFormInput from '#ui/components/atoms/form/input';
import UIFormTextarea from '#ui/components/atoms/form/textarea';
import UIFileUploadCompact from '#ui/components/molecules/fileupload/compact';
import { editDocument, getDocumentById, upload } from '~/layers/document/api/document';

// Page Setup
definePageMeta({
  layout: 'full',
  middleware: ['document'],
});

const title = ref('');
const description = ref('');
const fileName = ref<string | null>(null);
const fileUrl = ref<string | null>(null);
const file = ref<File | null>(null);

const router = useRouter();
const route = useRoute();
const { type, id } = route?.params;
const uploadLabel = `Uplaod ${type.toUpperCase()}`;
const fileType = type.toUpperCase();
const accept = type === 'pdf' ? '.pdf' : '.ppt';
const breadcrumbTitle = `Edit ${type.toUpperCase()}`;
const swal = useSwal();

const toast = swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast: any) => {
    toast.onmouseenter = swal.stopTimer;
    toast.onmouseleave = swal.resumeTimer;
  },
});

// Data
const breadcrumbs = [
  { text: 'Learning Content', href: '' },
  { text: 'Document', href: `/document/${type}` },
  { text: `Edit ${type.toUpperCase()}`, href: '', active: true },
];

const handleBack = () => {
  router.push(`/document/${type}`);
};

const handleFileUpload = (value) => {
  file.value = value;
};

const { isLoading, data } = useQuery({
  queryKey: ['document-by-id'],
  queryFn: async () => {
    const data = await getDocumentById(id);
    title.value = data?.data.title;
    description.value = data?.data.description;
    fileName.value = data?.data.filename;
    fileUrl.value = data?.data.file_url;
    return data?.data || {};
  },
});

const { mutate: handleEditDocument, isPending: isProcessing } = useMutation({
  mutationKey: ['create-document'],
  mutationFn: async (data) => {
    return await editDocument(data, id);
  },
  onSuccess: () => {
    // Handle the delete action for the row
    swal.fire({
      title: 'Save Changes?',
      text: `You are about to save your changes. Once saved, they will be applied.`,
      icon: 'primary',
      showCancelButton: true,
      confirmButtonColor: '#4C7CE5',
      cancelButtonColor: '#EAEAEA',
      confirmButtonText: 'Save',
    }).then((result) => {
      if (result.isConfirmed) {
        toast.fire({
          icon: 'success',
          title: `${type.toUpperCase()} successfully saved`,
        });

        router.push(`/document/${type}`);
      }
    });
  },
  onError: (err) => {
    toast.fire({
      icon: 'error',
      title: `Failed to save ${type.toUpperCase()} `,
    });
  },
});

const submitForm = async () => {
  const formData = new FormData();

  const now = new Date();
  const month = now.getMonth() + 1;
  const year = now.getFullYear();

  let url = '';
  if (file.value) {
    formData.append('file', file.value);
    formData.append('folder', `content/user-upload/${type}/${year}/${month}`);
    const { data } = await upload(formData);
    url = data?.value?.data?.full_path;
  }

  await handleEditDocument({
    title,
    description,
    file: file.value ? url : fileUrl,
    thumbnail: fileUrl,
  }, id);
};
</script>

<style lang="postcss" scoped>

</style>
