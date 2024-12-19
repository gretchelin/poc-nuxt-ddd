<template>
  <div class="ppt-viewer--container">
    <!-- Navigation Controls -->
    <div class="ppt-viewer--navigation">
      <img
        src="public/img/logo/logo-mydigilearn.svg"
        alt="mydigilearn"
        class="ml-4"
      >
    </div>

    <div class="m-4">
      <iframe
        :src="`https://view.officeapps.live.com/op/embed.aspx?src=${pptUrl}`"
        width="100%"
        height="100%"
        frameborder="0"
      >
        This is an embedded <a target='_blank' href='http://office.com'>Microsoft Office</a>
        document, powered by <a target='_blank' href='http://office.com/webapps'>Office Online</a>.
      </iframe>
    </div>
  </div>
</template>

<script setup lang="ts">
interface IProps {
  pptUrl: string;
}

const props = withDefaults(defineProps<IProps>(), {
  pptUrl: '',
});
</script>

<style scoped>
.ppt-viewer--container {
  @apply border w-full bg-gray-200 rounded-xl aspect-video overflow-hidden;
  margin: 0 auto;
  width: 800px;
  height: 520px;
}

.ppt-viewer--navigation {
  @apply flex justify-between items-center mb-4 bg-gray-800 text-white p-4 rounded-t-xl;
}

.ppt-viewer--container iframe {
  @apply rounded-lg relative w-full aspect-video;
  margin: 0 auto;
  background-color: #f0f0f0;
}

.ppt-viewer--container :deep(iframe) {
  @apply !border-0 !outline-none;
}
</style>
