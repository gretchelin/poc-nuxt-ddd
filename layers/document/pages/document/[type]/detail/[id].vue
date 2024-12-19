<template>
  <div>
    <div class="space-y-4 p-2">
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

      <div class="flex justify-between gap-4">
        <div class="flex flex-col gap-4">
          <h3 class="font-semibold">
            General
          </h3>
          <div>
            <div class="text-gray-400">
              Title
            </div>
            <div>{{ data?.title }}</div>
          </div>
          <div>
            <div class="text-gray-400">
              Description
            </div>
            <div>{{ data?.description || '-' }}</div>
          </div>
          <div
            v-if="data?.file_url"
            class="mt-2"
          >
            <ClientOnly
              fallback-tag="span"
              fallback="Loading ..."
            >
              <div v-if="type === 'pdf'">
                <UIPdfViewer :pdf-url="data?.file_url" />
              </div>
              <div
                v-else
                class="relative aspect-video"
              >
                <UIPptViewer :ppt-url="data?.file_url" />
              </div>
            </ClientOnly>
          </div>
        </div>
        <div class="flex flex-col bg-gray-100 p-5 rounded gap-3 w-3/12 h-full">
          <h3 class="font-semibold">
            History
          </h3>
          <div>
            <div class="text-gray-400">
              Created By
            </div>
            <div>{{ data?.created_by || '-' }}</div>
          </div>
          <div>
            <div class="text-gray-400">
              Last Updated By
            </div>
            <div>{{ data?.updated_by || '-' }}</div>
          </div>
          <div>
            <div class="text-gray-400">
              Created
            </div>
            <div>{{ dayjs(data?.created_at).format('DD MMMM YYYY hh:mm:ss') }}</div>
          </div>
          <div>
            <div class="text-gray-400">
              Last Updated
            </div>
            <div>{{ dayjs(data?.updated_at).format('DD MMMM YYYY hh:mm:ss') }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';
import { useQuery } from '@tanstack/vue-query';
import UIBreadcrumb from '#ui/components/atoms/breadcrumb';
import UIButton from '#ui/components/atoms/button';
import UIPdfViewer from '#ui/components/molecules/pdfviewer';
import UIPptViewer from '#ui/components/molecules/pptviewer';
import { getDocumentById } from '~/layers/document/api/document';
import 'vue-pdf-embed/dist/styles/annotationLayer.css';
import 'vue-pdf-embed/dist/styles/textLayer.css';

const router = useRouter();
const route = useRoute();
const { type, id } = route?.params;
const breadcrumbTitle = `${type.toUpperCase()} Details`;
const breadcrumbs = [
  { text: 'Learning Content', href: '' },
  { text: 'Document', href: `/document/${type}` },
  { text: `${type.toUpperCase()} Details`, href: '', active: true },
];

const { isLoading, data } = useQuery({
  queryKey: ['document-by-id'],
  queryFn: async () => {
    const data = await getDocumentById(id);

    return data?.data || {};
  },
});

const handleBack = () => {
  router.push(`/document/${type}`);
};

// Page Setup
definePageMeta({
  layout: 'full',
  middleware: ['document'],
});
</script>

<style lang="postcss" scoped>
:deep(canvas) {
  @apply max-w-full
}
</style>
